const userInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");

const tempCard = document.querySelector(".temp");
const cityNameCard = document.querySelector(".city");
const cityDataCard = document.querySelector(".city-data");

const weatherStateCard = document.querySelector(".weather-state1");
const weatherDescriptionCard = document.querySelector(".weather-state2");

const tempIcon = document.querySelector(".icon");
const currentDate = document.querySelector(".date");

const windSpeedCard = document.querySelector(".wind-speed");
const minTempCard = document.querySelector(".min-temp");
const maxTempCard = document.querySelector(".max-temp");

async function getWeatherData(cityName) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8982eac9681b6860f252c3f99695a774&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getCityData(cityName) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${cityName}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

function displayWeatherData(cityName) {
  getWeatherData(cityName).then((data) => {
    const degree = data.list[0].main.temp;

    tempCard.textContent = `${degree}°`;

    const weatherState = getTemperatureState(degree);
    weatherStateCard.textContent = weatherState;

    weatherDescriptionCard.textContent = `With ${data.list[0].weather[0].description}`;

    // Get weather state
    const condition = data.list[0].weather[0].main;

    // Display appropriate icon for the weather state
    if (condition === "Rain") {
      tempIcon.setAttribute("src", "./Icons/rainny.svg");
    } else if (condition === "Clear") {
      tempIcon.setAttribute("src", "./Icons/sunny.svg");
    } else {
      tempIcon.setAttribute("src", "./Icons/clouds.svg");
    }

    windSpeedCard.textContent = `${data.list[0].wind.speed}`;
    minTempCard.textContent = `${data.list[0].main.temp_min}°`;
    maxTempCard.textContent = `${data.list[0].main.temp_max}°`;
    console.log(data.list[0].main.temp_min);
  });
}

// Cateogrizing temp states based on temp degree
function getTemperatureState(temp) {
  let category;

  if (temp <= 0) {
    return "Freezing";
  } else if (temp <= 10) {
    return "Cold";
  } else if (temp <= 20) {
    return "Mild";
  } else if (temp <= 30) {
    return "Warm";
  } else {
    return "Hot";
  }
}

function displayCityData(cityName) {
  getCityData(cityName).then((data) => {
    cityNameCard.textContent = `${data.title}`;
    cityDataCard.textContent = `${data.extract}`;
  });
}

searchButton.addEventListener("click", () => {
  let city = userInput.value;
  displayCityData(city);
  displayWeatherData(city);
});

function displayDate() {
  const date = new Date();
  const day = date.getDate();
  // Convert month number to it's name(ex: 2 to Feb)
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  // Get current day of the week
  const weekDay = date.toLocaleString("default", { weekday: "long" });

  currentDate.textContent = `${weekDay}, ${day}${month}, ${year}`;
}

setInterval(displayDate, 1000);
