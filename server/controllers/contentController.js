const prisma = require("../lib/prisma");
const { base, toBool } = require("../utils/serialize");

exports.getContents = async (req, res) => {
  try {
    const contents = await prisma.content.findMany({
      where: { deleted: false },
      orderBy: { createdAt: "asc" },
    });
    if (contents.length === 0) {
      return res.end();
    }
    return res.send({ success: true, Contents: contents.map(base) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.addContents = async (req, res) => {
  try {
    const newRecord = await prisma.content.create({
      data: {
        contentType: req.body.contentType,
        content: req.body.content,
      },
    });
    return res.send({
      success: true,
      data: base(newRecord),
      msg: "Content added",
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.getContentsbyId = async (req, res) => {
  try {
    const content = await prisma.content.findUnique({ where: { id: req.params.id } });
    if (!content || content.deleted) {
      return res.send({ error: "Content not found" });
    }
    return res.send({ success: true, content: base(content) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const existing = await prisma.content.findUnique({ where: { id: req.params.id } });
    if (!existing || existing.deleted) {
      return res.send({ error: "Id not found" });
    }

    const updated = await prisma.content.update({
      where: { id: req.params.id },
      data: {
        contentType: req.body.contentType,
        content: req.body.content,
        active: req.body.active === undefined ? existing.active : toBool(req.body.active),
        updatedAt: new Date(),
      },
    });
    return res.send({
      success: true,
      msg: "Content updated successfully",
      data: base(updated),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.deleteContent = async (req, res) => {
  try {
    await prisma.content.update({
      where: { id: req.params.id },
      data: { deleted: true, deletedAt: new Date() },
    });
    return res.send({ success: true, message: "Successfully Deleted" });
  } catch (_error) {
    return res.send({ success: true, message: "record not found" });
  }
};

exports.getAllIncDel = async (req, res) => {
  try {
    const records = await prisma.content.findMany({ orderBy: { createdAt: "asc" } });
    if (records.length === 0) {
      return res.end();
    }
    return res.send({ success: true, data: records.map(base) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};
