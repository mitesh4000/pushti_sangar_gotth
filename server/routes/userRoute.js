const express = require("express");

const cookieParser = require("cookie-parser");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");
const { registerUser, loginUser, logout, getLoggedInUser, getSpecificUser, loginStatus, updateUser, updatePassword, forgotPassword, resetPassword, getUsers, DeleteUser} = require("../controllers/userController");

router.use(cookieParser());

router.post("/register" , upload.single('photo'), registerUser);
router.post("/login" , loginUser);
router.post("/logout" , logout);
router.post("/getloggedinuser",protect, getLoggedInUser);
router.post("/getspecificuser", getSpecificUser);
router.post("/loggedin", loginStatus);
router.post("/updateuser" , upload.single('photo') ,updateUser);
router.post("/updatepassword", protect ,updatePassword);
router.post("/forgotpassword",forgotPassword);
router.post("/resetpassword/:resetToken",resetPassword);
router.post("/getusers",getUsers);
router.post("/deleteuser",DeleteUser);
// router.get("/addstatus",addStatus);


module.exports = router;