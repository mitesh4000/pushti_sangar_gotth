const path = require("path");
const express = require("express");
const {
    getBlog,
    addBlog,
    getBlogbyId,
    updateBlog,
    deleteBlog,
    getAllIncDel,
    getBlogbyblogCategoryId
} = require("../controllers/blogController");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads", "Blog"));
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const extension = originalFileName.split(".").pop();
    const newFileName = `${Date.now()}_blog_Image.${extension}`;
    cb(null, newFileName);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."));
  }
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });


router.post("/get-blog", getBlog);
router.post("/add-blog",upload.single("imagePath"),addBlog);
router.post("/get-blog/:id", getBlogbyId);
router.post("/getblogbycategory/:id", getBlogbyblogCategoryId);
router.post("/update-blog/:id",upload.single("imagePath"),updateBlog);
router.post("/delete-blog/:id", deleteBlog);

module.exports = router;
