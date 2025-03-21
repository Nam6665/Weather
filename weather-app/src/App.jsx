import React, { useState, useEffect } from "react";
import Search from "./components/search/search.jsx";
import CurrentWeather from "./components/current-weather/current-weather.jsx";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Forecast from "./components/forecast/forecast.jsx";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const stockholmLat = 59.3293;
    const stockholmLon = 18.0686;

    fetch(
      `${WEATHER_API_URL}/weather?lat=${stockholmLat}&lon=${stockholmLon}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((weatherResponse) => {
        setCurrentWeather({ city: "Stockholm", ...weatherResponse });
      })
      .catch((err) => console.log(err));

    fetch(
      `${WEATHER_API_URL}/forecast?lat=${stockholmLat}&lon=${stockholmLon}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((forecastResponse) => {
        setForecast({ city: "Stockholm", ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
