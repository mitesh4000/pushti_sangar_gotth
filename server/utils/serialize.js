// Helpers that convert Prisma records into the JSON shape the original
// MongoDB/Mongoose API returned. In particular every record exposes `_id`
// while also keeping `id` for internal use.

const parseJson = (value, fallback) => {
  if (value === null || value === undefined || value === "") return fallback;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch (_error) {
    return fallback;
  }
};

const json = (value) => {
  if (value === null || value === undefined) return "[]";
  if (typeof value === "string") return value;
  return JSON.stringify(value);
};

const toBool = (value) => {
  if (typeof value === "boolean") return value;
  if (value === "true" || value === "1" || value === 1) return true;
  if (value === "false" || value === "0" || value === 0) return false;
  return Boolean(value);
};

const toNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const idOf = (value) => {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "object") return value.id || value._id || null;
  return String(value);
};

const base = (record) => {
  if (!record) return record;
  const { id, ...rest } = record;
  return { _id: id, id, ...rest };
};

const serializeRole = (role) => {
  if (!role) return role;
  return {
    ...base(role),
    permissions: parseJson(role.permissions, []),
  };
};

const serializeUser = (user) => {
  if (!user) return user;
  const { roles, tokens, password, ...rest } = user;
  return {
    ...base(rest),
    roles: Array.isArray(roles)
      ? roles.map((entry) => (entry.role ? entry.role.role : entry)).filter(Boolean)
      : [],
  };
};

const serializeCustomer = (customer, options = {}) => {
  if (!customer) return customer;
  const {
    address,
    paymentMethods,
    preferences,
    cartItems,
    wishlist,
    orders,
    tokens,
    carts,
    password,
    ...rest
  } = customer;

  const result = {
    ...base(rest),
    address: parseJson(address, []),
    paymentMethods: parseJson(paymentMethods, []),
    preferences: parseJson(preferences, {}),
  };

  if (Array.isArray(cartItems)) {
    result.cartItems = cartItems.map((item) => ({
      _id: item.id,
      id: item.id,
      product: item.product ? serializeProduct(item.product) : item.productId,
      productId: item.productId,
      quantity: item.quantity,
      tax: item.tax,
    }));
  }

  if (Array.isArray(wishlist)) {
    result.wishlist = wishlist.map((item) =>
      item.product ? serializeProduct(item.product) : item.productId
    );
  }

  if (Array.isArray(orders)) {
    result.orderHistory = orders.map((order) => serializeOrder(order));
  }

  if (Array.isArray(carts)) {
    result.carts = carts;
  }

  if (options.raw) {
    return result;
  }

  return result;
};

const serializeProduct = (product) => {
  if (!product) return product;
  const {
    category,
    subCategory,
    subSubCategory,
    gst,
    weightType,
    mainProduct,
    variants,
    orderItems,
    stockEntries,
    cartItems,
    wishlistItems,
    cartProducts,
    tags,
    imageGallery,
    filters,
    otherVariations,
    pricesOriginal,
    pricesDiscounted,
    pricesCalculatedPrice,
    stockQuantity,
    categoryId,
    subCategoryId,
    subSubCategoryId,
    gstId,
    weightTypeId,
    ...rest
  } = product;

  return {
    ...base(rest),
    category: categoryId || null,
    subCategory: subCategoryId || null,
    subSubCategory: subSubCategoryId || null,
    gst: gstId || null,
    weightType: weightTypeId || null,
    mainProductId: rest.mainProductId || null,
    tags: parseJson(tags, []),
    filters: parseJson(filters, []),
    imageGallery: parseJson(imageGallery, []),
    OtherVariations: parseJson(otherVariations, []),
    prices: {
      original: pricesOriginal ?? null,
      discounted: pricesDiscounted ?? null,
      calculatedPrice: pricesCalculatedPrice ?? null,
    },
    stock: { quantity: stockQuantity ?? 0 },
    categoryData: category || null,
    gstData: gst || null,
  };
};

const serializeCategory = (category) => {
  if (!category) return category;
  return base(category);
};

const serializeSubCategory = (subCategory) => {
  if (!subCategory) return subCategory;
  const { category, subSubCategories, products, ...rest } = subCategory;
  const result = {
    ...base(rest),
    Category: rest.categoryId || null,
  };
  if (category) result.CategoryTitle = category.name;
  return result;
};

const serializeSubSubCategory = (subSubCategory) => {
  if (!subSubCategory) return subSubCategory;
  const { category, subCategory, products, ...rest } = subSubCategory;
  const result = {
    ...base(rest),
    Category: rest.categoryId || null,
    SubCategory: rest.subCategoryId || null,
  };
  if (category) result.CategoryTitle = category.name;
  if (subCategory) result.subCategoryTitle = subCategory.name;
  return result;
};

const serializeOrder = (order) => {
  if (!order) return order;
  const { customer, coupon, items, ...rest } = order;
  return {
    ...base(rest),
    customer: rest.customerId || null,
    couponCode: rest.couponId || null,
    products: Array.isArray(items)
      ? items.map((item) => ({
          _id: item.id,
          id: item.id,
          product: item.productId,
          productData: item.product ? serializeProduct(item.product) : null,
          quantity: item.quantity,
        }))
      : [],
  };
};

const serializeStock = (stock) => {
  if (!stock) return stock;
  const { product, ...rest } = stock;
  return {
    ...base(rest),
    ProductId: rest.productId || null,
  };
};

const serializeGst = (gst) => base(gst);

const serializeBanner = (banner) => base(banner);

const serializeBlogCategory = (blogCategory) => {
  if (!blogCategory) return blogCategory;
  const { blogs, ...rest } = blogCategory;
  return base(rest);
};

const serializeBlog = (blog) => {
  if (!blog) return blog;
  const { blogCategory, ...rest } = blog;
  return {
    ...base(rest),
    blogCategory: rest.blogCategoryId || null,
    blogCategoryData: blogCategory || null,
  };
};

const serializeGalleryCategory = (category) => {
  if (!category) return category;
  const { items, ...rest } = category;
  return base(rest);
};

const serializeGalleryDetails = (details) => {
  if (!details) return details;
  const { galleryCategory, ...rest } = details;
  return {
    ...base(rest),
    galleryCategory: rest.galleryCategoryId || null,
  };
};

module.exports = {
  parseJson,
  json,
  toBool,
  toNumber,
  idOf,
  base,
  serializeRole,
  serializeUser,
  serializeCustomer,
  serializeProduct,
  serializeCategory,
  serializeSubCategory,
  serializeSubSubCategory,
  serializeOrder,
  serializeStock,
  serializeGst,
  serializeBanner,
  serializeBlogCategory,
  serializeBlog,
  serializeGalleryCategory,
  serializeGalleryDetails,
};
