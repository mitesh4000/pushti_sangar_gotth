const path = require("path");
const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const multer = require("multer");
const {
  getColors,
  getAllColorsIncludingDeleted,
  addColor,
  getColorById,
  updateColor,
  deleteColor,
} = require("../controllers/ColorController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads", "Color"));
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const extension = originalFileName.split(".").pop();
    const newFileName = `${Date.now()}_color_photo.${extension}`;
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

router.post("/getcolors", getColors);
router.post("/addcolor", upload.single("photo"), addColor);
router.post("/getspecificcolor/:id", getColorById);
router.post("/updatecolor/:id", upload.single("photo"), updateColor);
router.post("/deletecolor/:id", deleteColor);

module.exports = router;
