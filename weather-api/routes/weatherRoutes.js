const express = require("express");
const { body } = require("express-validator");
const {
  addWeather,
  getAllWeather,
  getWeatherById,
  updateWeather,
  deleteWeather,
  getPublicWeather,
} = require("../controllers/weatherController");
const { authMiddleware } = require("../middlewares/auth-middleware");

const router = express.Router();

// Validation rules
const weatherValidation = [
  body("city").notEmpty().withMessage("City is required"),
  body("temperature").isNumeric().withMessage("Temperature must be a number"),
  body("condition").notEmpty().withMessage("Condition is required"),
];

router.get("/public", getPublicWeather);
// Routes
router.get("/", authMiddleware, getAllWeather);
router.get("/:id", authMiddleware, getWeatherById);
router.post("/", authMiddleware, weatherValidation, addWeather);
router.put("/:id", authMiddleware, weatherValidation, updateWeather);
router.delete("/:id", authMiddleware, deleteWeather);

module.exports = router;
