const prisma = require("../lib/prisma");
const { serializeRole, json, parseJson } = require("../utils/serialize");

// Add Role
const addRole = async (req, res) => {
  try {
    const role = req.body.role;
    const permissions = req.body.permissions || [];
    const newRole = await prisma.role.create({
      data: { role, permissions: json(permissions) },
    });
    return res.send({ code: 200, message: "role added", data: serializeRole(newRole) });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

const getSelectedRolePermission = async (req, res) => {
  const roleName = req.body.role;
  const role = await prisma.role.findUnique({ where: { role: roleName } });
  if (role) {
    return res.status(200).send({
      success: true,
      permissions: parseJson(role.permissions, []),
    });
  }
  return res.status(404).send({ success: false, msg: "role not found" });
};

// Delete Role
const deleteRole = async (req, res) => {
  return res.send({ code: 200, message: "role Deleted" });
};

// Get Roles
const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({ orderBy: { role: "asc" } });
    return res.send(roles.map(serializeRole));
  } catch (error) {
    console.error(error);
    return res.send({ message: "Server Error" });
  }
};

module.exports = {
  addRole,
  deleteRole,
  getSelectedRolePermission,
  getRoles,
};
