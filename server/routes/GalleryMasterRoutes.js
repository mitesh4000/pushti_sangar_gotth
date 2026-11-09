const path = require("path");
const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const multer = require("multer");
const { getGallaryItems, getAllIncDel, addNewImageInGallary, getGallaryItemById, updateGallaryItem, deleteGalleryItem } = require("../controllers/GalleryMasterController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads", "Gallery"));
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const extension = originalFileName.split(".").pop();
    const newFileName = `${Date.now()}_gallary_Image.${extension}`;
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

router.post("/getgalleries", getGallaryItems);
router.post("/getallgalleries", getAllIncDel);
router.post("/creategalleryitem", upload.single("imagePath"), addNewImageInGallary);
router.post("/getspecificgalleryitem/:id", getGallaryItemById);
router.post("/updategalleryitem/:id", upload.single("imagePath"), updateGallaryItem);
router.post("/deletegalleryitem/:id", deleteGalleryItem);

module.exports = router;