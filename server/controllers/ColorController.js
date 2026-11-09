const prisma = require("../lib/prisma");
const { base } = require("../utils/serialize");

// Get all colors
exports.getColors = async (req, res) => {
  try {
    const colors = await prisma.color.findMany({ orderBy: { createdAt: "asc" } });
    if (colors.length === 0) {
      return res.end();
    }
    return res.send({ success: true, colors: colors.map(base) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Add a new color
exports.addColor = async (req, res) => {
  try {
    const newRecord = await prisma.color.create({ data: { name: req.body.name } });
    return res.send({
      success: true,
      data: base(newRecord),
      message: "Color added successfully",
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Get a color by ID
exports.getColorById = async (req, res) => {
  try {
    const color = await prisma.color.findUnique({ where: { id: req.params.id } });
    if (!color) {
      return res.send({ error: "Color not found" });
    }
    return res.send({ success: true, color: base(color) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Update a color by ID
exports.updateColor = async (req, res) => {
  try {
    const existing = await prisma.color.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.send({ error: "Color not found" });
    }

    const updated = await prisma.color.update({
      where: { id: req.params.id },
      data: { name: req.body.name },
    });
    return res.send({
      success: true,
      message: "Color updated successfully",
      updatedRecord: base(updated),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Delete a color by ID
exports.deleteColor = async (req, res) => {
  try {
    await prisma.color.delete({ where: { id: req.params.id } });
    return res.send({ success: true, message: "Color successfully deleted" });
  } catch (_error) {
    return res.send({ success: true, message: "Color not found" });
  }
};
