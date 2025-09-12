import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import { toast } from "react-toastify";

export default function WeatherList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const res = await api.get("/weather");
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    if ( toast.error("Delete this record?")) {
      try {
        await api.delete(`/weather/${id}`);
        fetchRecords();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Weather Records</h1>
        <Link className="bg-green-600 text-white px-4 py-2 rounded" to="/form">
          Add
        </Link>
      </div>

      {records.length === 0 ? (
        <p>No weather records found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">City</th>
              <th className="border p-2">Temp</th>
              <th className="border p-2">Condition</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id}>
                <td className="border p-2">{r.city}</td>
                <td className="border p-2">{r.temperature}°C</td>
                <td className="border p-2">{r.condition}</td>
                <td className="border p-2">
                  {r.date ? new Date(r.date).toLocaleDateString() : "N/A"}
                </td>
                <td className="border p-2">
                  <div className="flex gap-2">   {/* 👈 flex + gap for spacing */}
                    <Link
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                      to={`/weather/edit/${r._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(r._id)}  
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
