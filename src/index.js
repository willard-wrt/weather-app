// import './style.css';
import weather from './modules/weather';
import display from './modules/display';

console.log('webpack is working');

const searchCity = document.querySelector('#search');
const searchBtn = document.querySelector('.search-submit');
const celsiusTab = document.querySelector('.setting-celsius');
const fahrenheitTab = document.querySelector('.setting-fahrenheit');

searchBtn.addEventListener('click', async () => {
  const weatherData = await weather.getData(searchCity.value);
  display.setSearchResult(weatherData);
});

celsiusTab.addEventListener('click', () => {
  celsiusTab.classList.add('active');
  fahrenheitTab.classList.remove('active');
});
fahrenheitTab.addEventListener('click', () => {
  fahrenheitTab.classList.add('active');
  celsiusTab.classList.remove('active');
});
