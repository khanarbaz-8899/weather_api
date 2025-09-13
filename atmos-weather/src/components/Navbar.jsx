import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  // ✅ derive isLoggedIn from user
  const isLoggedIn = !!user;

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold">
        <Link to="/">🌦 Weather App</Link>
      </h1>

      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "underline" : ""}>
            Home
          </NavLink>
        </li>

        {isLoggedIn && (
          <>
            <li>
              <NavLink to="/records" className={({ isActive }) => isActive ? "underline" : ""}>
                Weather Records
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/form" className={({ isActive }) => isActive ? "underline" : ""}>
                Weather Form
              </NavLink>
            </li> */}
              {/* ✅ Admin-only link */}
            {user?.role === "admin" && (
              <li>
                <NavLink to="/users" className={({ isActive }) => isActive ? "underline" : ""}>
                  Users
                </NavLink>
              </li>
                 )}
          </>
        )}

        {isLoggedIn ? (
          <li>
            <button onClick={logout} className="hover:underline">
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/register" className={({ isActive }) => isActive ? "underline" : ""}>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? "underline" : ""}>
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
