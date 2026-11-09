const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { getMaterials, addMaterial } = require("../controllers/MaterialController");

router.use(cookieParser());

router.post("/getmaterial", getMaterials);
router.post("/creatematerial", addMaterial);


module.exports = router;