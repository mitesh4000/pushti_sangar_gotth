const express = require("express");
const cookieParser = require("cookie-parser");
const {
  createOrder,
  getOrders,
  updateOrder,
  getOrderById,
  deleteOrder,
  getHighValueCustomers,
  getMedValueCustomers,
  getTopSellingProducts,
  getStockReportByProduct,
} = require("../controllers/OrderController");

const router = express.Router();

router.use(cookieParser());

router.post("/addorder", createOrder);
router.post("/getallorders", getOrders);
router.post("/getspecificorder/:id", getOrderById);
router.post("/updateorder/:id", updateOrder);
router.post("/deleteorder/:id", deleteOrder);
router.post("/gethighcustomerdata", getHighValueCustomers);
router.post("/getmedcustomerdata", getMedValueCustomers);
router.post("/gettopsellproducts", getTopSellingProducts);
// router.post("/getstockbyproduct", getStockReportByProduct);



module.exports = router;
