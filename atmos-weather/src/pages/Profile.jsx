import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/api";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    try {
      const body = { name, email };
      if (password) body.password = password;
      const res = await api.put("/users/profile", body);
      setUser(res.data);
      alert("Profile updated!");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-10 space-y-2">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <input type="text" value={name} onChange={e=>setName(e.target.value)} className="border p-2 w-full" placeholder="Name"/>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 w-full" placeholder="Email"/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 w-full" placeholder="New Password"/>
      <button onClick={handleUpdate} className="bg-blue-600 text-white p-2 w-full">Update Profile</button>
    </div>
  )
}
