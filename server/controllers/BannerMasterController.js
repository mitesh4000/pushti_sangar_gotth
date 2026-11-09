const prisma = require("../lib/prisma");
const { serializeBanner, toBool } = require("../utils/serialize");

exports.getBanner = async (req, res) => {
  const records = await prisma.banner.findMany({ orderBy: { createdAt: "desc" } });
  if (records.length === 0) {
    return res.status(204).end();
  }
  return res.status(200).json({ success: true, data: records.map(serializeBanner) });
};

exports.addNewBanner = async (req, res) => {
  try {
    const bannerTitle = req.body.bannerTitle;
    const existing = bannerTitle
      ? await prisma.banner.findFirst({ where: { bannerTitle } })
      : null;
    if (existing) {
      return res.status(400).json({
        message: `banner with name '${bannerTitle}' alrady exist`,
      });
    }

    const banner = await prisma.banner.create({
      data: {
        bannerTitle,
        bannerType: req.body.bannerType,
        description: req.body.description,
        bannerText: req.body.bannerText,
        image: req.file ? req.file.filename : "not given",
      },
    });

    return res.status(201).json({
      data: serializeBanner(banner),
      message: "Banner added successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getBannerById = async (req, res) => {
  const record = await prisma.banner.findUnique({ where: { id: req.params.id } });
  if (!record || record.isDeleted) {
    return res.status(400).json({ message: "Banner not found" });
  }
  return res.status(200).send({ data: serializeBanner(record) });
};

exports.updateBanner = async (req, res) => {
  const bannerId = req.params.id;
  const existing = await prisma.banner.findUnique({ where: { id: bannerId } });
  if (!existing || existing.isDeleted) {
    return res.status(400).json({ message: "Banner not found" });
  }

  const updatedBanner = await prisma.banner.update({
    where: { id: bannerId },
    data: {
      bannerTitle: req.body.bannerTitle,
      description: req.body.description,
      bannerText: req.body.bannerText,
      isActive: req.body.active === undefined ? existing.isActive : toBool(req.body.active),
      image: req.file ? req.file.filename : existing.image,
      updatedAt: new Date(),
    },
  });

  return res.status(200).json({
    message: "Banner updated successfully",
    data: serializeBanner(updatedBanner),
  });
};

exports.deleteBanner = async (req, res) => {
  try {
    await prisma.banner.delete({ where: { id: req.params.id } });
    return res.send({ success: true, message: "Coupon deleted successfully" });
  } catch (_error) {
    return res.send({ success: false, message: "Coupon not found" });
  }
};

exports.getAllIncDelBanner = async (req, res) => {
  const records = await prisma.banner.findMany({ orderBy: { createdAt: "desc" } });
  if (records.length === 0) {
    return res.status(204).end();
  }
  return res.status(200).json({ data: records.map(serializeBanner) });
};
