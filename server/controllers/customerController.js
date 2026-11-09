const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const prisma = require("../lib/prisma");
const sendEmail = require("../utils/sendEmail");
const {
  serializeCustomer,
  serializeProduct,
  serializeOrder,
  serializeStock,
  toBool,
  toNumber,
  idOf,
} = require("../utils/serialize");

const JWT_SECRET = process.env.JWT_SECRET || "everything";
const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });

const customerListInclude = {
  cartItems: true,
  wishlist: true,
};

const customerCartInclude = {
  cartItems: { include: { product: true } },
  wishlist: { include: { product: true } },
};

// Customer's Registration & Create Customer
const registerCustomer = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, phone, active } = req.body;

    if (password !== confirmPassword) {
      return res.send({ success: false, msg: "Passwords do not match" });
    }

    const customer = await prisma.customer.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
        phone,
        active: active === undefined ? true : toBool(active),
      },
      include: customerListInclude,
    });

    return res.send({
      success: true,
      msg: "Customer added successfully",
      customer: serializeCustomer(customer),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Customer's Login
const loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({ success: false, msg: "Please fill all required fields" });
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { email },
      include: customerListInclude,
    });

    if (!customer) {
      return res.send({ success: false, msg: "Invalid Credentials" });
    }

    const passwordIsCorrect = await bcrypt.compare(password, customer.password);
    if (!passwordIsCorrect) {
      return res.send({ success: false, msg: "Invalid user data" });
    }

    const token = generateToken(customer.id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });

    return res.send({
      success: true,
      msg: "Successfully LoggedIn",
      token,
      customer: serializeCustomer(customer),
    });
  } catch (_error) {
    return res.send({ success: false, msg: "Server error" });
  }
};

// Customer's Logout
const logoutCustomer = async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.send({ message: "Successfully logged out" });
};

// Get All Customers
const getCustomers = async (req, res) => {
  const customers = await prisma.customer.findMany({
    where: { deleted: false },
    include: customerListInclude,
    orderBy: { createdAt: "desc" },
  });
  return res.send({ customers: customers.map((customer) => serializeCustomer(customer)) });
};

// Get LoggedIn Customer
const getLoggedInCustomer = async (req, res) => {
  const customer = await prisma.customer.findUnique({
    where: { id: req.body.id },
    include: customerCartInclude,
  });

  if (customer) {
    return res.send({ success: true, customer: serializeCustomer(customer) });
  }
  return res.send({ success: false, msg: "User not found" });
};

// Get Specific Customer By Id
const getSpecificCustomer = async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: req.params.id },
      include: customerCartInclude,
    });
    if (customer) {
      return res.send({ success: true, customer: serializeCustomer(customer) });
    }
    return res.send({ success: false, msg: "User not found" });
  } catch (_error) {
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};

// Get LoggedIn Status
const loginStatus = async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.send({ success: false });
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    return res.send({ success: Boolean(verified) });
  } catch (_error) {
    return res.send({ success: false });
  }
};

