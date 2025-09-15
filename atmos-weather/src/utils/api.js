import axios from "axios";

const API_BASE = "https://render-express-deployment-d44u.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE,
});

// JWT token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
