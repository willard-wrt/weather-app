import moment from 'moment';

const locationText = document.querySelector('.location-info');
const timeText = document.querySelector('.time-info');
const tempText = document.querySelector('.data-temp');
const unitText = document.querySelector('.data-unit');
const weatherText = document.querySelector('.desc-weather');
const feelingText = document.querySelector('.desc-feeling');
const humidityText = document.querySelector('.desc-humidity');
const windText = document.querySelector('.desc-wind');
const celsiusTab = document.querySelector('.setting-celsius');

const display = (() => {
  function setSearchResult(weatherData) {
    if (!weatherData) return;
    locationText.textContent = `${weatherData.name}, ${weatherData.country}`;
    timeText.textContent = moment(new Date(weatherData.time)).format(
      'MMMM Do YYYY | h:mm a'
    );
    if (celsiusTab.classList.contains('active')) {
      tempText.textContent = weatherData.tempC;
      unitText.textContent = '°C';
      feelingText.textContent = `Feel like: ${weatherData.feelsLikeCel} °C`;
    } else {
      tempText.textContent = weatherData.tempF;
      unitText.textContent = '°F';
      feelingText.textContent = `Feel like: ${weatherData.feelsLikeFah} °F`;
    }
    weatherText.textContent = weatherData.desc;
    humidityText.textContent = `Humidity: ${weatherData.humidity} %`;
    windText.textContent = `Wind: ${weatherData.windSpeed} km/h`;
  }
  return { setSearchResult };
})();

export default display;
