const express = require("express");
const cookieParser = require("cookie-parser");
const { addSubscribe, getSubscribes, deleteSubscribe } = require("../controllers/SubscribeController");


const router = express.Router();

router.use(cookieParser());

router.post("/addsubscribe" , addSubscribe);
router.post("/getsubscribe" , getSubscribes);
router.post("/deletesubscribe/:id" , deleteSubscribe);
// router.post("/updatesubcategory/:id" , updateSubCategoryById);
// router.post("/deletesubcategory/:id" ,  deleteSubCategoryById);


module.exports = router;