import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/api";

export default function ResetPassword() {
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // backend route: POST /api/forgot/reset-password
     await api.post("/forgot/reset-password", { token, newPassword: password });

      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-600 text-white p-2 w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
}
