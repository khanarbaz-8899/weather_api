const express = require("express");
const { body } = require("express-validator");
const {
  addWeather,
  getAllWeather,
  getWeatherById,
  updateWeather,
  deleteWeather,
} = require("../controllers/weatherController");

const router = express.Router();

// Validation rules
const weatherValidation = [
  body("city").notEmpty().withMessage("City is required"),
  body("temperature").isNumeric().withMessage("Temperature must be a number"),
  body("condition").notEmpty().withMessage("Condition is required"),
];

// ✅ Routes
router.post("/", weatherValidation, addWeather);
router.get("/", getAllWeather);
router.get("/:id", getWeatherById);
router.put("/:id", weatherValidation, updateWeather);
router.delete("/:id", deleteWeather);

module.exports = router;
