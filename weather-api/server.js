require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

// Import routes
const weatherRoutes = require("./routes/weatherRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const profileRoutes = require("./routes/profileRoutes");
const forgotRoutes = require("./routes/forgotRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware

app.use(cors({
  origin: ["http://localhost:5173", "https://localhost:5000/api>"], // React app URLs
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]  // ✅ important
}));

app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Body:`, req.body);
  next();
});

// Routes
app.use("/api/auth", authRoutes);       // Register & Login
app.use("/api/weather", weatherRoutes); // Weather CRUD
app.use("/api/admin", adminRoutes);     // Admin APIs
app.use("/api/profile", profileRoutes); //  Fixed - Added missing slash
app.use("/api/forgot", forgotRoutes);   //  Fixed - Added missing slash
app.use("/api/users", userRoutes);

// Global error handler
app.use(errorHandler);

// DB & Server start
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("DB Connection Failed:", err));