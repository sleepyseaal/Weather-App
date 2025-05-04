async function getData(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8982eac9681b6860f252c3f99695a774&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
