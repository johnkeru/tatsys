const assignedRole = require("../models/assigned_role");
const role = require("../models/role");

exports.setRolesAndAssign = async () => {
  const roles = [
    {
      name: "SUPER ADMIN", // 'SUPER ADMIN'
      permission: "Has full access to all systems.",
    },
    // list all your system roles
  ];

  // Delete all existing roles
  await role.deleteMany({});
  // Create roles and save them using Promise.all
  await Promise.all(
    roles.map(({ name, permission }) => {
      const newRole = new role({ name, permission });
      return newRole.save();
    })
  );

  // Set up Super Admins
  const superAdminRole = await role.findOne({ name: "SUPER ADMIN" });
  const superAdmins = [
    // 'user' is the 6 digits of super admin
    // 'fullName' is the name of super admin
    { user: 447589, fullName: "keru" },
    // list all possible super admins within your system.
  ];

  // Delete all existing roles assigned to super admins
  await assignedRole.deleteMany({});

  // Assign roles to super admins using Promise.all
  await Promise.all(
    superAdmins.map((admin) => {
      const assignRole = new assignedRole({
        assignedBy: admin.user,
        user: admin.user,
        roles: [superAdminRole._id],
        fullName: admin.fullName,
      });
      return assignRole.save();
    })
  );

  return "Roles set and Super Admins assigned successfully";
};
