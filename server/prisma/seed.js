/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const prisma = require("../lib/prisma");

const CATEGORY_IDS = {
  SHRINGAR: "650837d4f32a06ef841fa5d6",
  SILVER_VESSELS: "650837faf32a06ef841fa5d8",
  SUGANDHI: "65083812f32a06ef841fa5da",
  PICHWAI: "6508382bf32a06ef841fa5dc",
  VASTRA: "65083839f32a06ef841fa5de",
  FIBRE: "65083849f32a06ef841fa5e0",
  SEASONAL: "6508385bf32a06ef841fa5e2",
};

const uploadsDir = path.join(__dirname, "..", "uploads");

const listFiles = (folder) => {
  const dir = path.join(uploadsDir, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => !file.startsWith("."))
    .sort();
};

const productImages = listFiles("Products");
const categoryImages = listFiles("Category");
const bannerImages = listFiles("Banner");
const blogImages = listFiles("Blog");
const galleryImages = listFiles("Gallery");

const pick = (files, index) => (files.length ? files[index % files.length] : "");
const pickMany = (files, start, count) =>
  Array.from({ length: count }, (_, offset) => pick(files, start + offset)).filter(Boolean);

const date = (value) => new Date(value);

const json = (value) => JSON.stringify(value);

const rolePermissions = {
  Admin: [
    "dashboard",
    "products",
    "orders",
    "customers",
    "categories",
    "stock",
    "blogs",
    "gallery",
    "content",
    "coupons",
    "banners",
    "materials",
    "seasons",
    "colors",
    "sizes",
    "gst",
    "dailyrates",
    "users",
    "roles",
    "reports",
  ],
  Manager: ["dashboard", "products", "orders", "customers", "categories", "stock", "reports"],
  User: ["dashboard"],
};

const categories = [
  {
    id: CATEGORY_IDS.SHRINGAR,
    name: "Shringar",
    description: "Traditional shringar and adornment pieces crafted for every celebration.",
  },
  {
    id: CATEGORY_IDS.SILVER_VESSELS,
    name: "Silver Vessels",
    description: "Handcrafted silver vessels and pooja essentials.",
  },
  {
    id: CATEGORY_IDS.SUGANDHI,
    name: "Sugandhi",
    description: "Fragrance, incense and aromatic ritual offerings.",
  },
  {
    id: CATEGORY_IDS.PICHWAI,
    name: "Pichwai And Wall Art",
    description: "Pichwai paintings and handcrafted wall art.",
  },
  {
    id: CATEGORY_IDS.VASTRA,
    name: "Vastra",
    description: "Traditional textiles, garments and festive attire.",
  },
  {
    id: CATEGORY_IDS.FIBRE,
    name: "Fibre Items",
    description: "Eco-friendly fibre decor and utility items.",
  },
  {
    id: CATEGORY_IDS.SEASONAL,
    name: "Seasonal Products",
    description: "Limited seasonal collections for festivals and celebrations.",
  },
];

const subCategorySeeds = [
  ["seed-sub-shringar-1", "Necklaces", CATEGORY_IDS.SHRINGAR],
  ["seed-sub-shringar-2", "Bangles", CATEGORY_IDS.SHRINGAR],
  ["seed-sub-silver-1", "Pooja Vessels", CATEGORY_IDS.SILVER_VESSELS],
  ["seed-sub-silver-2", "Gift Articles", CATEGORY_IDS.SILVER_VESSELS],
  ["seed-sub-sugandhi-1", "Incense", CATEGORY_IDS.SUGANDHI],
  ["seed-sub-sugandhi-2", "Aromatic Oils", CATEGORY_IDS.SUGANDHI],
  ["seed-sub-pichwai-1", "Pichwai Paintings", CATEGORY_IDS.PICHWAI],
  ["seed-sub-pichwai-2", "Wall Decor", CATEGORY_IDS.PICHWAI],
  ["seed-sub-vastra-1", "Sarees", CATEGORY_IDS.VASTRA],
  ["seed-sub-vastra-2", "Festive Wear", CATEGORY_IDS.VASTRA],
  ["seed-sub-fibre-1", "Home Decor", CATEGORY_IDS.FIBRE],
  ["seed-sub-fibre-2", "Utility Items", CATEGORY_IDS.FIBRE],
  ["seed-sub-seasonal-1", "Festive Specials", CATEGORY_IDS.SEASONAL],
  ["seed-sub-seasonal-2", "Gift Sets", CATEGORY_IDS.SEASONAL],
];

