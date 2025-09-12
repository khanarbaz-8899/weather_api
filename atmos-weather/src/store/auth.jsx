// context/AuthContext.jsx
import { useEffect, useContext, useState, createContext } from "react";

// Create context
export const AuthContext = createContext();

// AuthProvider wraps your app
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null); 
  const authorizationToken = `Bearer ${token}`;

  // Store token in localStorage + update state
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Check if logged in
  const isLoggedIn = !!token;

  // Logout functionality
  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null);
  };

  // JWT AUTHENTICATION - get current user data
  const userAuthentication = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.error("Auth failed:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Call effect when token changes
  useEffect(() => {
    if (token) userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, authorizationToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return authContextValue;
};
