const jwt = require("jsonwebtoken");
const User = require("../models/user");


// 🔹 Middleware to protect routes (must be logged in)
const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request, excluding password
    req.user = await User.findById(decoded.id).select("-password");

    next(); // continue to route
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// 🔹 Middleware to allow only admin users
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

module.exports = { authMiddleware, adminMiddleware };
