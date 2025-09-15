import { useEffect, useState } from "react";
import { api } from "../utils/api";

export default function PublicWeatherList() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fetchPublicWeather = async () => {
      try {
        const res = await api.get("/weather/public"); // 👈 call public API
        console.log("🌍 Public weather:", res.data);
        setWeather(res.data);
      } catch (err) {
        console.error("❌ Error fetching public weather:", err.response?.data || err.message);
      }
    };

    fetchPublicWeather();
  }, []);

  return (
    <div>
      <h2>🌤 Public Weather Records</h2>
      <ul>
        {weather.map((w) => (
          <li key={w._id}>
            {w.city} - {w.temperature}°C - {w.condition}
          </li>
        ))}
      </ul>
    </div>
  );
}
