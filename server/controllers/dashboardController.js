const prisma = require("../lib/prisma");
const moment = require("moment");

// These are the legacy MongoDB category IDs the dashboard has always used.
const CATEGORY_IDS = {
  ShringarProducts: "650837d4f32a06ef841fa5d6",
  SilverVesselsProducts: "650837faf32a06ef841fa5d8",
  SugandhiProducts: "65083812f32a06ef841fa5da",
  PichwaiAndWallArtProducts: "6508382bf32a06ef841fa5dc",
  Vastra: "65083839f32a06ef841fa5de",
  FibreItems: "65083849f32a06ef841fa5e0",
  SeasonalProducts: "6508385bf32a06ef841fa5e2",
};

exports.getDashboardData = async (req, res) => {
  try {
    const [
      totalProducts,
      ShringarProducts,
      SilverVesselsProducts,
      SugandhiProducts,
      PichwaiAndWallArtProducts,
      Vastra,
      FibreItems,
      SeasonalProducts,
      customers,
      totalOrders,
      pendingOrders,
      processingOrders,
      completedOrders,
      cancelledOrders,
      returnOrders,
      totalEarningsAggregate,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { categoryId: CATEGORY_IDS.ShringarProducts } }),
      prisma.product.count({ where: { categoryId: CATEGORY_IDS.SilverVesselsProducts } }),
      prisma.product.count({ where: { categoryId: CATEGORY_IDS.SugandhiProducts } }),
      prisma.product.count({ where: { categoryId: CATEGORY_IDS.PichwaiAndWallArtProducts } }),
      prisma.product.count({ where: { categoryId: CATEGORY_IDS.Vastra } }),
      prisma.product.count({ where: { categoryId: CATEGORY_IDS.FibreItems } }),
      prisma.product.count({ where: { categoryId: CATEGORY_IDS.SeasonalProducts } }),
      prisma.customer.count({ where: { deleted: false } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: "pending" } }),
      prisma.order.count({ where: { status: "processing" } }),
      prisma.order.count({ where: { status: "completed" } }),
      prisma.order.count({ where: { status: "cancelled" } }),
      prisma.order.count({ where: { status: "return" } }),
      prisma.order.aggregate({ _sum: { totalAmount: true } }),
    ]);

    const currentDate = moment();
    const weeklyEarnings = await calculateEarningsForInterval(currentDate, 7, "days");
    const monthlyEarnings = await calculateEarningsForInterval(currentDate, 1, "months");
    const yearlyEarnings = await calculateEarningsForInterval(currentDate, 1, "years");

    return res.send({
      orders: {
        totalOrders,
        pendingOrders,
        processingOrders,
        completedOrders,
        cancelledOrders,
        returnOrders,
      },
      products: {
        totalProducts,
        ShringarProducts,
        SilverVesselsProducts,
        SugandhiProducts,
        PichwaiAndWallArtProducts,
        Vastra,
        FibreItems,
        SeasonalProducts,
      },
      customers,
      totalEarnings: totalEarningsAggregate._sum.totalAmount || 0,
      weeklyEarnings,
      monthlyEarnings,
      yearlyEarnings,
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

async function calculateEarningsForInterval(date, value, unit) {
  const startDate = date.clone().subtract(value, unit);
  const endDate = date.clone();
  const aggregate = await prisma.order.aggregate({
    where: { createdAt: { gte: startDate.toDate(), lt: endDate.toDate() } },
    _sum: { totalAmount: true },
  });
  return aggregate._sum.totalAmount || 0;
}
