const userInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");

const tempCard = document.querySelector(".temp");
const cityNameCard = document.querySelector(".city");
const cityDataCard = document.querySelector(".city-data");

const weatherStateCard = document.querySelector(".weather-state1");
const weatherDescriptionCard = document.querySelector(".weather-state2");

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

    // Display temp degree
    tempCard.textContent = `${degree}°`;

    // Get weather state based on temp degree
    function getTemperatureState(temp) {
      let category;

      // Categorizing weather state
      if (temp <= 0) {
        category = "freezing";
      } else if (temp <= 10) {
        category = "cold";
      } else if (temp <= 20) {
        category = "mild";
      } else if (temp <= 30) {
        category = "warm";
      } else {
        category = "hot";
      }

      switch (category) {
        case "freezing":
          return "Freezing ❄️";
        case "cold":
          return "Cold 🧥";
        case "mild":
          return "Mild 🌤️";
        case "warm":
          return "Warm ☀️";
        case "hot":
          return "Hot 🔥";
        default:
          return "Unknown";
      }
    }

    const weatherState = getTemperatureState(degree);
    weatherStateCard.textContent = weatherState;

    // Display weather description
    weatherDescriptionCard.textContent = `With ${data.list[0].weather[0].description}`;
  });
}

function displayCityData(cityName) {
  getCityData(cityName).then((data) => {
    // Display city's name
    cityNameCard.textContent = `${data.title}`;

    // display informations about the city
    cityDataCard.textContent = `${data.extract}`;
  });
}

searchButton.addEventListener("click", () => {
  let city = userInput.value;
  displayCityData(city);
  displayWeatherData(city);
});
