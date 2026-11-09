const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { getContents, addContents, getContentsbyId, updateContent, deleteContent } = require("../controllers/contentController");

router.use(cookieParser());

router.post("/getcontent", getContents);
router.post("/createcontent", addContents);
router.post("/getspecificcontent/:id", getContentsbyId);
router.post("/updatecontent/:id", updateContent);
router.post("/deletecontent/:id", deleteContent);

module.exports = router;