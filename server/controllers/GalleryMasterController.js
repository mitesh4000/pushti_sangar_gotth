const prisma = require("../lib/prisma");
const { serializeGalleryDetails, toBool, idOf } = require("../utils/serialize");

exports.getGallaryItems = async (req, res) => {
  const records = await prisma.galleryDetails.findMany({
    where: { deleted: false },
    orderBy: { createdAt: "desc" },
  });
  if (records.length === 0) {
    return res.end();
  }
  return res.send({ data: records.map(serializeGalleryDetails) });
};

exports.addNewImageInGallary = async (req, res) => {
  try {
    const title = req.body.imageTitle;
    const existing = title
      ? await prisma.galleryDetails.findFirst({ where: { imageTitle: title, deleted: false } })
      : null;
    if (existing) {
      return res.send({ error: "Content not found" });
    }

    const newRecord = await prisma.galleryDetails.create({
      data: {
        imageTitle: title,
        description: req.body.description,
        galleryCategoryId: idOf(req.body.galleryCategory),
        imagePath: req.file ? req.file.filename : "",
        active: req.body.active === undefined ? true : toBool(req.body.active),
      },
    });

    return res.send({
      success: true,
      data: serializeGalleryDetails(newRecord),
      message: "image added in gallary added successfully",
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.getGallaryItemById = async (req, res) => {
  const record = await prisma.galleryDetails.findUnique({ where: { id: req.params.id } });
  if (!record || record.deleted) {
    return res.send({ error: "Content not found" });
  }
  return res.send({ success: true, recordExists: serializeGalleryDetails(record) });
};

exports.updateGallaryItem = async (req, res) => {
  const existing = await prisma.galleryDetails.findUnique({ where: { id: req.params.id } });
  if (!existing || existing.deleted) {
    return res.send({ error: "Content not found" });
  }

  const updated = await prisma.galleryDetails.update({
    where: { id: req.params.id },
    data: {
      imageTitle: req.body.imageTitle,
      description: req.body.description,
      galleryCategoryId: idOf(req.body.galleryCategory),
      active: req.body.active === undefined ? existing.active : toBool(req.body.active),
      imagePath: req.file ? req.file.filename : existing.imagePath,
      updatedAt: new Date(),
    },
  });

  return res.send({
    success: true,
    message: "Record updated successfully",
    data: serializeGalleryDetails(updated),
  });
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    await prisma.galleryDetails.delete({ where: { id: req.params.id } });
    return res.send({ success: true, message: "Successfully Deleted" });
  } catch (_error) {
    return res.send({ message: "record not found" });
  }
};

exports.getAllIncDel = async (req, res) => {
  const records = await prisma.galleryDetails.findMany({ orderBy: { createdAt: "desc" } });
  if (records.length === 0) {
    return res.send();
  }
  return res.send({ success: true, data: records.map(serializeGalleryDetails) });
};
