const express = require("express");
const router = express.Router();
router.use(express.json());
const cookieParser = require("cookie-parser");
const { AddPriceUpdate, updatePrice, getAllPriceUpdates, getSpecificPriceById } = require("../controllers/ProductTypeController");


router.use(cookieParser());

router.post("/getprices", getAllPriceUpdates);
router.post("/createprice", AddPriceUpdate);
router.post("/getprice/:id", getSpecificPriceById);
router.post("/updateprice/:id", updatePrice);
// router.post("/deletecontent/:id", deleteContent);

module.exports = router;