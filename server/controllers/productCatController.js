const prisma = require("../lib/prisma");
const {
  serializeCategory,
  serializeSubSubCategory,
  toBool,
  idOf,
} = require("../utils/serialize");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const name = req.body.name;
    const existing = name ? await prisma.category.findFirst({ where: { name } }) : null;
    if (existing) {
      return res.status(400).send({ error: `record with name '${name}' already exists` });
    }

    const newRecordAdded = await prisma.category.create({
      data: {
        name,
        description: req.body.description,
        image: req.file ? req.file.filename : "",
        isActive: req.body.isActive === undefined ? true : toBool(req.body.isActive),
      },
    });

    return res.status(201).json({
      data: serializeCategory(newRecordAdded),
      message: "category added successfully",
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "asc" },
    });
    return res.send(categories.map(serializeCategory));
  } catch (_error) {
    return res.send({ error: "Server error" });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await prisma.category.findUnique({ where: { id: req.params.id } });
    if (!category) {
      return res.send({ error: "Category not found" });
    }
    return res.send({ success: true, category: serializeCategory(category) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Update a category by ID
exports.updateCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryToUpdate = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!categoryToUpdate) {
      return res.send({ error: "Category not found" });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : categoryToUpdate.image,
        isActive:
          req.body.isActive === undefined
            ? categoryToUpdate.isActive
            : toBool(req.body.isActive),
        updatedAt: new Date(),
      },
    });

    return res.send({
      success: true,
      msg: "Category updated successfully",
      data: serializeCategory(updatedCategory),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Delete a category by ID (soft delete)
exports.deleteCategoryById = async (req, res) => {
  try {
    await prisma.category.update({
      where: { id: req.params.id },
      data: { isDeleted: true, updatedAt: new Date() },
    });
    return res.send({ success: true, message: "Category deleted successfully" });
  } catch (_error) {
    return res.send({ success: false, error: "Category not found" });
  }
};

// Get deleted Categories
exports.getAllDeletedCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({ where: { isDeleted: true } });
    return res.send(categories.map(serializeCategory));
  } catch (_error) {
    return res.send({ error: "Server error" });
  }
};

// Get subcategories and subsubcategories by categoryId
exports.getSubCategoriesAndSubSubCategoriesByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const rows = await prisma.subSubCategory.findMany({
      where: { categoryId, isDeleted: false },
      include: { subCategory: true },
      orderBy: { name: "asc" },
    });

    const grouped = new Map();
    for (const row of rows) {
      const key = row.subCategoryId || idOf(row.subCategory) || "unknown";
      if (!grouped.has(key)) {
        grouped.set(key, {
          _id: key,
          subCategoryName: row.subCategory ? row.subCategory.name : null,
          subSubCategories: [],
        });
      }
      grouped.get(key).subSubCategories.push({ id: row.id, name: row.name });
    }

    return res.send({
      success: true,
      categoriesWithSubCategoriesAndSubSubCategories: Array.from(grouped.values()),
    });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

// Kept for parity with the original controller exports.
exports.serializeSubSubCategory = serializeSubSubCategory;
