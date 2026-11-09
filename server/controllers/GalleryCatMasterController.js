const prisma = require("../lib/prisma");
const { serializeGalleryCategory, toBool } = require("../utils/serialize");

exports.getGallaryCategories = async (req, res) => {
  const galleryCategories = await prisma.galleryCategory.findMany({
    where: { deleted: false },
    orderBy: { createdAt: "desc" },
  });
  if (galleryCategories.length === 0) {
    return res.end();
  }
  return res.send({ GalleryCat: galleryCategories.map(serializeGalleryCategory) });
};

exports.addNewGallaryCategory = async (req, res) => {
  try {
    const title = req.body.gallaryCategoryTitle;
    const existing = title
      ? await prisma.galleryCategory.findFirst({
          where: { gallaryCategoryTitle: title, deleted: false },
        })
      : null;
    if (existing) {
      return res.send({ error: "Content not found" });
    }

    const newRecord = await prisma.galleryCategory.create({
      data: {
        gallaryCategoryTitle: title,
        description: req.body.description,
        imagePath: req.file ? req.file.filename : "",
      },
    });

    return res.send({
      success: true,
      data: serializeGalleryCategory(newRecord),
      message: "image added in gallary added successfully",
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.getGallaryCatById = async (req, res) => {
  const record = await prisma.galleryCategory.findUnique({ where: { id: req.params.id } });
  if (!record || record.deleted) {
    return res.send({ error: "Content not found" });
  }
  return res.send({ success: true, recordExists: serializeGalleryCategory(record) });
};

exports.updateGallaryCat = async (req, res) => {
  const existing = await prisma.galleryCategory.findUnique({ where: { id: req.params.id } });
  if (!existing || existing.deleted) {
    return res.send({ error: "Content not found" });
  }

  const updated = await prisma.galleryCategory.update({
    where: { id: req.params.id },
    data: {
      gallaryCategoryTitle: req.body.gallaryCategoryTitle,
      description: req.body.description,
      active: req.body.active === undefined ? existing.active : toBool(req.body.active),
      imagePath: req.file ? req.file.filename : existing.imagePath,
      updatedAt: new Date(),
    },
  });

  return res.send({
    success: true,
    message: "Record updated successfully",
    updatedRecord: serializeGalleryCategory(updated),
  });
};

exports.deleteGallaeyCat = async (req, res) => {
  try {
    await prisma.galleryCategory.delete({ where: { id: req.params.id } });
    return res.send({ success: true, message: "Successfully Deleted" });
  } catch (_error) {
    return res.send({ message: "record not found" });
  }
};

exports.getAllIncDel = async (req, res) => {
  const records = await prisma.galleryCategory.findMany({ orderBy: { createdAt: "desc" } });
  if (records.length === 0) {
    return res.status(204).end();
  }
  return res.status(200).json({ data: records.map(serializeGalleryCategory) });
};
