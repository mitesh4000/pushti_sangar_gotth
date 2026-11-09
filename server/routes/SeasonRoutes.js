const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { getSeasons, addSeason } = require("../controllers/SeasonController");

router.use(cookieParser());

router.post("/getseasons", getSeasons);
router.post("/createseason", addSeason);


module.exports = router;