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
    console.log(data);
  });
}

function displayCityData(cityName) {
  getCityData(cityName).then((data) => console.log(data));
}

displayCityData("cairo");
