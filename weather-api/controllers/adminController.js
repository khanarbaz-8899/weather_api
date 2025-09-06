const User = require("../models/user");
const Weather = require("../models/weather");
const { validationResult } = require("express-validator");

// 🔹 Get All Users' Weather Records (Admin Only)
exports.getAllUsersForAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body; // ✅ from body now

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found :->" });
    }

    let records;
    if (user.role === "admin") {
      records = await Weather.find().populate("user", "name email");
    } else {
      records = await Weather.find({ user: user.id });
    }

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