const subSubCategorySeeds = [
  ["seed-subsub-shringar-1", "Kundan Necklace", "seed-sub-shringar-1", CATEGORY_IDS.SHRINGAR],
  ["seed-subsub-shringar-2", "Temple Jewellery", "seed-sub-shringar-2", CATEGORY_IDS.SHRINGAR],
  ["seed-subsub-silver-1", "Silver Kalash", "seed-sub-silver-1", CATEGORY_IDS.SILVER_VESSELS],
  ["seed-subsub-silver-2", "Silver Bowl", "seed-sub-silver-2", CATEGORY_IDS.SILVER_VESSELS],
  ["seed-subsub-sugandhi-1", "Dhoop Sticks", "seed-sub-sugandhi-1", CATEGORY_IDS.SUGANDHI],
  ["seed-subsub-sugandhi-2", "Sandalwood Oil", "seed-sub-sugandhi-2", CATEGORY_IDS.SUGANDHI],
  ["seed-subsub-pichwai-1", "Krishna Pichwai", "seed-sub-pichwai-1", CATEGORY_IDS.PICHWAI],
  ["seed-subsub-pichwai-2", "Wall Panel", "seed-sub-pichwai-2", CATEGORY_IDS.PICHWAI],
  ["seed-subsub-vastra-1", "Banarasi Saree", "seed-sub-vastra-1", CATEGORY_IDS.VASTRA],
  ["seed-subsub-vastra-2", "Kurta Set", "seed-sub-vastra-2", CATEGORY_IDS.VASTRA],
  ["seed-subsub-fibre-1", "Fibre Lamp", "seed-sub-fibre-1", CATEGORY_IDS.FIBRE],
  ["seed-subsub-fibre-2", "Fibre Basket", "seed-sub-fibre-2", CATEGORY_IDS.FIBRE],
  ["seed-subsub-seasonal-1", "Diwali Hamper", "seed-sub-seasonal-1", CATEGORY_IDS.SEASONAL],
  ["seed-subsub-seasonal-2", "Wedding Gift Set", "seed-sub-seasonal-2", CATEGORY_IDS.SEASONAL],
];

