import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";

const weatherIcons = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Fog: "🌫️",
  Haze: "🌁",
};

const App = () => {
  const [city, setCity] = useState(''); 
  const [weather, setWeather] = useState(null); 

  const fetchWeather = async () => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,          
          appid: API_KEY,  
          units: 'metric', 
        },
      });
      setWeather(response.data); 
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        if (error.response.status === 404) {
          alert('City not found. Please enter a valid city name.');
        } else if (error.response.status === 401) {
          alert('Invalid API key. Please check your API key.');
        } else {
          alert('An error occurred while fetching weather data.');
        }
      } else if (error.request) {
        alert('No response from the server. Please check your internet connection.');
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className='container'>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Type city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={fetchWeather} style={{ marginLeft: '10px', padding: '10px 20px' }}>
        Search
      </button>
      {weather && weather.main && weather.weather && (
        <div className="weather-info">
          <h2>{weather.name} {weatherIcons[weather.weather[0].main] || "❓"}</h2>
          <p>Temp: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
