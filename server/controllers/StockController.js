const prisma = require("../lib/prisma");
const { serializeStock, toNumber, idOf } = require("../utils/serialize");

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

// Create a new stock entry
exports.createStock = async (req, res) => {
  try {
    const { ProductId, quantity, currentPricePerUnit, date } = req.body;
    const product = await prisma.product.findUnique({ where: { id: idOf(ProductId) } });
    if (!product) {
      return res.send({ success: false, error: "Product not found" });
    }

    const newStock = await prisma.stock.create({
      data: {
        productId: product.id,
        quantity: parseInt(quantity, 10) || 0,
        currentPricePerUnit: toNumber(currentPricePerUnit) || 0,
        name: product.name,
        color: product.productColor,
        size: product.productSize,
        date: parseDate(date),
      },
    });

    return res.send({
      success: true,
      message: "Stock entry created successfully",
      stock: { newStock: serializeStock(newStock) },
    });
  } catch (_error) {
    return res.send({ success: false, error: "Internal Server Error" });
  }
};

// Get all stock entries
exports.getAllStock = async (req, res) => {
  try {
    const stocks = await prisma.stock.findMany({ orderBy: { date: "asc" } });
    return res.send({
      success: true,
      message: "Stock entries retrieved successfully",
      stocks: stocks.map(serializeStock),
    });
  } catch (_error) {
    return res.send({ success: false, error: "Internal Server Error" });
  }
};

// Get stock entry by ID
exports.getStockById = async (req, res) => {
  try {
    const stock = await prisma.stock.findUnique({ where: { id: req.params.id } });
    if (!stock) {
      return res.send({ success: false, error: "Stock entry not found" });
    }
    return res.send({
      success: true,
      message: "Stock entry retrieved successfully",
      stock: serializeStock(stock),
    });
  } catch (_error) {
    return res.send({ success: false, error: "Internal Server Error" });
  }
};

// Update stock entry by ID
exports.updateStockById = async (req, res) => {
  try {
    const stock = await prisma.stock.findUnique({ where: { id: req.params.id } });
    if (!stock) {
      return res.send({ success: false, error: "Stock entry not found" });
    }

    const updatedStock = await prisma.stock.update({
      where: { id: req.params.id },
      data: {
        productId: req.body.ProductId ? idOf(req.body.ProductId) : stock.productId,
        quantity:
          req.body.quantity !== undefined
            ? parseInt(req.body.quantity, 10)
            : stock.quantity,
        currentPricePerUnit:
          req.body.currentPricePerUnit !== undefined
            ? toNumber(req.body.currentPricePerUnit)
            : stock.currentPricePerUnit,
        date: req.body.date !== undefined ? parseDate(req.body.date) : stock.date,
      },
    });

    return res.send({
      success: true,
      message: "Stock entry updated successfully",
      stock: serializeStock(updatedStock),
    });
  } catch (_error) {
    return res.send({ success: false, error: "Internal Server Error" });
  }
};

// Delete stock entry by ID
exports.deleteStockById = async (req, res) => {
  try {
    await prisma.stock.delete({ where: { id: req.params.id } });
    return res.send({ success: true, message: "Stock entry deleted successfully" });
  } catch (_error) {
    return res.send({ success: false, error: "Internal Server Error" });
  }
};

// Get stock entries by category ID
exports.getStockByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      return res.send({ success: false, error: "Category not found" });
    }

    const productsInCategory = await prisma.product.findMany({
      where: { categoryId },
      select: { id: true },
    });
    if (!productsInCategory.length) {
      return res.send({
        success: true,
        message: "No products found in the specified category",
        stockEntries: [],
      });
    }

    const stockEntries = await prisma.stock.findMany({
      where: { productId: { in: productsInCategory.map((product) => product.id) } },
    });

    return res.send({
      success: true,
      message: "Stock entries by category retrieved successfully",
      stockEntries: stockEntries.map(serializeStock),
    });
  } catch (_error) {
    return res.send({ success: false, error: "Internal Server Error" });
  }
};

exports.getStockByPriceUpdate = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const priceUpdate = await prisma.priceUpdate.findUnique({ where: { id: categoryId } });
    if (!priceUpdate) {
      return res.send({ success: false, error: "Category not found" });
    }

    const productsInCategory = await prisma.product.findMany({
      where: { weightTypeId: categoryId },
      select: { id: true },
    });
    if (!productsInCategory.length) {
      return res.send({
        success: true,
        message: "No products found in the specified category",
        stockEntries: [],
      });
    }

    const stockEntries = await prisma.stock.findMany({
      where: { productId: { in: productsInCategory.map((product) => product.id) } },
    });

    return res.send({
      success: true,
      message: "Stock entries by category retrieved successfully",
      stockEntries: stockEntries.map(serializeStock),
    });
  } catch (_error) {
    return res.send({ success: false, error: "Internal Server Error" });
  }
};
