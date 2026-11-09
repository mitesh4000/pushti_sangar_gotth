const prisma = require("../lib/prisma");
const { base, toNumber } = require("../utils/serialize");

exports.addGst = async (req, res) => {
  try {
    const gst = toNumber(req.body.gst) || 0;
    const newGst = await prisma.gst.create({
      data: {
        gst,
        sgst: gst / 2,
        cgst: gst / 2,
        igst: gst,
      },
    });
    return res.send({
      success: true,
      newSubCategory: base(newGst),
      msg: "gst added",
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.getGst = async (req, res) => {
  try {
    const entries = await prisma.gst.findMany({ where: { isDeleted: false } });
    return res.send(entries.map(base));
  } catch (_error) {
    return res.send({ error: "Server error" });
  }
};

exports.getSpecificGSTbyId = async (req, res) => {
  try {
    const gstEntry = await prisma.gst.findUnique({ where: { id: req.params.id } });
    if (!gstEntry) {
      return res.status(404).send({ error: "GST entry not found" });
    }
    return res.send(base(gstEntry));
  } catch (_error) {
    return res.send({ error: "Server error" });
  }
};
