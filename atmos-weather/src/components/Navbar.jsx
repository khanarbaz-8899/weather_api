import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">
        <Link to="/">🌦 Weather App</Link>
      </h1>

      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
            <Link to="/register" className="hover:text-gray-300">Register</Link>
          </>
        ) : (
          <>
            <span>Hello, {user.name}</span>
            <button 
              onClick={logout} 
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
