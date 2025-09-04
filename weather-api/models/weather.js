const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: [true, "City is required"],
    trim: true
  },
  temperature: {
    type: Number,
    required: [true, "Temperature is required"]
  },
  condition: {
    type: String,
    required: [true, "Condition is required"]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Weather", weatherSchema);
