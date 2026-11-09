const prisma = require("../lib/prisma");
const {
  serializeProduct,
  parseJson,
  json,
  toBool,
  toNumber,
  idOf,
} = require("../utils/serialize");

const parseArrayInput = (value) => {
  if (value === null || value === undefined || value === "") return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("[")) {
      try {
        return JSON.parse(trimmed);
      } catch (_error) {
        /* treat as comma separated */
      }
    }
    return trimmed
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [value];
};

const nullableId = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === "object") return idOf(value);
  const stringValue = String(value).trim();
  if (!stringValue || stringValue === "null" || stringValue === "undefined") return null;
  return stringValue;
};

const buildProductData = (body, files, calculatedPrice) => {
  const imageGallery = (files || []).map((file) => file.filename);
  return {
    name: body.name,
    description: body.description,
    categoryId: nullableId(body.category),
    subCategoryId: nullableId(body.subCategory),
    subSubCategoryId: nullableId(body.subSubCategory),
    tags: json(parseArrayInput(body.tags)),
    pricesOriginal: toNumber(body.original),
    pricesDiscounted: toNumber(body.discounted),
    pricesCalculatedPrice: toNumber(calculatedPrice),
    imageGallery: json(imageGallery),
    stockQuantity: toNumber(body.stock),
    hsnCode: body.hsnCode,
    size: body.size,
    shippingCharge: toNumber(body.shippingCharge),
    gstId: nullableId(body.gst),
    sku: body.sku,
    calculationOnWeight: toBool(body.calculationOnWeight),
    weightTypeId: nullableId(body.weightType),
    weight: toNumber(body.weight),
    laborCost: toNumber(body.laborCost),
    discountOnLaborCost: toNumber(body.discountOnLaborCost),
    isActive: body.isActive === undefined ? true : toBool(body.isActive),
    isProductPopular:
      body.isProductPopular === undefined ? true : toBool(body.isProductPopular),
    isProductNew: body.isProductNew === undefined ? true : toBool(body.isProductNew),
    filters: json(parseArrayInput(body.filters)),
    color: body.color || null,
    material: body.material || null,
    season: body.season || null,
    productColor: body.productColor || null,
    productSize: body.productSize || null,
  };
};

const calculatePrice = async (body) => {
  if (toBool(body.calculationOnWeight)) {
    const weightTypeId = nullableId(body.weightType);
    if (weightTypeId) {
      const priceUpdate = await prisma.priceUpdate.findUnique({ where: { id: weightTypeId } });
      if (priceUpdate && priceUpdate.price !== null) {
        const weight = toNumber(body.weight) || 0;
        const discount = toNumber(body.discountOnLaborCost) || 0;
        return priceUpdate.price * weight + weight * discount;
      }
    }
  }
  return toNumber(body.original);
};

const productInclude = {
  category: true,
  gst: true,
  weightType: true,
};

// Create Product
const addProduct = async (req, res) => {
  try {
    const calculatedPrice = await calculatePrice(req.body);
    const data = buildProductData(req.body, req.files, calculatedPrice);
    const newProduct = await prisma.product.create({ data });
    const updated = await prisma.product.update({
      where: { id: newProduct.id },
      data: { mainProductId: newProduct.id },
      include: productInclude,
    });

    return res.send({
      success: true,
      newProduct: serializeProduct(updated),
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Internal Server Error" });
  }
};

const addVarProduct = async (req, res) => {
  try {
    const calculatedPrice = await calculatePrice(req.body);
    const data = buildProductData(req.body, req.files, calculatedPrice);
    data.isVariant = true;
    data.productColor = req.body.productColor || null;
    data.productSize = req.body.productSize || null;

    const mainProductId = nullableId(req.body.id);
    const oldProduct = mainProductId
      ? await prisma.product.findUnique({ where: { id: mainProductId } })
      : null;
    if (!oldProduct) {
      return res.status(404).send({ success: false, error: "Main product not found" });
    }

    const newProduct = await prisma.product.create({
      data: { ...data, mainProductId },
      include: productInclude,
    });

    const variations = parseJson(oldProduct.otherVariations, []);
    variations.push(newProduct.id);
    await prisma.product.update({
      where: { id: oldProduct.id },
      data: { otherVariations: json(variations) },
    });

    return res.send({
      success: true,
      newProduct: serializeProduct(newProduct),
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, error: "Internal Server Error" });
  }
};

const getVarProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: productInclude,
    });

    if (!product) {
      return res.send({ success: false, message: "Variant product not found." });
    }
    if (!product.isVariant) {
      return res.send({ success: false, message: "This product is not a variant." });
    }

    return res.send({ success: true, product: serializeProduct(product) });
  } catch (_error) {
    return res.send({ success: false, error: "Failed to fetch the variant product." });
  }
};

const getAllVarProducts = async (req, res) => {
  try {
    const productIds = (req.body.productIds || []).map(idOf).filter(Boolean);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: productInclude,
    });
    return res.send({ success: true, products: products.map(serializeProduct) });
  } catch (_error) {
    return res.send({ success: false, error: "Failed to fetch the variant product." });
  }
};

