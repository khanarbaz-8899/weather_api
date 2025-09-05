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
  },
  user: { // 🔹 link record to user
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Weather", weatherSchema);
