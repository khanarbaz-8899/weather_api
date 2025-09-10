const jwt = require("jsonwebtoken");
const User = require("../models/user"); // ✅ make sure file path matches

// 🔹 Auth Middleware
const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token not provided" });
  }

  const token = authHeader.split(" ")[1]; // ✅ extract token
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded JWT:", decoded);

    // Find user by ID
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔹 Normalize user object
    req.user = {
      id: user._id.toString(),
      role: user.role,
      name: user.name,
      email: user.email,
    };

    req.token = token;

    next();
  } catch (error) {
    console.error("❌ Auth error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

// auth-middleware.js
module.exports = { authMiddleware };

