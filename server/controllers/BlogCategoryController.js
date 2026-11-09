const prisma = require("../lib/prisma");
const { serializeBlogCategory, toBool } = require("../utils/serialize");

exports.getBlogCategories = async (req, res) => {
  try {
    const blogCategories = await prisma.blogCategory.findMany({
      orderBy: { createdAt: "asc" },
    });
    return res.status(200).json({ blogCategories: blogCategories.map(serializeBlogCategory) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createBlogCategory = async (req, res) => {
  try {
    const { name, active } = req.body;
    const newCategory = await prisma.blogCategory.create({
      data: { name, active: active === undefined ? true : toBool(active) },
    });
    return res.status(201).json({ success: true, data: serializeBlogCategory(newCategory) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBlogCategoryById = async (req, res) => {
  try {
    const category = await prisma.blogCategory.findUnique({
      where: { id: req.params.id },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json({ success: true, data: serializeBlogCategory(category) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateBlogCategory = async (req, res) => {
  try {
    const existing = await prisma.blogCategory.findUnique({
      where: { id: req.params.id },
    });
    if (!existing) {
      return res.status(404).json({ error: "Category not found" });
    }

    const { name, active } = req.body;
    const updatedCategory = await prisma.blogCategory.update({
      where: { id: req.params.id },
      data: {
        name,
        active: active === undefined ? existing.active : toBool(active),
        updatedAt: new Date(),
      },
    });
    return res.status(200).json({ success: true, data: serializeBlogCategory(updatedCategory) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBlogCategory = async (req, res) => {
  try {
    await prisma.blogCategory.delete({ where: { id: req.params.id } });
    return res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (_error) {
    return res.status(404).json({ error: "Category not found" });
  }
};
