let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forcast = document.querySelector(".weather_forcast");
let temparature = document.querySelector(".weather_temparature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// ===>>Get Country Name<===
const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

// ===>Get Date & Time<===
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  const options = {
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(curDate);
};

let city = "Pune";

// ===> Search functionality<===
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = document.querySelector(".city_name").value.trim();
  if (input) city = input;
  getWeatherData();
  document.querySelector(".city_name").value = "";
});

// ===>Fetch Weather Data<===
const getWeatherData = async () => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=22b1c0c0ffa43952827544d728293c43&units=metric`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);

    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forcast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="icon">`;

    temparature.innerHTML = `${main.temp.toFixed(1)}°C`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed(1)}°C`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed(1)}°C`;

    w_feelsLike.innerHTML = `${main.feels_like.toFixed(1)}°C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.error(error);
    cityName.innerHTML = "City not found";
  }
};

window.addEventListener("load", getWeatherData);
