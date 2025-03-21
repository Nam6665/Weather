export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5b1c9a877dmsh1601a411a4537e3p10f89ejsn775b7325f03f",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const geoUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "e17380edecfaf203f51f66766a474473";

export const getCurrentWeather = (lat, lon) => {
  return fetch(
    `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  ).then((response) => response.json());
};

export const getForecast = (lat, lon) => {
  return fetch(
    `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
  ).then((response) => response.json());
};

export const loadCityOptions = (inputValue) => {
  return fetch(
    `${geoUrl}/cities?minPopulation=500000&namePrefix=${inputValue}`,
    geoApiOptions
  )
    .then((response) => response.json())
    .then((response) => {
      return {
        options: response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    });
};
