const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "everything";

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.send({ success: false, Error: "Not authorized, please login" });
    }

    const verified = jwt.verify(token, JWT_SECRET);
    if (!verified.id) {
      return res.send({ success: false, msg: "id not found" });
    }

    req.body.id = verified.id;
    next();
  } catch (_error) {
    return res.send({ success: false, msg: "Not authorized, please login dj" });
  }
});

module.exports = protect;
