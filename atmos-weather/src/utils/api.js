import axios from "axios";
const API_BASE = process.env.NODE_ENV === 'production' 
  ? "https://render-express-deployment-1-ep2b.onrender.com/api"  // Your actual Render URL
  : "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_BASE,
});

// JWT token automatically
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  console.log("🔍 Token from localStorage:", token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("✅ Authorization header set:", config.headers.Authorization);
  } else {
    console.log("❌ No token found in localStorage");
  }
  
  console.log("📤 Request config:", config);
  return config;
});
