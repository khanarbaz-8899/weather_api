// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  // Set default status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Server Error",
    // Only show stack in development
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
