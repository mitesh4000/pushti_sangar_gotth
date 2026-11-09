const prisma = require("../lib/prisma");
const { base, toNumber } = require("../utils/serialize");

exports.getSizes = async (req, res) => {
  try {
    const sizes = await prisma.size.findMany({ orderBy: { size: "asc" } });
    if (sizes.length === 0) {
      return res.end();
    }
    return res.send({ success: true, sizes: sizes.map(base) });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

exports.addSize = async (req, res) => {
  try {
    const newSize = await prisma.size.create({
      data: { size: toNumber(req.body.size) },
    });
    return res.send({
      success: true,
      data: base(newSize),
      msg: "Size added",
    });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

exports.getSizeById = async (req, res) => {
  try {
    const size = await prisma.size.findUnique({ where: { id: req.params.id } });
    if (!size) {
      return res.send({ success: false, error: "Size not found" });
    }
    return res.send({ success: true, size: base(size) });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

exports.updateSize = async (req, res) => {
  try {
    const existing = await prisma.size.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.send({ success: false, error: "Size not found" });
    }

    const updated = await prisma.size.update({
      where: { id: req.params.id },
      data: {
        size: req.body.size !== undefined ? toNumber(req.body.size) : existing.size,
      },
    });
    return res.send({
      success: true,
      msg: "Size updated successfully",
      data: base(updated),
    });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

exports.deleteSize = async (req, res) => {
  try {
    await prisma.size.delete({ where: { id: req.params.id } });
    return res.send({ success: true, message: "Size deleted successfully" });
  } catch (_error) {
    return res.send({ success: false, error: "Size not found" });
  }
};
