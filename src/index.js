// import './style.css';
import weather from './modules/weather';
import display from './modules/display';

console.log('webpack is working');

const searchCity = document.querySelector('#search');
const searchForm = document.querySelector('#search-form');
const searchBtn = document.querySelector('.search-submit');
const celsiusTab = document.querySelector('.setting-celsius');
const fahrenheitTab = document.querySelector('.setting-fahrenheit');
const titleLogo = document.querySelector('.top-title-container');
const errorInfo = document.querySelector('#error-info');
const langOpts = document.querySelector('#langs');
const langLabel = document.querySelector('#lang-label');
// const mainHeading = document.querySelector('.main-heading');

langOpts.addEventListener('change', (e) => {
  if (e.target.value == '日本語') {
    langLabel.textContent = '地域 (API): ';
    searchCity.placeholder = '県庁所在地名を入力してくだい';
  }
  if (e.target.value == 'English') {
    langLabel.textContent = 'Region (API): ';
    searchCity.placeholder = 'Search location (City)';
  }
});

console.log(langOpts);

searchForm.addEventListener('click', (e) => {
  e.preventDefault();
});

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

function getIp(url) {
  return fetch(url).then((res) => res.json());
}

setTimeout(() => {
  getIp('https://api.ipapi.is').then((data) => {
    console.log(data.location.state);
    (async () => {
      const weatherData = await weather.getData(data.location.state);
      display.setSearchResult(weatherData);
    })();
  });
}, 5000);
