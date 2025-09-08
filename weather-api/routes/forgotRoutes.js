const express = require("express");
const { forgotPassword, resetPassword } = require("../controllers/userController");
const { userValidation } = require("../validators/joiSchemas");
const validate = require("../middlewares/validate");

const router = express.Router();

// 🔹 Debug logs (optional)
// console.log("forgotPassword:", forgotPassword);
// console.log("resetPassword:", resetPassword);
// console.log("validate:", typeof validate);
// console.log("userValidation.forgotPassword:", userValidation.forgotPassword);

// 🔹 Forgot Password
router.post("/forgot-password", validate(userValidation.forgotPassword), forgotPassword);

// 🔹 Reset Password
router.post("/reset-password", validate(userValidation.resetPassword), resetPassword);

module.exports = router;
