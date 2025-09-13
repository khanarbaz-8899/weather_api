import { useEffect, useState, useContext } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function UsersList() {
  const { user, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);



    const fetchUsers = async () => {
      try {
        const res = await api.get("http://localhost:5000/api/users/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
      }finally {
      setLoading(false);
    }
    };

   

   useEffect(() => {
      fetchUsers();
    }, []);
  

  const handleDelete = async (id) => {
    
      if ( toast.error("Delete this record?")) {
        try {
          await api.delete(`/users/${id}`);
          fetchUsers();
        } catch (err) {
          console.error("Delete failed", err);
        }
      }
    };
  
    if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <table className="border w-full">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
               <td className="border p-2 space-x-2">
                 <Link
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                      to={`/users/edit/${u._id}`}
                    >
                      Edit
                    </Link>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
