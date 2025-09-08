const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { userValidation} = require("../validators/joiSchemas");
const validate = require("../middlewares/validate");





const router = express.Router();

// 🔹 Register (Joi validation via middleware)
router.post("/register", validate(userValidation.register), registerUser);

// 🔹 Login
router.post("/login", validate(userValidation.login), loginUser);

module.exports = router;
