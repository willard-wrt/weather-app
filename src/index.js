// import './style.css';
import weather from './modules/weather';
import display from './modules/display';

console.log('webpack is working');

const searchCity = document.querySelector('#search');
const searchBtn = document.querySelector('.search-submit');
searchBtn.addEventListener('click', async () => {
  const weatherData = await weather.getData(searchCity.value);
  display.setSearchResult(weatherData);
});
