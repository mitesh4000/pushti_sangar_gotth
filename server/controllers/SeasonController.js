const prisma = require("../lib/prisma");
const { base } = require("../utils/serialize");

exports.getSeasons = async (req, res) => {
  try {
    const seasons = await prisma.season.findMany({ orderBy: { createdAt: "asc" } });
    if (seasons.length === 0) {
      return res.end();
    }
    return res.send({ success: true, season: seasons.map(base) });
  } catch (error) {
    return res.send({ error: error.message });
  }
};

exports.addSeason = async (req, res) => {
  try {
    const newRecord = await prisma.season.create({ data: { name: req.body.name } });
    return res.send({
      success: true,
      data: base(newRecord),
      msg: "Material added",
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
};
