const path = require("path");
const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const multer = require("multer");
const { getGallaryCategories, getAllIncDel, addNewGallaryCategory, getGallaryCatById, updateGallaryCat, deleteGallaeyCat } = require("../controllers/GalleryCatMasterController");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads", "Gallery"));
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const extension = originalFileName.split(".").pop();
    const newFileName = `${Date.now()}_gallary_category_Image.${extension}`;
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

router.post("/getgallerycat", getGallaryCategories);
router.post("/getallgallerycat", getAllIncDel);
router.post("/creategallery", upload.single("imagePath"), addNewGallaryCategory);
router.post("/getspecificgallery/:id", getGallaryCatById);
router.post("/updategallery/:id", upload.single("imagePath"), updateGallaryCat);
router.post("/deletegallerycat/:id", deleteGallaeyCat);

module.exports = router;