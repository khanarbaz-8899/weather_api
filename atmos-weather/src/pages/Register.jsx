import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
         
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // ✅ token save in localStorage
        toast.success("Registration Successful");
        setName("");
        setEmail("");
        setPassword("");
        navigate("/records");
      } else {
        // ✅ Agar Joi errors array mile to sab show karo
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((err) => toast.error(err));
        } else {
          toast.error(data.message || "Registration Failed");
        }
      }
    } catch (error) {
      console.error("Register Error:", error);
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-600 text-white p-2 w-full">
          Register
        </button>
      </form>
      <div className="mt-2">
        <Link className="text-blue-600" to="/login">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
