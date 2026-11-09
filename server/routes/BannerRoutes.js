const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const {
  getBanner,
  addNewBanner,
  getBannerById,
  updateBanner,
  deleteBanner,
  getAllIncDelBanner,
} = require("../controllers/BannerMasterController");
const router = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads", "Banner"));
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const extension = originalFileName.split(".").pop();
    const newFileName = `${Date.now()}_categoryImage.${extension}`;
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

router.use(cookieParser());


router.post("/get-banner", getBanner);
router.post("/all", getAllIncDelBanner);
router.post("/add-new-banner", upload.single("image"), addNewBanner);
router.post("/get-banner-by-id/:id", getBannerById);
router.post("/update-banner/:id", upload.single("image"), updateBanner);
router.post("/delete-banner/:id", deleteBanner);

module.exports = router;
