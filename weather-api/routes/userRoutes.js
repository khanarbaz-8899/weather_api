const express = require("express");
const {
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/userController");
const { userValidation } = require("../validators/joiSchemas");
const validate = require("../middlewares/validate");
const { authMiddleware } = require("../middlewares/auth-middleware");

const router = express.Router();

// 🔹 Profile
router.get("/profile", authMiddleware, getProfile);
router.put(
  "/profile",
  authMiddleware,
  validate(userValidation.updateProfile),
  updateProfile
);

// 🔹 Forgot + Reset password (via token)
router.post(
  "/forgot-password",
  validate(userValidation.forgotPassword),
  forgotPassword
);
router.post(
  "/reset-password",
  validate(userValidation.resetPassword),
  resetPassword
);

// 🔹 Change password (via login + JWT)
router.post(
  "/change-password",
  authMiddleware,
  validate(userValidation.changePassword),
  changePassword
);

module.exports = router;
