const prisma = require("../lib/prisma");
const {
  serializeOrder,
  serializeProduct,
  serializeCustomer,
  toNumber,
  idOf,
} = require("../utils/serialize");

const INVOICE_ID = "652f8866c509652ac19e0e8b";

const normalizeItems = (products) =>
  (Array.isArray(products) ? products : []).map((item) => ({
    productId: idOf(item.product) || idOf(item.productId),
    quantity: parseInt(item.quantity, 10) || 0,
  }));

exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });
    return res.send({ orders: orders.map(serializeOrder) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const {
    customer,
    FirstName,
    LastName,
    products,
    status,
    totalAmount,
    country,
    state,
    city,
    postCode,
    shippingAddress,
    billingAddress,
    paymentMethod,
    couponCode,
  } = req.body;

  try {
    const items = normalizeItems(products);

    for (const item of items) {
      if (!item.productId || !item.quantity) continue;
      const eligibleStock = await prisma.stock.findMany({
        where: { productId: item.productId, quantity: { gt: 0 } },
        orderBy: { date: "asc" },
        take: 1,
      });
      if (eligibleStock.length) {
        await prisma.stock.update({
          where: { id: eligibleStock[0].id },
          data: { quantity: eligibleStock[0].quantity - item.quantity },
        });
      }
    }

    let invoice = await prisma.latestInvoice.findUnique({ where: { id: INVOICE_ID } });
    if (!invoice) {
      invoice = await prisma.latestInvoice.create({
        data: { id: INVOICE_ID, lattestInvoice: 1 },
      });
    } else {
      invoice = await prisma.latestInvoice.update({
        where: { id: INVOICE_ID },
        data: { lattestInvoice: invoice.lattestInvoice + 1, updatedAt: new Date() },
      });
    }

    const couponId = idOf(couponCode);
    const coupon = couponId ? await prisma.coupon.findUnique({ where: { id: couponId } }) : null;

    const newOrder = await prisma.order.create({
      data: {
        customerId: idOf(customer),
        FirstName,
        LastName,
        status: status || "pending",
        totalAmount: toNumber(totalAmount),
        country,
        state,
        city,
        postCode,
        shippingAddress,
        billingAddress,
        paymentMethod: paymentMethod || "COD",
        couponId: coupon ? coupon.id : null,
        isInvoiceGenrated: true,
        invoiceNumber: String(invoice.lattestInvoice),
        invoiceGenrationDate: new Date(),
        items: {
          create: items
            .filter((item) => item.productId)
            .map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
        },
      },
      include: { items: true },
    });

    return res.send({
      success: true,
      message: "Order created successfully",
      order: serializeOrder(newOrder),
    });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: { include: { product: { include: { gst: true } } } } },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const products = order.items.map((item) => {
      const product = item.product ? serializeProduct(item.product) : null;
      return {
        product: product
          ? { ...product, gst: item.product.gst ? item.product.gst.gst : null }
          : null,
        quantity: item.quantity,
      };
    });

    return res.send({
      success: true,
      orderWithProductDetails: {
        order: serializeOrder(order),
        products,
      },
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const existing = await prisma.order.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.send({ error: "Order not found" });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: { status: req.body.status, updatedAt: new Date() },
      include: { items: true },
    });

    return res.send({
      success: true,
      message: "Order updated successfully",
      order: serializeOrder(updatedOrder),
    });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await prisma.order.delete({ where: { id: req.params.id } });
    return res.send({ success: true, message: "Order deleted successfully" });
  } catch (_error) {
    return res.send({ error: "Order not found" });
  }
};

const groupedCustomerTotals = async () => {
  const groups = await prisma.order.groupBy({
    by: ["customerId"],
    where: { customerId: { not: null } },
    _sum: { totalAmount: true },
  });
  return groups.map((group) => ({
    customerId: group.customerId,
    totalShoppingAmount: group._sum.totalAmount || 0,
  }));
};

const customersForTotals = async (rows) => {
  const results = [];
  for (const row of rows) {
    const customer = await prisma.customer.findUnique({ where: { id: row.customerId } });
    if (customer) {
      results.push({
        _id: row.customerId,
        totalShoppingAmount: row.totalShoppingAmount,
        customerData: serializeCustomer(customer),
      });
    }
  }
  return results;
};

exports.getHighValueCustomers = async (req, res) => {
  try {
    const rows = (await groupedCustomerTotals()).filter(
      (row) => row.totalShoppingAmount > 50000
    );
    return res.send({
      success: true,
      highValueCustomers: await customersForTotals(rows),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.getMedValueCustomers = async (req, res) => {
  try {
    const rows = (await groupedCustomerTotals()).filter(
      (row) => row.totalShoppingAmount >= 15000 && row.totalShoppingAmount <= 40000
    );
    return res.send({
      success: true,
      highValueCustomers: await customersForTotals(rows),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.getTopSellingProducts = async (req, res) => {
  try {
    const groups = await prisma.orderItem.groupBy({
      by: ["productId"],
      where: { productId: { not: null } },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
    });

    const topSellingProducts = [];
    for (const group of groups) {
      const product = await prisma.product.findUnique({
        where: { id: group.productId },
        include: { category: true, gst: true, weightType: true },
      });
      if (product) {
        topSellingProducts.push({
          product: serializeProduct(product),
          totalQuantityOrdered: group._sum.quantity || 0,
        });
      }
    }

    return res.send({ success: true, topSellingProducts });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};
