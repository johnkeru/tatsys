const assignedRole = require('../models/assignedRole')
const role = require('../models/role')

exports.getRoles = async (req, res) => {
    try {
        let roles = []
        const rolesFromRequest = req.query.roles
        // it is string if only 1 role and array if multiple
        if (typeof rolesFromRequest === 'string') {
            if (rolesFromRequest === process.env.SUPER_ADMIN) { // get all roles if super admin
                roles = await role.find({ enabled: true, name: { $ne: process.env.SUPER_ADMIN } }).sort({ name: 1 })
            } else {
                const prefix = rolesFromRequest.split(' ')[0] // if normal admin, get the roles with same name but prefix
                roles = await role.find({
                    enabled: true,
                    name: {
                        $regex: prefix,          // Match roles starting with "BUDGET_"
                        $not: { $regex: 'ADMIN' }  // Exclude roles containing "ADMIN"
                    }
                }).sort({ name: 1 })
            }
        } else {
            // get only roles with admin in it
            const admin = rolesFromRequest.find(role => role.includes('ADMIN'))
            const prefix = admin.split(' ')[0] // if normal admin, get the roles with same name but prefix
            roles = await role.find({
                enabled: true,
                name: {
                    $regex: prefix,          // Match roles starting with "BUDGET_"
                    $not: { $regex: 'ADMIN' }  // Exclude roles containing "ADMIN"
                }
            }).sort({ name: 1 })
        }
        res.json({ roles })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Server error' })
    }
}


// Create a new role
exports.createRole = async (req, res) => {
    const { name, permission } = req.body;
    try {
        const upperCaseName = name.toUpperCase()
        const newRole = new role({ name: upperCaseName, permission });
        await newRole.save();
        res.status(201).json({ message: 'Role created successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Role already exists.' })
    }
};

// Update a role
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { name, permission } = req.body;

    const upperCaseName = name.toUpperCase()
    try {
        const updatedRole = await role.findByIdAndUpdate(id, { name: upperCaseName, permission }, { new: true });
        if (!updatedRole) return res.status(404).json({ error: 'Role not found' });
        res.json({ message: 'Role updated successfully', updatedRole });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Role already exists.' })
    }
};

// Delete a role
exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedRoleToDisable = await role.findByIdAndUpdate(id, { enabled: false });
        if (!updatedRoleToDisable) return res.status(404).json({ error: 'Role not found' });
        await assignedRole.updateMany(
            { roles: updatedRoleToDisable._id },   // Find documents where "Role._id" is present in roles
            { $pull: { roles: updatedRoleToDisable._id } }  // Remove "Role._id" from the roles array
        )
        res.json({ message: 'Role deleted successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.assignRoles = async (req, res) => {
    try {
        // user: 6 digits, roles: ['SUPER ADMIN', DV]
        const { user, roles, assignedBy } = req.body
        // check if user is already assigned before
        const isAssigned = await assignedRole.findOne({ user }).populate({ path: 'roles', select: 'name' })
        // if exist then updating
        if (isAssigned) {
            const isSuperAdmin = isAssigned.roles.find(r => r.name === process.env.SUPER_ADMIN)
            // if assignedBy is not same with isAssigned's assignedBy value then error
            if (isAssigned.assignedBy != assignedBy || isSuperAdmin) return res.status(403).json({ error: 'You cannot update assigned roles' })
            await assignedRole.findByIdAndUpdate(isAssigned._id, { roles, assignedBy })
            return res.json({ message: 'Roles updated successfully' })
        }

        // if not then creating new
        const newAssignedRole = new assignedRole({ user, roles, assignedBy })
        await newAssignedRole.save()
        res.json({ message: 'Roles assigned successfully' })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Server error' })
    }
}