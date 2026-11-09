const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const prisma = require("../lib/prisma");
const sendEmail = require("../utils/sendEmail");
const { serializeUser, serializeRole, toBool } = require("../utils/serialize");

const JWT_SECRET = process.env.JWT_SECRET || "everything";

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });

const normalizeRoles = (roles) => {
  if (!roles) return [];
  if (Array.isArray(roles)) return roles.map(String).map((role) => role.trim()).filter(Boolean);
  if (typeof roles === "string") {
    const trimmed = roles.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[")) {
      try {
        return JSON.parse(trimmed).map(String).map((role) => role.trim()).filter(Boolean);
      } catch (_error) {
        /* fall through to comma parsing */
      }
    }
    return trimmed.split(",").map((role) => role.trim()).filter(Boolean);
  }
  return [];
};

const syncUserRoles = async (userId, roleNames) => {
  await prisma.userRole.deleteMany({ where: { userId } });
  for (const roleName of [...new Set(roleNames)]) {
    let role = await prisma.role.findUnique({ where: { role: roleName } });
    if (!role) {
      role = await prisma.role.create({ data: { role: roleName, permissions: "[]" } });
    }
    await prisma.userRole.create({ data: { userId, roleId: role.id } });
  }
};

const findUserById = (id) =>
  prisma.user.findUnique({ where: { id }, include: { roles: { include: { role: true } } } });

// Register User
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmPassword, roles, active } = req.body;
    const profilePhoto = req.file ? req.file.path : "";

    if (password !== confirmPassword) {
      return res.send({ success: false, msg: "Passwords do not match" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        photo: profilePhoto,
        active: active === undefined ? true : toBool(active),
      },
      include: { roles: { include: { role: true } } },
    });

    await syncUserRoles(user.id, normalizeRoles(roles));
    const created = await findUserById(user.id);

    return res.send({
      success: true,
      msg: "User added successfully",
      user: serializeUser(created),
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ success: false, msg: "Please fill all required fields" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { roles: { include: { role: true } } },
  });

  if (!user) {
    return res.send({ success: false, msg: "User not found" });
  }

  const passwordIscorrect = await bcrypt.compare(password, user.password);
  const token = generateToken(user.id);
  const role = user.roles.length ? user.roles[0].role : null;

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "none",
    secure: true,
  });

  if (passwordIscorrect) {
    return res.send({
      success: true,
      msg: "Successfully LoggedIn",
      token,
      roles: serializeRole(role),
    });
  }
  return res.status(401).send({ success: false, msg: "Invalid Credentials" });
});

// Logout User
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully logged out" });
});

// Get User Data
const getLoggedInUser = asyncHandler(async (req, res) => {
  const user = await findUserById(req.body.id);

  if (user) {
    const serialized = serializeUser(user);
    const { _id, name, email, photo, password, roles, active } = serialized;
    return res.send({ success: true, _id, name, email, photo, password, roles, active });
  }
  return res.send({ success: false, msg: "User not found" });
});

// Get Specific User
const getSpecificUser = asyncHandler(async (req, res) => {
  try {
    const user = await findUserById(req.body.id);
    if (user) {
      const { _id, name, email, photo, roles, active } = serializeUser(user);
      return res.send({ success: true, _id, name, email, photo, roles, active });
    }
    return res.send({ success: false, msg: "User not found" });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
});

// Get login Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.send({ success: false });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    return res.send({ success: Boolean(verified) });
  } catch (_error) {
    return res.send({ success: false });
  }
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  if (!req.body.id) {
    return res.send({ success: false, msg: "User not found" });
  }

  const { id, name, roles, active } = req.body;
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) {
    return res.send({ success: false, msg: "User not found" });
  }

  const photo = req.file ? req.file.path : existing.photo;
  await prisma.user.update({
    where: { id },
    data: {
      name,
      photo,
      active: active === undefined ? existing.active : toBool(active),
    },
  });
  await syncUserRoles(id, normalizeRoles(roles));

  return res.send({ success: true, msg: "User updated" });
});

// Update Password
const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, id } = req.body;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return res.send({ success: false, msg: "User not found , Please signup" });
  }
  if (!oldPassword || !newPassword) {
    return res.send({ success: false, msg: "Please add old and new password" });
  }

  const passwordMatches = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatches) {
    return res.send({ success: false, msg: "Old password is incorrect" });
  }
  if (oldPassword === newPassword) {
    return res.send({ success: false, msg: "New Password cannot be same as Old password" });
  }

  await prisma.user.update({
    where: { id },
    data: { password: await bcrypt.hash(newPassword, 10) },
  });
  return res.send({ success: true, msg: "Password changed successfully" });
});

// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.send({ success: false, msg: "User  not found" });
  }

  await prisma.token.deleteMany({ where: { userId: user.id } });

  const resetToken = crypto.randomBytes(32).toString("hex") + user.id;
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  await prisma.token.create({
    data: {
      userId: user.id,
      token: hashedToken,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    },
  });

  const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset/${resetToken}`;
  const message = `
  <h2>Hello ${user.name}</h2>
  <p>Please use this URL below to reset your password</p>
  <p>This reset link is valid for 30 Minutes</p>
  <a href=${resetUrl} clicktraking = off> ${resetUrl}</a>
  <p>Regards .... </p>
  `;

  try {
    await sendEmail(
      "Password reset request",
      message,
      user.email,
      process.env.EMAIL_USER
    );
    return res.send({ success: true, msg: "Reset Email Sent" });
  } catch (error) {
    return res.send({ success: false, error: error.message });
  }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  const userToken = await prisma.token.findFirst({
    where: { token: hashedToken, expiresAt: { gt: new Date() } },
  });

  if (!userToken || !userToken.userId) {
    return res.send("Invalid or Expired Token");
  }

  const user = await prisma.user.findUnique({ where: { id: userToken.userId } });
  if (!user) {
    return res.send("Invalid or Expired Token");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: await bcrypt.hash(password, 10) },
  });

  return res.send({ success: true, msg: "Password Reset Successful,Please Login" });
});

// Get Users
const getUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany({
    include: { roles: { include: { role: true } } },
    orderBy: { createdAt: "desc" },
  });
  return res.send({ users: users.map(serializeUser) });
});

// Delete User
const DeleteUser = asyncHandler(async (req, res) => {
  const id = req.body.id;
  try {
    await prisma.user.delete({ where: { id } });
    return res.send({ success: true, msg: "User Deleted Successfully" });
  } catch (_error) {
    return res.send({ success: false, msg: "User not found" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  logout,
  getLoggedInUser,
  loginStatus,
  updateUser,
  updatePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  DeleteUser,
  getSpecificUser,
};
