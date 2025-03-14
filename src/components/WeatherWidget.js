import { useEffect, useState } from 'react';

function WeatherWidget() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = "YOUR_OPENWEATHER_API_KEY";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Chitre,PA&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error("Error obteniendo clima:", err));
  }, []);

  if (!weather) return <div>Cargando clima...</div>;

  return (
    <div style={{ position: 'absolute', top: 10, right: 10, background: '#eee', padding: '5px' }}>
      <strong>Clima en Azuero:</strong> {weather.main.temp}°C, {weather.weather[0].description}
    </div>
  );
}

export default WeatherWidget;
