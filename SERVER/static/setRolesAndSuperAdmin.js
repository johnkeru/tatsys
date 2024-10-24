const assignedRole = require("../models/assignedRole");
const role = require("../models/role");

exports.setRoles = async (_req, res) => {
    const roles = [
        {
            name: process.env.SUPER_ADMIN, // 'SUPER ADMIN'
            permission: 'Has full access to all systems.' // SUPER ADMIN has full permission
        },
        {
            name: process.env.DEFAULT_USER, // 'USER'
            permission: 'View only.'
        },
    ]
    try {
        roles.map(async ({ name, permission }) => {
            const newRole = new role({ name, permission });
            await newRole.save()
        })
        res.json({ message: 'Roles created successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.setRoleSuperAdmins = async (_req, res) => {
    try {
        const adminRole = await role.findOne({ name: process.env.SUPER_ADMIN })
        const superAdmins = [process.env.SUPER_ADMIN_1,] // list all super admins here
        superAdmins.forEach(async (adminId) => {
            const assignRole = new assignedRole({ assignedBy: adminId, user: adminId, roles: [adminRole._id] })
            await assignRole.save()
        })
        res.json({ message: 'Super Admins set successfully' });
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Server error' })
    }
}
