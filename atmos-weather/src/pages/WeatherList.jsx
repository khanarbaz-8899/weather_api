import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";

export default function WeatherList() {
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    const res = await api.get("/weather");
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete this record?")) {
      await api.delete(`/weather/${id}`);
      fetchRecords();
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Weather Records</h1>
        <Link className="bg-green-600 text-white px-4 py-2 rounded" to="/weather/add">Add</Link>
      </div>
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
          {records.map(r => (
            <tr key={r._id}>
              <td className="border p-2">{r.city}</td>
              <td className="border p-2">{r.temperature}°C</td>
              <td className="border p-2">{r.condition}</td>
              <td className="border p-2">{new Date(r.date).toLocaleDateString()}</td>
              <td className="border p-2 space-x-2">
                <Link className="bg-blue-600 text-white px-2 py-1 rounded" to={`/weather/edit/${r._id}`}>Edit</Link>
                <button onClick={()=>handleDelete(r._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
