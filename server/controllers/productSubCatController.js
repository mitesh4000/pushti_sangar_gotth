const prisma = require("../lib/prisma");
const { serializeSubCategory, toBool, idOf } = require("../utils/serialize");

// Create a new sub-category
exports.addSubCategory = async (req, res) => {
  try {
    const newSubCategory = await prisma.subCategory.create({
      data: {
        name: req.body.name,
        categoryId: idOf(req.body.Category) || idOf(req.body.categoryId),
        isActive: req.body.isActive === undefined ? true : toBool(req.body.isActive),
      },
      include: { category: true },
    });

    return res.send({
      success: true,
      newSubCategory: serializeSubCategory(newSubCategory),
      msg: "SubCategory added",
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Get all sub-categories
exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await prisma.subCategory.findMany({
      include: { category: true },
      orderBy: { createdAt: "asc" },
    });
    return res.send(subCategories.map(serializeSubCategory));
  } catch (_error) {
    return res.send({ error: "Server error" });
  }
};

// Get a single sub-category by ID
exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await prisma.subCategory.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    });
    if (!subCategory) {
      return res.send({ error: "SubCategory not found" });
    }
    return res.send({ success: true, subCategory: serializeSubCategory(subCategory) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Update a sub-category by ID
exports.updateSubCategoryById = async (req, res) => {
  try {
    const subCategoryId = req.params.id;
    const subCategoryToUpdate = await prisma.subCategory.findUnique({
      where: { id: subCategoryId },
    });
    if (!subCategoryToUpdate) {
      return res.send({ error: "SubCategory not found" });
    }

    const updatedSubCategory = await prisma.subCategory.update({
      where: { id: subCategoryId },
      data: {
        name: req.body.name,
        isActive:
          req.body.isActive === undefined
            ? subCategoryToUpdate.isActive
            : toBool(req.body.isActive),
        updatedAt: new Date(),
      },
      include: { category: true },
    });

    return res.send({
      success: true,
      msg: "SubCategory updated successfully",
      updatedSubCategory: serializeSubCategory(updatedSubCategory),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Delete a sub-category by ID
exports.deleteSubCategoryById = async (req, res) => {
  try {
    await prisma.subCategory.delete({ where: { id: req.params.id } });
    return res.send({ success: true, message: "SubCategory deleted successfully" });
  } catch (_error) {
    return res.send({ success: false, error: "SubCategory not found" });
  }
};

// Get deleted SubCategories
exports.getAllDeletedSubCategories = async (req, res) => {
  try {
    const subCategories = await prisma.subCategory.findMany({ where: { isDeleted: true } });
    return res.send(subCategories.map(serializeSubCategory));
  } catch (_error) {
    return res.send({ error: "Server error" });
  }
};
