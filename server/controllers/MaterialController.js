const prisma = require("../lib/prisma");
const { base } = require("../utils/serialize");

exports.getMaterials = async (req, res) => {
  try {
    const materials = await prisma.material.findMany({ orderBy: { createdAt: "asc" } });
    if (materials.length === 0) {
      return res.end();
    }
    return res.send({ success: true, material: materials.map(base) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.addMaterial = async (req, res) => {
  try {
    const newRecord = await prisma.material.create({ data: { name: req.body.name } });
    return res.send({
      success: true,
      data: base(newRecord),
      msg: "Material added",
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};
