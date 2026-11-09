const express = require("express");
const cookieParser = require("cookie-parser");
const { addSubCategory, getAllSubCategories, getSubCategoryById, updateSubCategoryById, deleteSubCategoryById } = require("../controllers/productSubCatController");

const router = express.Router();

router.use(cookieParser());

router.post("/addsubcategory" , addSubCategory);
router.post("/getsubcategories" , getAllSubCategories);
router.post("/getsubspecificcategory/:id" , getSubCategoryById);
router.post("/updatesubcategory/:id" , updateSubCategoryById);
router.post("/deletesubcategory/:id" ,  deleteSubCategoryById);


module.exports = router;