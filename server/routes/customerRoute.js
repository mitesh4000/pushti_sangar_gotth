const express = require("express");
const cookieParser = require("cookie-parser");
const { registerCustomer, loginCustomer, getCustomers, getLoggedInCustomer, logoutCustomer, getSpecificCustomer, loginStatus, updateCustomerPassword, forgotCustomerPassword, resetCustomerPassword, updateCustomer, DeleteCustomer, addToCart, removeFromCart, getLoggedInCustomerCartItems, removeAllFromCart, updateCartItem, addToWishlist, getLoggedInCustomerWishlistItems, removeFromWishlist, getTotalActiveUsers, getOrderHistorybyCustomerId, getCustomerReportByDateRange } = require("../controllers/customerController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(cookieParser());

router.post("/register" , registerCustomer);
router.post("/login" , loginCustomer);
router.post("/logout" , logoutCustomer);
router.post("/getcustomers" , getCustomers);
router.post("/getloggedincustomer" , protect ,getLoggedInCustomer);
router.post("/getspecificcustomer/:id" , getSpecificCustomer);
router.post("/getloginstatus" , loginStatus);
router.post("/updatecustomer/:id" , updateCustomer);
router.post("/updatecustomerpassword/:id" ,updateCustomerPassword);
router.post("/forgetpassword" ,forgotCustomerPassword);
router.post("/resetpassword/:resetToken" , resetCustomerPassword);
router.post("/deletecustomer" , DeleteCustomer);
router.post("/addtocart/:id" , addToCart);
router.post("/getcustomercart/:id" , getLoggedInCustomerCartItems);
router.post("/removefromcart/:id" , removeFromCart);
router.post("/removeallfromcart/:id" , removeAllFromCart);
router.post("/updatecart/:id" , updateCartItem);
router.post("/createwishlist/:id" , addToWishlist);
router.post("/getcustomerwishlist/:id" , getLoggedInCustomerWishlistItems);
router.post("/removefromwishlist/:id" , removeFromWishlist);
router.post("/getorderhistory/:id" , getOrderHistorybyCustomerId);
router.post("/getcustomerreport" , getCustomerReportByDateRange);


module.exports = router;