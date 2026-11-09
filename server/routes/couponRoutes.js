const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { createCoupon, getAllCoupons, getCouponById, updateCouponById, deleteCouponById } = require("../controllers/couponController");

router.use(cookieParser());


router.post("/createcoupon", createCoupon);
router.post("/getcoupons", getAllCoupons);
router.post("/getspecificcoupon/:id", getCouponById);
router.post("/updatecoupon/:id", updateCouponById);
router.post("/deletecoupon/:id", deleteCouponById);



module.exports = router;