// Update Customer
const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const body = req.body.customerInfo || req.body;
    const username = body.username;

    const existing = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!existing) {
      return res.send({ success: false, message: "Customer not found" });
    }

    const updateData = {};
    if (username !== undefined) updateData.username = username;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.address !== undefined) {
      updateData.address = Array.isArray(body.address) ? JSON.stringify(body.address) : body.address;
    }

    const updateDataRecord = await prisma.customer.update({
      where: { id: customerId },
      data: updateData,
      include: customerCartInclude,
    });

    return res.send({
      success: true,
      message: "Customer updated successfully",
      customer: serializeCustomer(updateDataRecord),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Update Password
const updateCustomerPassword = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    const { oldPassword, newPassword } = req.body;

    if (!customer) {
      return res.send({ success: false, msg: "User not found , Please signup" });
    }
    if (!oldPassword || !newPassword) {
      return res.send({ success: false, msg: "Please add old and new password" });
    }

    const passwordMatches = await bcrypt.compare(oldPassword, customer.password);
    if (!passwordMatches) {
      return res.send({ success: false, msg: "Old password is incorrect" });
    }
    if (oldPassword === newPassword) {
      return res.send({ success: false, msg: "New Password cannot be same as Old password" });
    }

    await prisma.customer.update({
      where: { id: customerId },
      data: { password: await bcrypt.hash(newPassword, 10) },
    });
    return res.send({ success: true, msg: "Password changed successfully" });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

// Forget Password
const forgotCustomerPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const customer = await prisma.customer.findUnique({ where: { email } });

    if (!customer) {
      return res.send({ success: false, msg: "Customer not found" });
    }

    await prisma.token.deleteMany({ where: { customerId: customer.id } });

    const resetToken = crypto.randomBytes(32).toString("hex") + customer.id;
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    await prisma.token.create({
      data: {
        customerId: customer.id,
        token: hashedToken,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 60 * 1000),
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/resetpassword/${resetToken}`;
    const message = `
    <h2>Hello ${customer.username}</h2>
    <p>Please use this URL below to reset your password</p>
    <p>This reset link is valid for 30 Minutes</p>
    <a href=${resetUrl} clicktraking = off> ${resetUrl}</a>
    <p>Regards .... </p>
    `;

    await sendEmail(
      "Password reset request",
      message,
      customer.email,
      process.env.EMAIL_USER
    );
    return res.send({ success: true, msg: "Reset Email Sent" });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

// Reset Customer's Password
const resetCustomerPassword = async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  const customerToken = await prisma.token.findFirst({
    where: { token: hashedToken, expiresAt: { gt: new Date() } },
  });

  if (!customerToken || !customerToken.customerId) {
    return res.send("Invalid or Expired Token");
  }

  try {
    await prisma.customer.update({
      where: { id: customerToken.customerId },
      data: { password: await bcrypt.hash(password, 10) },
    });
    return res.send({
      success: true,
      msg: "Password Reset Successful, Please Login",
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

// Delete Specific Customer
const DeleteCustomer = async (req, res) => {
  try {
    await prisma.customer.delete({ where: { id: req.body.id } });
    return res.send({ success: true, message: "Successfully Deleted" });
  } catch (_error) {
    return res.send({ success: true, message: "record not found" });
  }
};

// Add to Cart
const addToCart = async (req, res) => {
  const customerId = req.params.id;
  const { productId, quantity } = req.body;

  try {
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) {
      return res.status(404).json({ success: false, msg: "Customer not found" });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    const existing = await prisma.cartItem.findUnique({
      where: { customerId_productId: { customerId, productId } },
    });

    const requested = parseInt(quantity, 10) || 1;

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + requested },
      });
    } else {
      const gst = product.gstId
        ? await prisma.gst.findUnique({ where: { id: product.gstId } })
        : null;
      await prisma.cartItem.create({
        data: {
          customerId,
          productId,
          quantity: requested,
          tax: gst ? gst.gst : null,
        },
      });
    }

    const updated = await prisma.customer.findUnique({
      where: { id: customerId },
      include: customerCartInclude,
    });

    return res.send({
      success: true,
      msg: "Cart updated successfully",
      updatedCart: serializeCustomer(updated),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

// Get LoggedIn Customer's Cart Items
const getLoggedInCustomerCartItems = async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { cartItems: { include: { product: true } } },
    });

    if (!customer) {
      return res.status(404).json({ success: false, msg: "Customer not found" });
    }

    const cartItems = await Promise.all(
      customer.cartItems.map(async (item) => {
        const stock = item.productId
          ? await prisma.stock.findFirst({ where: { productId: item.productId } })
          : null;
        return {
          product: item.product ? serializeProduct(item.product) : item.productId,
          quantity: item.quantity,
          tax: item.tax,
          stock: stock ? serializeStock(stock) : null,
        };
      })
    );

    return res.send({ success: true, cartItems });
  } catch (error) {
    console.error(error);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};

// Remove a product from the customer's cart
const removeFromCart = async (req, res) => {
  const customerId = req.params.id;
  const { productId } = req.body;

  try {
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) {
      return res.status(404).json({ success: false, msg: "Customer not found" });
    }

    await prisma.cartItem.deleteMany({ where: { customerId, productId } });
    const updated = await prisma.customer.findUnique({
      where: { id: customerId },
      include: customerCartInclude,
    });

    return res.send({
      success: true,
      msg: "Product removed from the cart successfully",
      updatedCart: serializeCustomer(updated),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

// Remove All Items From Cart
const removeAllFromCart = async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) {
      return res.send({ success: false, msg: "Customer not found" });
    }

    await prisma.cartItem.deleteMany({ where: { customerId } });
    const updated = await prisma.customer.findUnique({
      where: { id: customerId },
      include: customerCartInclude,
    });

    return res.send({
      success: true,
      msg: "All products removed from the cart successfully",
      updatedCart: serializeCustomer(updated),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

// Update Cart Items
const updateCartItem = async (req, res) => {
  const customerId = req.params.id;
  const { cartItems } = req.body;

  try {
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) {
      return res.status(404).json({ success: false, msg: "Customer not found" });
    }

    if (Array.isArray(cartItems)) {
      await prisma.cartItem.deleteMany({ where: { customerId } });
      for (const item of cartItems) {
        const productId = idOf(item.product) || item.productId;
        if (!productId) continue;
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) continue;
        const gst = product.gstId
          ? await prisma.gst.findUnique({ where: { id: product.gstId } })
          : null;
        await prisma.cartItem.upsert({
          where: { customerId_productId: { customerId, productId } },
          create: {
            customerId,
            productId,
            quantity: parseInt(item.quantity, 10) || 1,
            tax: item.tax !== undefined ? toNumber(item.tax) : gst ? gst.gst : null,
          },
          update: {
            quantity: parseInt(item.quantity, 10) || 1,
            tax: item.tax !== undefined ? toNumber(item.tax) : gst ? gst.gst : null,
          },
        });
      }
    }

    const updated = await prisma.customer.findUnique({
      where: { id: customerId },
      include: customerCartInclude,
    });

    return res.send({
      success: true,
      msg: "Quantity updated in the cart successfully",
      updatedCart: serializeCustomer(updated),
    });
  } catch (error) {
    console.error(error);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};

// Add product to wishlist
const addToWishlist = async (req, res) => {
  const customerId = req.params.id;
  const { productId } = req.body;

  try {
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) {
      return res.status(404).json({ success: false, msg: "Customer not found" });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    const existing = await prisma.wishlistItem.findUnique({
      where: { customerId_productId: { customerId, productId } },
    });
    if (existing) {
      return res.send({ success: false, msg: "Product is already in the wishlist" });
    }

    await prisma.wishlistItem.create({ data: { customerId, productId } });
    const updated = await prisma.customer.findUnique({
      where: { id: customerId },
      include: customerCartInclude,
    });

    return res.send({
      success: true,
      msg: "Product added to wishlist successfully",
      updatedCustomer: serializeCustomer(updated),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

// Get LoggedIn customer Wishlist Items
const getLoggedInCustomerWishlistItems = async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
      include: { wishlist: { include: { product: true } } },
    });

    if (!customer) {
      return res.status(404).json({ success: false, msg: "Customer not found" });
    }

    const wishlistItems = customer.wishlist.map((item) => ({
      product: item.product ? serializeProduct(item.product) : item.productId,
    }));

    return res.send({ success: true, wishlistItems });
  } catch (error) {
    console.error(error);
    return res.send({ success: false, msg: "Internal Server Error" });
  }
};

// Remove a product from the customer's wishlist
const removeFromWishlist = async (req, res) => {
  const customerId = req.params.id;
  const { productId } = req.body;

  try {
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) {
      return res.status(404).json({ success: false, msg: "Customer not found" });
    }

    await prisma.wishlistItem.deleteMany({ where: { customerId, productId } });
    const updated = await prisma.customer.findUnique({
      where: { id: customerId },
      include: customerCartInclude,
    });

    return res.send({
      success: true,
      msg: "Product removed from the cart successfully",
      updatedCart: serializeCustomer(updated),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

// Get orderHistory of customer by Customer's Id
const getOrderHistorybyCustomerId = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await prisma.customer.findUnique({ where: { id: customerId } });
    if (!customer) {
      return res.send({ message: "Customer not found" });
    }

    const orders = await prisma.order.findMany({
      where: { customerId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return res.send({ success: true, orderHistory: orders.map(serializeOrder) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCustomerReportByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

    if (!datePattern.test(startDate || "") || !datePattern.test(endDate || "")) {
      return res.status(400).json({
        success: false,
        msg: "Please provide valid date range in the 'DD/MM/YYYY' format.",
      });
    }

    const [, startDay, startMonth, startYear] = startDate.match(datePattern);
    const [, endDay, endMonth, endYear] = endDate.match(datePattern);

    const start = new Date(Date.UTC(Number(startYear), Number(startMonth) - 1, Number(startDay)));
    const end = new Date(
      Date.UTC(Number(endYear), Number(endMonth) - 1, Number(endDay), 23, 59, 59, 999)
    );

    const customers = await prisma.customer.findMany({
      where: { createdAt: { gte: start, lte: end } },
      include: customerListInclude,
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({
      success: true,
      msg: "Customer report generated successfully",
      customers: customers.map(serializeCustomer),
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  registerCustomer,
  loginCustomer,
  logoutCustomer,
  getCustomers,
  getLoggedInCustomer,
  getSpecificCustomer,
  loginStatus,
  updateCustomerPassword,
  forgotCustomerPassword,
  resetCustomerPassword,
  updateCustomer,
  DeleteCustomer,
  addToCart,
  removeFromCart,
  getLoggedInCustomerCartItems,
  removeAllFromCart,
  updateCartItem,
  addToWishlist,
  getLoggedInCustomerWishlistItems,
  removeFromWishlist,
  getOrderHistorybyCustomerId,
  getCustomerReportByDateRange,
};
