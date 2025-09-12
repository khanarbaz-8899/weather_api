import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; 

export default function Home() {
  const { user } = useAuth();
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold jus">
         Welcome, {" "}
              <span style={{ fontWeight: "bold", color: "blue" }}>
                {user ? `${user.name} to our website`  : "to our website"} {/* 👈 if no user, show Guest */}
              </span>
      </h1>
      {/* <div className="mt-4 space-x-4">
        <Link className="text-blue-600" to="/login">Login</Link>
        <Link className="text-green-600" to="/register">Register</Link>
      </div> */}
    </div>
  )
}
