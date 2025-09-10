import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await login(email, password); // store return value
    console.log("Login response:", response);
    alert("Login Successful");
    navigate("/weather");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 w-full"/>
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">Login</button>
      </form>
      <div className="mt-2">
        <Link className="text-green-600" to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
}
