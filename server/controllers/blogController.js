const prisma = require("../lib/prisma");
const { serializeBlog, serializeBlogCategory, toBool, idOf } = require("../utils/serialize");

const parseDate = (value, fallback = new Date()) => {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date;
};

exports.getBlog = async (req, res) => {
  try {
    const records = await prisma.blog.findMany({
      where: { deleted: false },
      include: { blogCategory: true },
      orderBy: { date: "desc" },
    });
    if (records.length === 0) {
      return res.status(204).end();
    }
    return res.status(200).json({ data: records.map(serializeBlog) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addBlog = async (req, res) => {
  try {
    const newRecord = await prisma.blog.create({
      data: {
        blogTitle: req.body.blogTitle,
        blogFeed: req.body.blogFeed,
        date: parseDate(req.body.date),
        blogCategoryId: idOf(req.body.blogCategory),
        imagePath: req.file ? req.file.filename : "",
        description: req.body.description,
        blog: req.body.blog,
        active: req.body.active === undefined ? true : toBool(req.body.active),
      },
      include: { blogCategory: true },
    });
    return res.status(201).json({
      data: serializeBlog(newRecord),
      message: "Blog added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBlogbyblogCategoryId = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { blogCategoryId: req.params.id },
      include: { blogCategory: true },
      orderBy: { date: "desc" },
    });
    if (blogs.length === 0) {
      return res.status(204).end();
    }
    return res.status(200).json({ data: blogs.map(serializeBlog) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBlogbyId = async (req, res) => {
  try {
    const record = await prisma.blog.findUnique({
      where: { id: req.params.id },
      include: { blogCategory: true },
    });
    if (!record || record.deleted) {
      return res.status(400).send("error");
    }
    return res.status(200).send({ recordExists: serializeBlog(record) });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const existing = await prisma.blog.findUnique({ where: { id: req.params.id } });
    if (!existing || existing.deleted) {
      return res.status(400).send({ error: "Record not found" });
    }

    const updated = await prisma.blog.update({
      where: { id: req.params.id },
      data: {
        blogTitle: req.body.blogTitle,
        blogFeed: req.body.blogFeed,
        date: parseDate(req.body.date, existing.date),
        blogCategoryId: idOf(req.body.blogCategory),
        blog: req.body.blog,
        imagePath: req.file ? req.file.filename : existing.imagePath,
        description: req.body.description,
        active: req.body.active === undefined ? existing.active : toBool(req.body.active),
        updatedAt: new Date(),
      },
      include: { blogCategory: true },
    });

    return res.status(200).json({
      data: serializeBlog(updated),
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const record = await prisma.blog.update({
      where: { id: req.params.id },
      data: { deleted: true, deletedAt: new Date() },
    });
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }
    return res.status(204).end();
  } catch (_error) {
    return res.status(404).json({ message: "Record not found" });
  }
};

exports.getAllIncDel = async (req, res) => {
  try {
    const records = await prisma.blog.findMany({
      include: { blogCategory: true },
      orderBy: { date: "desc" },
    });
    if (records.length === 0) {
      return res.status(204).end();
    }
    return res.status(200).json({ data: records.map(serializeBlog) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Keep the original module surface available for callers that inspect it.
exports.serializeBlogCategory = serializeBlogCategory;
