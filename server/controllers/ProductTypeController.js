const prisma = require("../lib/prisma");
const { base, toNumber } = require("../utils/serialize");

const AddPriceUpdate = async (req, res) => {
  try {
    const price = await prisma.priceUpdate.create({
      data: {
        productType: req.body.productType,
        price: toNumber(req.body.price),
      },
    });
    return res.send({
      success: true,
      msg: "PriceUpdate Added Succesfully",
      Price: base(price),
    });
  } catch (err) {
    return res.send({ error: err.message });
  }
};

const updatePrice = async (req, res) => {
  try {
    const existing = await prisma.priceUpdate.findUnique({ where: { id: req.params.id } });
    if (!existing) {
      return res.send({ error: "Id not found" });
    }

    const updatedRecord = await prisma.priceUpdate.update({
      where: { id: req.params.id },
      data: { price: toNumber(req.body.price) },
    });

    return res.send({
      success: true,
      msg: "price updated successfully",
      updatedRecord: base(updatedRecord),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

const getSpecificPriceById = async (req, res) => {
  try {
    const price = await prisma.priceUpdate.findUnique({ where: { id: req.params.id } });
    if (!price) {
      return res.send({ error: "Price not found for the given ID" });
    }
    return res.send({
      success: true,
      msg: "Price retrieved successfully",
      price: base(price),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

const getAllPriceUpdates = async (req, res) => {
  try {
    const allPrices = await prisma.priceUpdate.findMany();
    return res.send({
      success: true,
      msg: "All PriceUpdates retrieved successfully",
      prices: allPrices.map(base),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

module.exports = {
  AddPriceUpdate,
  updatePrice,
  getSpecificPriceById,
  getAllPriceUpdates,
};
