// middleware/adminMiddleware.js

// 🔹 Middleware to allow only admin users
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // ✅ User is admin → continue
  } else {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
};

module.exports = adminMiddleware;
