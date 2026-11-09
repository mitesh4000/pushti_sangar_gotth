const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { getBlogCategories, createBlogCategory, getBlogCategoryById, updateBlogCategory, deleteBlogCategory } = require("../controllers/BlogCategoryController");


router.use(cookieParser());

router.post("/getblogcategory", getBlogCategories);
router.post("/addblogcategory", createBlogCategory);
router.post("/getspecificcategory/:id", getBlogCategoryById);
router.post("/updateblogcategory/:id", updateBlogCategory);
router.post("/deletecategory/:id", deleteBlogCategory);

module.exports = router;
