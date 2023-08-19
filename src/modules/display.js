import moment from 'moment';

const locationText = document.querySelector('.location-info');
const timeText = document.querySelector('.time-info');
const tempText = document.querySelector('.data-temp');
const unitText = document.querySelector('.data-unit');
const weatherText = document.querySelector('.desc-weather');
const feelingText = document.querySelector('.desc-feeling');
const humidityText = document.querySelector('.desc-humidity');
const windText = document.querySelector('.desc-wind');

const display = (() => {
  function setSearchResult(weatherData) {
    if (!weatherData) return;
    console.log(locationText);
    locationText.textContent = `${weatherData.name}, ${weatherData.country}`;
    timeText.textContent = moment(new Date(weatherData.time)).format(
      'MMMM Do YYYY | h:mm a'
    );
    tempText.textContent = weatherData.tempC;
    unitText.textContent = '°C';
    weatherText.textContent = weatherData.desc;
    feelingText.textContent = `Feel like ${weatherData.feelsLikeCel} °C`;
    humidityText.textContent = `Humidity ${weatherData.humidity} %`;
    windText.textContent = `Wind ${weatherData.windSpeed} km/h`;

    console.log(`${weatherData.name}, ${weatherData.country}`);
    console.log(weatherData.desc);
    console.log(`${weatherData.windSpeed}`);
  }
  return { setSearchResult };
})();

export default display;