const productSeeds = [
  ["seed-product-1", "Kundan Bridal Necklace", "Handcrafted kundan necklace with traditional detailing.", CATEGORY_IDS.SHRINGAR, "seed-sub-shringar-1", "seed-subsub-shringar-1", 8450, 6999, "Gold", "Gold", "Festive", ["bridal", "kundan", "necklace"], "seed-gst-5"],
  ["seed-product-2", "Temple Bangles Set", "A set of temple-inspired bangles with antique finish.", CATEGORY_IDS.SHRINGAR, "seed-sub-shringar-2", "seed-subsub-shringar-2", 3250, 2799, "Gold", "Brass", "Festive", ["bangles", "temple", "traditional"], "seed-gst-5"],
  ["seed-product-3", "Silver Kalash", "Pure silver kalash for pooja and auspicious ceremonies.", CATEGORY_IDS.SILVER_VESSELS, "seed-sub-silver-1", "seed-subsub-silver-1", 12500, 10999, "Silver", "Silver", "All Season", ["pooja", "silver", "kalash"], "seed-gst-12"],
  ["seed-product-4", "Silver Gift Bowl", "Elegant silver bowl ideal for gifting.", CATEGORY_IDS.SILVER_VESSELS, "seed-sub-silver-2", "seed-subsub-silver-2", 5600, 4999, "Silver", "Silver", "All Season", ["gift", "silver", "bowl"], "seed-gst-12"],
  ["seed-product-5", "Havan Dhoop Sticks", "Natural aromatic dhoop sticks for daily rituals.", CATEGORY_IDS.SUGANDHI, "seed-sub-sugandhi-1", "seed-subsub-sugandhi-1", 450, 399, "Brown", "Wood", "Monsoon", ["dhoop", "incense", "aroma"], "seed-gst-5"],
  ["seed-product-6", "Sandalwood Aroma Oil", "Soothing sandalwood oil for pooja and wellbeing.", CATEGORY_IDS.SUGANDHI, "seed-sub-sugandhi-2", "seed-subsub-sugandhi-2", 850, 749, "Brown", "Wood", "Summer", ["sandalwood", "oil", "aroma"], "seed-gst-12"],
  ["seed-product-7", "Krishna Pichwai Painting", "Hand-painted Krishna pichwai on cotton canvas.", CATEGORY_IDS.PICHWAI, "seed-sub-pichwai-1", "seed-subsub-pichwai-1", 6500, 5999, "Multicolour", "Cotton", "All Season", ["pichwai", "krishna", "painting"], "seed-gst-12"],
  ["seed-product-8", "Floral Wall Panel", "Decorative floral wall panel for living spaces.", CATEGORY_IDS.PICHWAI, "seed-sub-pichwai-2", "seed-subsub-pichwai-2", 4200, 3699, "Multicolour", "Wood", "All Season", ["wall art", "panel", "floral"], "seed-gst-12"],
  ["seed-product-9", "Banarasi Silk Saree", "Classic Banarasi silk saree with zari border.", CATEGORY_IDS.VASTRA, "seed-sub-vastra-1", "seed-subsub-vastra-1", 8900, 7999, "Maroon", "Silk", "Festive", ["saree", "silk", "banarasi"], "seed-gst-12"],
  ["seed-product-10", "Festive Kurta Set", "Comfortable festive kurta set with subtle embroidery.", CATEGORY_IDS.VASTRA, "seed-sub-vastra-2", "seed-subsub-vastra-2", 3200, 2799, "Green", "Cotton", "Winter", ["kurta", "festive", "cotton"], "seed-gst-12"],
  ["seed-product-11", "Fibre Table Lamp", "Handwoven fibre lamp that adds a warm glow.", CATEGORY_IDS.FIBRE, "seed-sub-fibre-1", "seed-subsub-fibre-1", 2400, 1999, "Natural", "Fibre", "All Season", ["lamp", "fibre", "decor"], "seed-gst-18"],
  ["seed-product-12", "Fibre Storage Basket", "Durable woven basket for everyday storage.", CATEGORY_IDS.FIBRE, "seed-sub-fibre-2", "seed-subsub-fibre-2", 1200, 999, "Natural", "Fibre", "All Season", ["basket", "storage", "fibre"], "seed-gst-18"],
  ["seed-product-13", "Diwali Gift Hamper", "Curated festive hamper with sweets, diya and decor.", CATEGORY_IDS.SEASONAL, "seed-sub-seasonal-1", "seed-subsub-seasonal-1", 4500, 3999, "Multicolour", "Mixed", "Festive", ["diwali", "hamper", "gift"], "seed-gst-18"],
  ["seed-product-14", "Wedding Gift Set", "Elegant wedding gift set with silver-plated articles.", CATEGORY_IDS.SEASONAL, "seed-sub-seasonal-2", "seed-subsub-seasonal-2", 7800, 6999, "Silver", "Silver", "Winter", ["wedding", "gift", "set"], "seed-gst-18"],
];

