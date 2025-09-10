import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/forgot/forgot-password", { email });
      const token = res.data.token; // token from backend
      alert("Token generated! Redirecting to Reset Password page.");
      console.log("Temporary Token:", token);

      // redirect to ResetPassword page with token
      navigate(`/reset-password/${token}`);
    } catch (err) {
      alert(err.response?.data?.message || "Error generating token");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">
          Send Token
        </button>
      </form>
    </div>
  );
}
