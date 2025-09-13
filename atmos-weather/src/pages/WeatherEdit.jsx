import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { toast } from "react-toastify";

export default function WeatherEdit() {
  const { id } = useParams();   // 👈 URL se id nikal raha hai
  const navigate = useNavigate();

  const [form, setForm] = useState({
    city: "",
    temperature: "",
    condition: "",
  });

  const [loading, setLoading] = useState(true);

  // 👇 Record fetch karo jab page load ho
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await api.get(`/weather/${id}`);
        setForm({
          city: res.data.city,
          temperature: res.data.temperature,
          condition: res.data.condition,
        });
      } catch (err) {
        toast.error("Failed to load record");
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [id]);

  // 👇 Input change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 👇 Update request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/weather/${id}`, form);
      toast.success("Record updated successfully");
      navigate("/weather"); // 👈 wapas list par bhej do
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Weather</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="temperature"
          value={form.temperature}
          onChange={handleChange}
          placeholder="Temperature"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="condition"
          value={form.condition}
          onChange={handleChange}
          placeholder="Condition"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
