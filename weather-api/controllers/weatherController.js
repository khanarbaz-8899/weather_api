const Weather = require("../models/weather");
const { validationResult } = require("express-validator");

// POST → Add weather record
exports.addWeather = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { city, temperature, condition } = req.body;

    const weather = new Weather({
      city,
      temperature,
      condition,
      user: req.user.id,
    });

    await weather.save();
    res.status(201).json(weather);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getPublicWeather = async (req, res) => {
  try {
    const records = await Weather.find().populate("user", "name email");
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET → All records
exports.getAllWeather = async (req, res) => {
  try {
    let records;
    if (req.user.role === "admin") {
      // Admin → sabka data
      records = await Weather.find().populate("user", "name email");
    } else {
      // Normal user → sirf apna data
      records = await Weather.find({ user: req.user.id });
    }
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET → By ID
exports.getWeatherById = async (req, res) => {
  try {
    const record = await Weather.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    if (req.user.role !== "admin" && record.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT → Update
exports.updateWeather = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    let record = await Weather.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    if (req.user.role !== "admin" && record.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    record.city = req.body.city;
    record.temperature = req.body.temperature;
    record.condition = req.body.condition;

    await record.save();
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE → Remove
exports.deleteWeather = async (req, res) => {
  try {
    const record = await Weather.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });

    if (req.user.role !== "admin" && record.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await record.deleteOne();
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
