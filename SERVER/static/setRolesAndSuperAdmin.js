const assignedRole = require("../models/assignedRole");
const role = require("../models/role");

exports.setRolesAndAssign = async (_req, res) => {
    const roles = [
        {
            name: process.env.SUPER_ADMIN, // 'SUPER ADMIN'
            permission: 'Has full access to all systems.' // SUPER ADMIN has full permission
        },
    ];

    try {
        // Delete all existing roles
        await role.deleteMany({});

        // Create roles and save them using Promise.all
        await Promise.all(
            roles.map(({ name, permission }) => {
                const newRole = new role({ name, permission });
                return newRole.save();
            })
        );

        const adminRole = await role.findOne({ name: process.env.SUPER_ADMIN });
        const superAdmins = [process.env.SUPER_ADMIN_1]; // list all super admins here

        // Delete all existing roles assigned to super admins
        await assignedRole.deleteMany({});

        // Assign roles to super admins using Promise.all
        await Promise.all(
            superAdmins.map(adminId => {
                const assignRole = new assignedRole({ assignedBy: adminId, user: adminId, roles: [adminRole._id] });
                return assignRole.save();
            })
        );

        res.json({ message: 'Roles set and Super Admins set successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
};
