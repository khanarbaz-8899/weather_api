const Weather = require("../models/weather");
const { validationResult } = require("express-validator");

// ✅ POST → Add weather record
exports.addWeather = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { city, temperature, condition } = req.body;
    const weather = new Weather({ city, temperature, condition });
    await weather.save();
    res.status(201).json(weather);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET → All records
exports.getAllWeather = async (req, res) => {
  try {
    const records = await Weather.find();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET → By ID
exports.getWeatherById = async (req, res) => {
  try {
    const record = await Weather.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ PUT → Update by ID
exports.updateWeather = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { city, temperature, condition } = req.body;
    const updated = await Weather.findByIdAndUpdate(
      req.params.id,
      { city, temperature, condition },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "Record not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE → By ID
exports.deleteWeather = async (req, res) => {
  try {
    const deleted = await Weather.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Record not found" });
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
