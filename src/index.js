// import './style.css';
import weather from './modules/weather';
import display from './modules/display';

console.log('webpack is working');

const searchCity = document.querySelector('#search');
const searchBtn = document.querySelector('.search-submit');
const celsiusTab = document.querySelector('.setting-celsius');
const fahrenheitTab = document.querySelector('.setting-fahrenheit');
const titleLogo = document.querySelector('.top-title-container');
const errorInfo = document.querySelector('#error-info');
// const mainHeading = document.querySelector('.main-heading');

searchBtn.addEventListener('click', searchData);

celsiusTab.addEventListener('click', () => {
  celsiusTab.classList.add('active');
  fahrenheitTab.classList.remove('active');
});
fahrenheitTab.addEventListener('click', () => {
  fahrenheitTab.classList.add('active');
  celsiusTab.classList.remove('active');
});
titleLogo.addEventListener('click', () => {
  window.location.reload();
});

async function searchData() {
  // mainHeading.style.opacity = '0'; // Toggle this for smooth transition with slow network
  if (searchCity.value === '') {
    errorInfo.style.opacity = '1';
    errorInfo.textContent =
      'Error: City name is required; search field must be filled.';
  } else {
    const weatherData = await weather.getData(searchCity.value);
    display.setSearchResult(weatherData);
  }
}

/* Temporarily disabled until further tested...
function getIp(url) {
  return fetch(url).then((res) => res.json());
}

getIp(
  'http://api.ipstack.com/check?access_key=d1fdcb2a51612d357777c48a72fca630'
).then((data) => {
  console.log(data.city);
  (async () => {
    const weatherData = await weather.getData(data.city);
    display.setSearchResult(weatherData);
  })();
}); */
