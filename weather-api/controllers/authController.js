const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// 🔹 Utility → Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// 🔹 Register User (Joi validation middleware already check karega)
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // ✅ Plain password save karega, pre("save") automatic hash karega
    user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Login User (Joi validation middleware already check karega)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login body:", req.body);
const user = await User.findOne({ email });
console.log("User found:", user);

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    console.log("Entered Password:", password);
console.log("DB Password Hash:", user.password);

const isMatch = await bcrypt.compare(password, user.password);
console.log("Password Match:", isMatch);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
