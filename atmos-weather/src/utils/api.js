import axios from "axios";

const API_BASE = process.env.NODE_ENV === "production"
  ? "https://render-express-deployment-1-ep2b.onrender.com/api"  // Your actual Render URL
  : "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE,
});

// JWT token automatically for protected routes only
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  // ✅ Public routes (yaha token nahi bhejna hai)
  const publicRoutes = ["/auth/login", "/auth/register", "/forgot"];

  // Agar request public route ka nahi hai, tabhi token lagao
  if (!publicRoutes.some(route => config.url.includes(route)) && token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("✅ Authorization header set:", config.headers.Authorization);
  } else {
    console.log("ℹ️ Public route request (no token attached):", config.url);
  }

  return config;
});
