import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/api";

export default function WeatherForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [condition, setCondition] = useState("Sunny");

  useEffect(() => {
    if (id) {
      api.get(`/weather/${id}`).then(res => {
        setCity(res.data.city);
        setTemperature(res.data.temperature);
        setCondition(res.data.condition);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { city, temperature, condition };
    if (id) await api.put(`/weather/${id}`, data);
    else await api.post("/weather", data);
    navigate("/weather");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit" : "Add"} Weather</h1>
      <form className="space-y-2" onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={e=>setCity(e.target.value)} placeholder="City" className="border p-2 w-full"/>
        <input type="number" value={temperature} onChange={e=>setTemperature(e.target.value)} placeholder="Temperature" className="border p-2 w-full"/>
        <select value={condition} onChange={e=>setCondition(e.target.value)} className="border p-2 w-full">
          <option>Sunny</option>
          <option>Rainy</option>
          <option>Cloudy</option>
          <option>Snowy</option>
        </select>
        <button type="submit" className="bg-green-600 text-white p-2 w-full">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  )
}
