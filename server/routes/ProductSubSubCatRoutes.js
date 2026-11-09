const express = require("express");
const cookieParser = require("cookie-parser");
const { addSubSubCategory, getAllSubSubCategories, getSubSubCategoryById, updateSubSubCategoryById, deleteSubSubCategoryById } = require("../controllers/ProductSubSubCatController");

const router = express.Router();

router.use(cookieParser());

router.post("/addsubsubcategory" , addSubSubCategory);
router.post("/getsubsubcategories" , getAllSubSubCategories);
router.post("/getsubsubspecificcategory/:id" , getSubSubCategoryById);
router.post("/updatesubsubcategory/:id" , updateSubSubCategoryById);
router.post("/deletesubsubcategory/:id" ,  deleteSubSubCategoryById);

module.exports = router;