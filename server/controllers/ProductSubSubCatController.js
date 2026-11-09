const prisma = require("../lib/prisma");
const { serializeSubSubCategory, toBool, idOf } = require("../utils/serialize");

// Create a new sub-sub-category
exports.addSubSubCategory = async (req, res) => {
  try {
    const newSubSubCategory = await prisma.subSubCategory.create({
      data: {
        name: req.body.name,
        categoryId: idOf(req.body.Category) || idOf(req.body.categoryId),
        subCategoryId: idOf(req.body.SubCategory) || idOf(req.body.subCategoryId),
        isActive: req.body.isActive === undefined ? true : toBool(req.body.isActive),
      },
      include: { category: true, subCategory: true },
    });

    return res.send({
      success: true,
      data: serializeSubSubCategory(newSubSubCategory),
      msg: "SubSubCategory added",
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Get all sub-sub-categories
exports.getAllSubSubCategories = async (req, res) => {
  try {
    const subSubCategories = await prisma.subSubCategory.findMany({
      include: { category: true, subCategory: true },
      orderBy: { createdAt: "asc" },
    });
    return res.send(subSubCategories.map(serializeSubSubCategory));
  } catch (_error) {
    return res.send({ error: "Server error" });
  }
};

// Get a single sub-sub-category by ID
exports.getSubSubCategoryById = async (req, res) => {
  try {
    const subSubCategory = await prisma.subSubCategory.findUnique({
      where: { id: req.params.id },
      include: { category: true, subCategory: true },
    });
    if (!subSubCategory) {
      return res.send({ error: "SubSubCategory not found" });
    }
    return res.send({
      success: true,
      subSubCategory: serializeSubSubCategory(subSubCategory),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Update a sub-sub-category by ID
exports.updateSubSubCategoryById = async (req, res) => {
  try {
    const subSubCategoryId = req.params.id;
    const existing = await prisma.subSubCategory.findUnique({ where: { id: subSubCategoryId } });
    if (!existing) {
      return res.send({ error: "SubSubCategory not found" });
    }

    const updated = await prisma.subSubCategory.update({
      where: { id: subSubCategoryId },
      data: {
        name: req.body.name,
        categoryId: idOf(req.body.Category) || idOf(req.body.categoryId),
        subCategoryId: idOf(req.body.SubCategory) || idOf(req.body.subCategoryId),
        isActive:
          req.body.isActive === undefined ? existing.isActive : toBool(req.body.isActive),
        updatedAt: new Date(),
      },
      include: { category: true, subCategory: true },
    });

    return res.send({
      success: true,
      msg: "SubSubCategory updated successfully",
      data: serializeSubSubCategory(updated),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Delete a sub-sub-category by ID (soft delete)
exports.deleteSubSubCategoryById = async (req, res) => {
  try {
    await prisma.subSubCategory.update({
      where: { id: req.params.id },
      data: { isDeleted: true, updatedAt: new Date() },
    });
    return res.send({ success: true, message: "SubSubCategory deleted successfully" });
  } catch (_error) {
    return res.send({ success: false, error: "SubSubCategory not found" });
  }
};

// Get deleted SubSubCategories
exports.getAllDeletedSubSubCategories = async (req, res) => {
  try {
    const subSubCategories = await prisma.subSubCategory.findMany({
      where: { isDeleted: true },
      include: { category: true, subCategory: true },
    });
    return res.send(subSubCategories.map(serializeSubSubCategory));
  } catch (_error) {
    return res.send({ error: "Server error" });
  }
};
