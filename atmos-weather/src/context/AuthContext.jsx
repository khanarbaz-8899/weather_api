// context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

import { api } from "../utils/api"; // axios instance ya API helper

// Create context
export const AuthContext = createContext();

// AuthProvider wraps your entire app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login function
const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });

    // ✅ Save token + user in localStorage
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // ✅ Update context state
    setUser(res.data.user);

    return res.data; // 👈 return so caller can use (navigate, toast etc.)
  } catch (err) {
    // ✅ Backend se jo message aata hai usey log + throw karo
    if (err.response && err.response.data) {
      console.error("Login failed:", err.response.data.message || err.message);
      throw new Error(err.response.data.message || "Login failed");
    }
    throw new Error("Network error, please try again");
  }
};


  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Optional: custom hook for easier access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
