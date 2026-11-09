const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { getSizes, addSize, getSizeById, updateSize, deleteSize } = require("../controllers/SizeController");
// const { getSizes, addSize, getSizeById, updateSize, deleteSize } = require("../controllers/SizeController");

router.use(cookieParser());

router.post("/getsizes", getSizes);
router.post("/addsize", addSize);
router.post("/getspecificsize/:id", getSizeById);
router.post("/updatesize/:id", updateSize);
router.post("/deletesize/:id", deleteSize);

module.exports = router;