const getAllProductsForTable = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    const rows = products.map((product) => ({
      _id: product.id,
      id: product.id,
      categoryTitle: product.category ? product.category.name : null,
      sku: product.sku,
      calculationOnWeight: product.calculationOnWeight,
      prices: {
        original: product.pricesOriginal,
        discounted: product.pricesDiscounted,
        calculatedPrice: product.pricesCalculatedPrice,
      },
      name: product.name,
      laborCost: product.laborCost,
      isProductNew: product.isProductNew,
      weight: product.weight,
      imageGallery: parseJson(product.imageGallery, []),
      isVariant: product.isVariant,
    }));

    return res.send({ success: true, products: rows });
  } catch (_error) {
    return res.send({ success: false, error: "Failed to fetch products." });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const { category, color, material, season, minPrice, maxPrice } = req.query;
    const where = {};

    if (category) where.categoryId = category;
    if (color) where.color = color;
    if (material) where.material = material;
    if (season) where.season = season;

    const hasMin = minPrice !== undefined && minPrice !== "" && !Number.isNaN(Number(minPrice));
    const hasMax = maxPrice !== undefined && maxPrice !== "" && !Number.isNaN(Number(maxPrice));
    if (hasMin || hasMax) {
      const range = {};
      if (hasMin) range.gte = Number(minPrice);
      if (hasMax) range.lte = Number(maxPrice);
      where.OR = [
        { pricesDiscounted: range },
        { AND: [{ pricesDiscounted: null }, { pricesCalculatedPrice: range }] },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: productInclude,
      orderBy: { createdAt: "desc" },
    });

    return res.send({ success: true, products: products.map(serializeProduct) });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, error: error.message });
  }
};

// Get Specific Product
const getSpecificProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: productInclude,
    });
    if (!product) {
      return res.send({ success: false, message: "Product not found." });
    }
    return res.send({ success: true, product: serializeProduct(product) });
  } catch (_error) {
    return res.send({ success: false, error: "Failed to fetch the product." });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productToUpdate = await prisma.product.findUnique({ where: { id } });
    if (!productToUpdate) {
      return res.send({ error: "SubSubCategory not found" });
    }

    const body = req.body;
    const files = req.files || [];

    const shouldRecalculatePrice =
      toBool(body.calculationOnWeight) &&
      (nullableId(body.weightType) !== productToUpdate.weightTypeId ||
        toNumber(body.weight) !== productToUpdate.weight ||
        toNumber(body.discountOnLaborCost) !== productToUpdate.discountOnLaborCost);

    let calculatedPrice = productToUpdate.pricesCalculatedPrice;
    if (toNumber(body.original) !== productToUpdate.pricesOriginal) {
      calculatedPrice = toNumber(body.original);
    }
    if (shouldRecalculatePrice) {
      calculatedPrice = await calculatePrice(body);
    }

    let imageGallery = parseJson(productToUpdate.imageGallery, []);
    if (body.imageGallery !== undefined) {
      imageGallery = parseArrayInput(body.imageGallery);
    }
    const addedImages = files.map((file) => file.filename);
    if (addedImages.length > 0) {
      imageGallery = imageGallery.concat(addedImages);
    }

    const data = {
      ...buildProductData(body, [], calculatedPrice),
      imageGallery: json(imageGallery),
    };

    await prisma.product.update({ where: { id }, data });
    const updated = await prisma.product.findUnique({ where: { id }, include: productInclude });

    return res.send({
      success: true,
      msg: "Product updated successfully",
      data: serializeProduct(updated),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    return res.send({ success: true, message: "Product deleted successfully." });
  } catch (_error) {
    return res.send({ success: false, error: "Failed to delete the product." });
  }
};

const findByField = async (field, id, res) => {
  const products = await prisma.product.findMany({
    where: { [field]: id },
    include: productInclude,
  });
  if (!products.length) {
    return res.send({
      success: false,
      message: "No products found for the specified category.",
    });
  }
  return res.send({ success: true, products: products.map(serializeProduct) });
};

// Get Products by CategoryId
const getProductsByCategoryId = async (req, res) => {
  try {
    return await findByField("categoryId", req.params.id, res);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.send({ success: false, error: error.message });
  }
};

// Get product by product tags
const getProductsByTag = async (req, res) => {
  try {
    const tag = req.query.tag;
    if (!tag) {
      return res.send({ success: false, error: "Tag parameter is required." });
    }

    const products = await prisma.product.findMany({ include: productInclude });
    const needle = String(tag).toLowerCase();
    const matches = products.filter((product) =>
      parseJson(product.tags, []).some((entry) =>
        String(entry).toLowerCase().includes(needle)
      )
    );

    return res.send({ success: true, products: matches.map(serializeProduct) });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, error: error.message });
  }
};

// Get Products by subCategory
const getProductsBysubCategoryId = async (req, res) => {
  try {
    return await findByField("subCategoryId", req.params.id, res);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.send({ success: false, error: error.message });
  }
};

// Get Products by subSubCategory
const getProductsBysubSubCategoryId = async (req, res) => {
  try {
    return await findByField("subSubCategoryId", req.params.id, res);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.send({ success: false, error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getSpecificProduct,
  updateProduct,
  deleteProduct,
  addProduct,
  getProductsByCategoryId,
  getAllProductsForTable,
  addVarProduct,
  getVarProductById,
  getAllVarProducts,
  getProductsByTag,
  getProductsBysubCategoryId,
  getProductsBysubSubCategoryId,
};
