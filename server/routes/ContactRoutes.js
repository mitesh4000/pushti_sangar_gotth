const express = require("express");
const cookieParser = require("cookie-parser");
const { addContact, getContacts, getContactById, deleteContact } = require("../controllers/ContactController");



const router = express.Router();

router.use(cookieParser());

router.post("/addcontact" , addContact);
router.post("/getcontacts" , getContacts);
router.post("/getcontact/:id" , getContactById);
router.post("/deletecontact/:id" , deleteContact);



module.exports = router;