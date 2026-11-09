const prisma = require("../lib/prisma");
const { base, toBool, toNumber } = require("../utils/serialize");

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const createCoupon = async (req, res) => {
  try {
    const { name, type, description, start, expiry, discount, active } = req.body;
    const coupon = await prisma.coupon.create({
      data: {
        name,
        type: type || "%",
        description,
        start: parseDate(start),
        expiry: parseDate(expiry),
        discount: toNumber(discount),
        active: active === undefined ? true : toBool(active),
      },
    });

    return res.send({
      success: true,
      message: "Coupon created successfully",
      coupon: base(coupon),
    });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
    return res.send({ success: true, coupons: coupons.map(base) });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

const getCouponById = async (req, res) => {
  try {
    const coupon = await prisma.coupon.findUnique({ where: { id: req.params.id } });
    if (!coupon) {
      return res.send({ success: false, message: "Coupon not found" });
    }
    return res.send({ success: true, coupon: base(coupon) });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

const updateCouponById = async (req, res) => {
  try {
    const existing = await prisma.coupon.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.send({ success: false, message: "Coupon not found" });
    }

    const { name, type, description, expiry, start, discount, active } = req.body;
    const coupon = await prisma.coupon.update({
      where: { id: req.params.id },
      data: {
        name,
        type,
        description,
        start: parseDate(start),
        expiry: parseDate(expiry),
        discount: toNumber(discount),
        active: active === undefined ? existing.active : toBool(active),
      },
    });

    return res.send({
      success: true,
      message: "Coupon updated successfully",
      coupon: base(coupon),
    });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
};

const deleteCouponById = async (req, res) => {
  try {
    await prisma.coupon.delete({ where: { id: req.params.id } });
    return res.send({ success: true, message: "Coupon deleted successfully" });
  } catch (_error) {
    return res.send({ success: false, message: "Coupon not found" });
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCouponById,
  deleteCouponById,
};
