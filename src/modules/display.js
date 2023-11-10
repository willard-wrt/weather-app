import moment from 'moment';
import 'moment/locale/ja';

const locationText = document.querySelector('.location-info');
const timeText = document.querySelector('.time-info');
const tempText = document.querySelector('.data-temp');
const unitText = document.querySelector('.data-unit');
const weatherText = document.querySelector('.desc-weather');
const feelingText = document.querySelector('.desc-feeling');
const humidityText = document.querySelector('.desc-humidity');
const windText = document.querySelector('.desc-wind');
const celsiusTab = document.querySelector('.setting-celsius');
const mainWeather = document.querySelectorAll('.skeleton');

const display = (() => {
  function setSearchResult(weatherData) {
    if (!weatherData) return;
    locationText.textContent = `${weatherData.name}, ${weatherData.country}`;
    timeText.textContent = moment(new Date(weatherData.time))
      .locale('en')
      .format('MMMM Do YYYY | h:mm a');
    if (celsiusTab.classList.contains('active')) {
      tempText.textContent = weatherData.tempC;
      unitText.textContent = '°C';
      feelingText.textContent = `Feel like: ${weatherData.feelsLikeCel} °C`;
    } else {
      tempText.textContent = weatherData.tempF;
      unitText.textContent = '°F';
      feelingText.textContent = `Feel like: ${weatherData.feelsLikeFah} °F`;
    }
    mainWeather.forEach((element) => {
      element.classList.remove('skeleton-text', 'skeleton');
    });
    weatherText.textContent = weatherData.desc;
    humidityText.textContent = `Humidity: ${weatherData.humidity} %`;
    windText.textContent = `Wind: ${weatherData.windSpeed} km/h`;
  }
  return { setSearchResult };
})();

const displayJp = (() => {
  function setSearchResult(weatherData) {
    if (!weatherData) return;
    weatherText.textContent = '';
    humidityText.textContent = '';
    windText.textContent = '';
    locationText.textContent = `${weatherData.area}地方・${weatherData.city}市`;
    timeText.textContent = `${moment(new Date(weatherData.date))
      .locale('ja')
      .format('YYYY年MMMDo')} | ${weatherData.dateLabel}の天気`;
    if (celsiusTab.classList.contains('active')) {
      if (weatherData.minC && weatherData.maxC !== null) {
        tempText.textContent =
          (parseInt(weatherData.minC) + parseInt(weatherData.maxC)) / 2;
      } else {
        weatherData.minC
          ? (tempText.textContent = weatherData.minC)
          : (tempText.textContent = weatherData.maxC);
      }
      unitText.textContent = '°C';
      feelingText.textContent = `気温：${weatherData.minC}度-${weatherData.maxC}度`;
    } else {
      if (weatherData.minF && weatherData.maxF !== null) {
        tempText.textContent =
          (parseInt(weatherData.minF) + parseInt(weatherData.maxF)) / 2;
      } else {
        weatherData.minC
          ? (tempText.textContent = weatherData.minF)
          : (tempText.textContent = weatherData.maxF);
      }
      unitText.textContent = '°F';
      feelingText.textContent = `気温：${weatherData.minF}°F-${weatherData.maxF}°F`;
    }
    mainWeather.forEach((element) => {
      element.classList.remove('skeleton-text', 'skeleton');
    });
    weatherText.textContent = weatherData.telop;
    if (weatherData.wind !== null) {
      humidityText.textContent = `${weatherData.wind
        .toString()
        .replaceAll('　', ' ')}`;
    }
    if (weatherData.wave !== null) {
      windText.textContent = `波の高さ：${weatherData.wave
        .toString()
        .replaceAll('　', ' ')
        .replaceAll('．', '.')}`;
    }
  }
  return { setSearchResult };
})();

export { display, displayJp };