async function main() {
  console.log("Seeding database...");

  // Roles -----------------------------------------------------------------
  for (const [role, permissions] of Object.entries(rolePermissions)) {
    await prisma.role.upsert({
      where: { role },
      update: { permissions: json(permissions) },
      create: { role, permissions: json(permissions) },
    });
  }

  const roleRecords = {};
  for (const role of Object.keys(rolePermissions)) {
    roleRecords[role] = await prisma.role.findUnique({ where: { role } });
  }

  // Users -----------------------------------------------------------------
  const userSeeds = [
    {
      name: "Pusti Shangar Admin",
      email: "admin@pushtishangar.com",
      password: "Admin@123",
      photo: `uploads/${pick(listFiles(""), 0)}`,
      roles: ["Admin"],
    },
    {
      name: "Store Manager",
      email: "manager@pushtishangar.com",
      password: "Manager@123",
      photo: `uploads/${pick(listFiles(""), 1)}`,
      roles: ["Manager"],
    },
    {
      name: "Support User",
      email: "user@pushtishangar.com",
      password: "User@123",
      photo: `uploads/${pick(listFiles(""), 2)}`,
      roles: ["User"],
    },
  ];

  for (const seed of userSeeds) {
    const existing = await prisma.user.findUnique({ where: { email: seed.email } });
    const user = existing
      ? await prisma.user.update({
          where: { email: seed.email },
          data: {
            name: seed.name,
            photo: seed.photo,
            active: true,
          },
        })
      : await prisma.user.create({
          data: {
            name: seed.name,
            email: seed.email,
            password: await bcrypt.hash(seed.password, 10),
            photo: seed.photo,
            active: true,
          },
        });

    await prisma.userRole.deleteMany({ where: { userId: user.id } });
    for (const roleName of seed.roles) {
      await prisma.userRole.create({
        data: { userId: user.id, roleId: roleRecords[roleName].id },
      });
    }
  }

  // Customers -------------------------------------------------------------
  const customerSeeds = [
    ["seed-customer-1", "Aarohi Shah", "aarohi@example.com", "Customer@123", ["12 MG Road, Vadodara, Gujarat"], "+919876543210"],
    ["seed-customer-2", "Vihaan Mehta", "vihaan@example.com", "Customer@123", ["45 Ring Road, Surat, Gujarat"], "+919876543211"],
    ["seed-customer-3", "Diya Patel", "diya@example.com", "Customer@123", ["8 Alkapuri, Vadodara, Gujarat"], "+919876543212"],
  ];

  const customers = {};
  for (const [id, username, email, password, address, phone] of customerSeeds) {
    const existing = await prisma.customer.findUnique({ where: { email } });
    const customer = existing
      ? await prisma.customer.update({
          where: { email },
          data: {
            username,
            address: json(address),
            phone,
            active: true,
            deleted: false,
          },
        })
      : await prisma.customer.create({
          data: {
            username,
            email,
            password: await bcrypt.hash(password, 10),
            address: json(address),
            phone,
            paymentMethods: json(["COD", "UPI"]),
            preferences: json({ language: "en", currency: "INR" }),
            active: true,
          },
        });
    customers[id] = customer;
  }

  // Categories / subcategories / sub-subcategories --------------------------
  for (let index = 0; index < categories.length; index += 1) {
    const category = categories[index];
    await prisma.category.upsert({
      where: { id: category.id },
      update: {
        name: category.name,
        description: category.description,
        image: pick(categoryImages, index),
        isDeleted: false,
        isActive: true,
      },
      create: {
        id: category.id,
        name: category.name,
        description: category.description,
        image: pick(categoryImages, index),
        isDeleted: false,
        isActive: true,
      },
    });
  }

  for (const [id, name, categoryId] of subCategorySeeds) {
    await prisma.subCategory.upsert({
      where: { id },
      update: { name, categoryId, isDeleted: false, isActive: true },
      create: { id, name, categoryId, isDeleted: false, isActive: true },
    });
  }

  for (const [id, name, subCategoryId, categoryId] of subSubCategorySeeds) {
    await prisma.subSubCategory.upsert({
      where: { id },
      update: { name, subCategoryId, categoryId, isDeleted: false, isActive: true },
      create: { id, name, subCategoryId, categoryId, isDeleted: false, isActive: true },
    });
  }

  // Masters ---------------------------------------------------------------
  const colors = ["Gold", "Silver", "Maroon", "Green", "Blue", "Pink", "White", "Multicolour", "Natural", "Brown"];
  for (let index = 0; index < colors.length; index += 1) {
    await prisma.color.upsert({
      where: { id: `seed-color-${index + 1}` },
      update: { name: colors[index] },
      create: { id: `seed-color-${index + 1}`, name: colors[index] },
    });
  }

  const materials = ["Gold", "Silver", "Brass", "Copper", "Wood", "Cotton", "Silk", "Fibre", "Mixed"];
  for (let index = 0; index < materials.length; index += 1) {
    await prisma.material.upsert({
      where: { id: `seed-material-${index + 1}` },
      update: { name: materials[index] },
      create: { id: `seed-material-${index + 1}`, name: materials[index] },
    });
  }

  const seasons = ["Summer", "Winter", "Monsoon", "Festive", "All Season"];
  for (let index = 0; index < seasons.length; index += 1) {
    await prisma.season.upsert({
      where: { id: `seed-season-${index + 1}` },
      update: { name: seasons[index] },
      create: { id: `seed-season-${index + 1}`, name: seasons[index] },
    });
  }

  const sizes = [1, 2, 3, 4, 5, 6, 8, 10, 12];
  for (const size of sizes) {
    const existing = await prisma.size.findFirst({ where: { size } });
    if (!existing) {
      await prisma.size.create({ data: { size } });
    }
  }

  const gstSlabs = [5, 12, 18];
  for (const [index, gst] of gstSlabs.entries()) {
    await prisma.gst.upsert({
      where: { id: `seed-gst-${gst}` },
      update: { gst, sgst: gst / 2, cgst: gst / 2, igst: gst, isDeleted: false, isActive: true },
      create: {
        id: `seed-gst-${gst}`,
        gst,
        sgst: gst / 2,
        cgst: gst / 2,
        igst: gst,
        isDeleted: false,
        isActive: true,
      },
    });
  }

  const priceUpdates = [
    ["seed-price-gold", "Gold Rate", 6200],
    ["seed-price-silver", "Silver Rate", 78],
    ["seed-price-labour", "Labour Rate", 450],
  ];
  for (const [id, productType, price] of priceUpdates) {
    await prisma.priceUpdate.upsert({
      where: { id },
      update: { productType, price },
      create: { id, productType, price },
    });
  }

  const coupons = [
    ["seed-coupon-welcome", "WELCOME10", "%", "10% off on your first order", 10],
    ["seed-coupon-festive", "FESTIVE500", "₹", "Flat ₹500 off on festive orders", 500],
  ];
  for (const [id, name, type, description, discount] of coupons) {
    await prisma.coupon.upsert({
      where: { id },
      update: {
        name,
        type,
        description,
        discount,
        start: date("2024-01-01T00:00:00.000Z"),
        expiry: date("2030-12-31T23:59:59.000Z"),
        active: true,
      },
      create: {
        id,
        name,
        type,
        description,
        discount,
        start: date("2024-01-01T00:00:00.000Z"),
        expiry: date("2030-12-31T23:59:59.000Z"),
        active: true,
      },
    });
  }

  // Products --------------------------------------------------------------
  const products = {};
  for (let index = 0; index < productSeeds.length; index += 1) {
    const [id, name, description, categoryId, subCategoryId, subSubCategoryId, original, discounted, color, material, season, tags, gstId] = productSeeds[index];
    const product = await prisma.product.upsert({
      where: { id },
      update: {
        name,
        description,
        categoryId,
        subCategoryId,
        subSubCategoryId,
        tags: json(tags),
        pricesOriginal: original,
        pricesDiscounted: discounted,
        pricesCalculatedPrice: discounted,
        imageGallery: json(pickMany(productImages, index * 3, 3)),
        stockQuantity: 20 + index * 3,
        hsnCode: "7113",
        size: String(6 + (index % 6)),
        shippingCharge: 60,
        material,
        color,
        season,
        gstId,
        sku: `PS-${String(index + 1).padStart(4, "0")}`,
        calculationOnWeight: false,
        weight: 10 + index,
        laborCost: 250,
        discountOnLaborCost: 0,
        isActive: true,
        isProductPopular: index < 8,
        isProductNew: index >= 7,
        filters: json([color, material, season]),
        isVariant: false,
        mainProductId: id,
        productColor: color,
        productSize: String(6 + (index % 6)),
        otherVariations: json([]),
      },
      create: {
        id,
        name,
        description,
        categoryId,
        subCategoryId,
        subSubCategoryId,
        tags: json(tags),
        pricesOriginal: original,
        pricesDiscounted: discounted,
        pricesCalculatedPrice: discounted,
        imageGallery: json(pickMany(productImages, index * 3, 3)),
        stockQuantity: 20 + index * 3,
        hsnCode: "7113",
        size: String(6 + (index % 6)),
        shippingCharge: 60,
        material,
        color,
        season,
        gstId,
        sku: `PS-${String(index + 1).padStart(4, "0")}`,
        calculationOnWeight: false,
        weight: 10 + index,
        laborCost: 250,
        discountOnLaborCost: 0,
        isActive: true,
        isProductPopular: index < 8,
        isProductNew: index >= 7,
        filters: json([color, material, season]),
        isVariant: false,
        mainProductId: id,
        productColor: color,
        productSize: String(6 + (index % 6)),
        otherVariations: json([]),
      },
    });
    products[id] = product;
  }

  // Stock -----------------------------------------------------------------
  for (let index = 0; index < productSeeds.length; index += 1) {
    const [id, name, , , , , original] = productSeeds[index];
    await prisma.stock.upsert({
      where: { id: `seed-stock-${index + 1}` },
      update: {
        productId: id,
        name,
        color: products[id].productColor,
        size: products[id].productSize,
        quantity: 20 + index * 3,
        currentPricePerUnit: original,
        date: new Date(Date.UTC(2024, 0, 1 + index)),
      },
      create: {
        id: `seed-stock-${index + 1}`,
        productId: id,
        name,
        color: products[id].productColor,
        size: products[id].productSize,
        quantity: 20 + index * 3,
        currentPricePerUnit: original,
        date: new Date(Date.UTC(2024, 0, 1 + index)),
      },
    });
  }

  // Banners ---------------------------------------------------------------
  const bannerSeeds = [
    ["seed-banner-1", "Festive Collection", "Celebrate every moment with handcrafted festive pieces."],
    ["seed-banner-2", "New Arrivals", "Discover the latest additions to our curated collection."],
    ["seed-banner-3", "Silver Vessels", "Timeless silver craft for pooja and gifting."],
  ];
  for (let index = 0; index < bannerSeeds.length; index += 1) {
    const [id, bannerTitle, description] = bannerSeeds[index];
    await prisma.banner.upsert({
      where: { id },
      update: {
        bannerTitle,
        description,
        bannerType: "home",
        bannerText: bannerTitle,
        image: pick(bannerImages, index),
        isDeleted: false,
        isActive: true,
      },
      create: {
        id,
        bannerTitle,
        description,
        bannerType: "home",
        bannerText: bannerTitle,
        image: pick(bannerImages, index),
        isDeleted: false,
        isActive: true,
      },
    });
  }

  // Blog categories and blogs ---------------------------------------------
  const blogCategories = [
    ["seed-blogcat-1", "Festivals"],
    ["seed-blogcat-2", "Craftsmanship"],
  ];
  for (const [id, name] of blogCategories) {
    await prisma.blogCategory.upsert({
      where: { id },
      update: { name, active: true },
      create: { id, name, active: true },
    });
  }

  const blogSeeds = [
    ["seed-blog-1", "Celebrating Festivals with Handcrafted Art", "seed-blogcat-1", "Festivals are a time to come together..."],
    ["seed-blog-2", "The Story Behind Our Silver Craft", "seed-blogcat-2", "Every silver vessel carries the skill of artisans..."],
  ];
  for (let index = 0; index < blogSeeds.length; index += 1) {
    const [id, blogTitle, blogCategoryId, description] = blogSeeds[index];
    await prisma.blog.upsert({
      where: { id },
      update: {
        blogTitle,
        blogFeed: description,
        description,
        imagePath: pick(blogImages, index),
        blogCategoryId,
        date: new Date(Date.UTC(2024, 2, 1 + index)),
        blog: `<p>${description}</p><p>Explore the collection and bring home a piece of tradition.</p>`,
        deleted: false,
        active: true,
      },
      create: {
        id,
        blogTitle,
        blogFeed: description,
        description,
        imagePath: pick(blogImages, index),
        blogCategoryId,
        date: new Date(Date.UTC(2024, 2, 1 + index)),
        blog: `<p>${description}</p><p>Explore the collection and bring home a piece of tradition.</p>`,
        deleted: false,
        active: true,
      },
    });
  }

  // Content ---------------------------------------------------------------
  const contentSeeds = [
    ["6512993637dd0d0cd33483f9", "About Us", "<h2>About Pusti Shangar</h2><p>Pusti Shangar brings together traditional Indian craft, festive essentials and curated gifting.</p>"],
    ["6543bb2698a219d89dd67b68", "Privacy Policy", "<h2>Privacy Policy</h2><p>We respect your privacy and protect the information you share with us.</p>"],
    ["6543bb3b98a219d89dd67b6b", "Return Policy", "<h2>Return Policy</h2><p>Returns are accepted within the stated window for eligible products.</p>"],
    ["6543bb7598a219d89dd67b73", "Terms & Conditions", "<h2>Terms &amp; Conditions</h2><p>By using this website you agree to our terms of service.</p>"],
    ["6543bb8498a219d89dd67b76", "FAQs", "<h2>Frequently Asked Questions</h2><p>Find answers to common questions about orders, shipping and returns.</p>"],
    ["6543bbc598a219d89dd67b79", "Mid Footer", "<p>Handcrafted with care for every celebration.</p>"],
    ["6543bbdf98a219d89dd67b7c", "Hot Deals", "<p>Discover limited-time offers on selected festive collections.</p>"],
    ["652d0f1a441c0e7e4d9a4b29", "Disclaimer", "<p>Product colours may vary slightly due to photography and screen settings.</p>"],
    ["65479214f12a1b3bbc592e36", "Mid Banner", "<p>Curated festive essentials for your home.</p>"],
    ["65479232f12a1b3bbc592e39", "Mid Banner Two", "<p>Traditional craftsmanship, modern presentation.</p>"],
    ["65479250f12a1b3bbc592e3c", "Mid Banner Three", "<p>Gift something meaningful this season.</p>"],
  ];
  for (const [id, contentType, content] of contentSeeds) {
    await prisma.content.upsert({
      where: { id },
      update: { contentType, content, deleted: false, active: true },
      create: { id, contentType, content, deleted: false, active: true },
    });
  }

  // Gallery ---------------------------------------------------------------
  const galleryCategories = [
    ["seed-gallerycat-1", "Festive Decor", "A glimpse of our festive decor collection."],
    ["seed-gallerycat-2", "Craft Stories", "Behind the scenes with our artisans."],
  ];
  for (let index = 0; index < galleryCategories.length; index += 1) {
    const [id, gallaryCategoryTitle, description] = galleryCategories[index];
    await prisma.galleryCategory.upsert({
      where: { id },
      update: {
        gallaryCategoryTitle,
        description,
        imagePath: pick(galleryImages, index),
        deleted: false,
        active: true,
      },
      create: {
        id,
        gallaryCategoryTitle,
        description,
        imagePath: pick(galleryImages, index),
        deleted: false,
        active: true,
      },
    });
  }

  for (let index = 0; index < 6; index += 1) {
    const id = `seed-galleryitem-${index + 1}`;
    const galleryCategoryId = index < 3 ? "seed-gallerycat-1" : "seed-gallerycat-2";
    await prisma.galleryDetails.upsert({
      where: { id },
      update: {
        imageTitle: `Gallery Image ${index + 1}`,
        description: "A moment from our collection.",
        imagePath: pick(galleryImages, index + 3),
        galleryCategoryId,
        deleted: false,
        active: true,
      },
      create: {
        id,
        imageTitle: `Gallery Image ${index + 1}`,
        description: "A moment from our collection.",
        imagePath: pick(galleryImages, index + 3),
        galleryCategoryId,
        deleted: false,
        active: true,
      },
    });
  }

  // Contact / subscribe / invoice -----------------------------------------
  await prisma.contact.upsert({
    where: { email: "hello@pushtishangar.com" },
    update: {
      name: "Pusti Shangar",
      phone: "+919876543200",
      subject: "General enquiry",
      message: "Welcome to Pusti Shangar.",
    },
    create: {
      name: "Pusti Shangar",
      email: "hello@pushtishangar.com",
      phone: "+919876543200",
      subject: "General enquiry",
      message: "Welcome to Pusti Shangar.",
    },
  });

  await prisma.subscribe.upsert({
    where: { email: "newsletter@example.com" },
    update: {},
    create: { email: "newsletter@example.com" },
  });

  await prisma.latestInvoice.upsert({
    where: { id: "652f8866c509652ac19e0e8b" },
    update: { lattestInvoice: 1000 },
    create: { id: "652f8866c509652ac19e0e8b", lattestInvoice: 1000 },
  });

  // Cart / wishlist -------------------------------------------------------
  const customer1 = customers["seed-customer-1"];
  const customer2 = customers["seed-customer-2"];

  await prisma.cartItem.upsert({
    where: { customerId_productId: { customerId: customer1.id, productId: "seed-product-1" } },
    update: { quantity: 1, tax: 5 },
    create: { customerId: customer1.id, productId: "seed-product-1", quantity: 1, tax: 5 },
  });
  await prisma.cartItem.upsert({
    where: { customerId_productId: { customerId: customer2.id, productId: "seed-product-3" } },
    update: { quantity: 2, tax: 12 },
    create: { customerId: customer2.id, productId: "seed-product-3", quantity: 2, tax: 12 },
  });

  await prisma.wishlistItem.upsert({
    where: { customerId_productId: { customerId: customer1.id, productId: "seed-product-7" } },
    update: {},
    create: { customerId: customer1.id, productId: "seed-product-7" },
  });

  // Orders ----------------------------------------------------------------
  const orderSeeds = [
    {
      id: "seed-order-1",
      customerId: customer1.id,
      FirstName: "Aarohi",
      LastName: "Shah",
      status: "completed",
      totalAmount: 6999 + 10999,
      items: [
        { productId: "seed-product-1", quantity: 1 },
        { productId: "seed-product-3", quantity: 1 },
      ],
      createdAt: new Date(Date.UTC(2024, 3, 12, 10, 0, 0)),
      invoiceNumber: "1001",
    },
    {
      id: "seed-order-2",
      customerId: customer2.id,
      FirstName: "Vihaan",
      LastName: "Mehta",
      status: "pending",
      totalAmount: 7999 + 3999,
      items: [
        { productId: "seed-product-9", quantity: 1 },
        { productId: "seed-product-13", quantity: 1 },
      ],
      createdAt: new Date(Date.UTC(2024, 5, 2, 15, 30, 0)),
      invoiceNumber: "1002",
    },
    {
      id: "seed-order-3",
      customerId: customer1.id,
      FirstName: "Aarohi",
      LastName: "Shah",
      status: "processing",
      totalAmount: 5999,
      items: [{ productId: "seed-product-7", quantity: 1 }],
      createdAt: new Date(Date.UTC(2024, 6, 18, 11, 15, 0)),
      invoiceNumber: "1003",
    },
  ];

  for (const order of orderSeeds) {
    await prisma.order.deleteMany({ where: { id: order.id } });
    await prisma.order.create({
      data: {
        id: order.id,
        customerId: order.customerId,
        FirstName: order.FirstName,
        LastName: order.LastName,
        status: order.status,
        totalAmount: order.totalAmount,
        billingAddress: "12 MG Road, Vadodara, Gujarat",
        shippingAddress: "12 MG Road, Vadodara, Gujarat",
        country: "India",
        state: "Gujarat",
        city: "Vadodara",
        postCode: "390001",
        paymentMethod: order.status === "pending" ? "UPI" : "COD",
        isInvoiceGenrated: true,
        invoiceNumber: order.invoiceNumber,
        invoiceGenrationDate: order.createdAt,
        createdAt: order.createdAt,
        updatedAt: order.createdAt,
        items: { create: order.items },
      },
    });
  }

  console.log("Seed complete.");
  console.log("Admin login:    admin@pushtishangar.com / Admin@123");
  console.log("Manager login:  manager@pushtishangar.com / Manager@123");
  console.log("Customer login: aarohi@example.com / Customer@123");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
