import React, { useState, useEffect } from "react";
import Search from "./components/search/search.jsx";
import CurrentWeather from "./components/current-weather/current-weather.jsx";
import { getCurrentWeather, getForecast } from "./components/Services/api.js";
import Forecast from "./components/forecast/forecast.jsx";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const stockholmLat = 59.3293;
    const stockholmLon = 18.0686;

    Promise.all([
      getCurrentWeather(stockholmLat, stockholmLon),
      getForecast(stockholmLat, stockholmLon),
    ])
      .then(([weatherResponse, forecastResponse]) => {
        setCurrentWeather({ city: "Stockholm", ...weatherResponse });
        setForecast({ city: "Stockholm", ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to fetch weather data. Please try again later.");
      });
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    Promise.all([getCurrentWeather(lat, lon), getForecast(lat, lon)])
      .then(([weatherResponse, forecastResponse]) => {
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to fetch weather data. Please try again later.");
      });
  };

  return (
    <div className='container'>
      <div className='search-container'>
        <Search onSearchChange={handleOnSearchChange} />
      </div>
      <div className='weather-forecast-container'>
        <div className='current-weather'>
          {currentWeather ? (
            <CurrentWeather data={currentWeather} />
          ) : (
            <p>Loading current weather...</p>
          )}
        </div>
        <div className='forecast-container'>
          {forecast ? <Forecast data={forecast} /> : <p>Loading forecast...</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
