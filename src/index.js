// import './style.css';
import weather from './modules/weather';
import weatherJp from './modules/weatherjp';
import { display, displayJp } from './modules/display';
import japanCities from './modules/cities';

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

langOpts.addEventListener('change', async (e) => {
  if (e.target.value == 'Jp') {
    clearTimeout(autoSearch);
    langLabel.textContent = '地域 (API): ';
    searchCity.placeholder = '都市名を入力してください';
    const weatherDataJp = await weatherJp.getData(japanCities['東京']);
    displayJp.setSearchResult(weatherDataJp);
  }
  if (e.target.value == 'English') {
    location.reload();
    langLabel.textContent = 'Region (API): ';
    searchCity.placeholder = 'Search location (City)';
  }
});

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
  clearTimeout(autoSearch);
  if (langOpts.value === 'English') {
    if (searchCity.value === '') {
      errorInfo.style.opacity = '1';
      errorInfo.textContent =
        'Error: City name is required; search field must be filled.';
    } else {
      const weatherData = await weather.getData(searchCity.value);
      display.setSearchResult(weatherData);
    }
  } else if (langOpts.value === 'Jp') {
    if (searchCity.value === '') {
      errorInfo.style.opacity = '1';
      errorInfo.textContent = 'ご注意： 検索バーに都市名が必要です（例・東京)';
    } else {
      const weatherDataJp = await weatherJp.getData(
        japanCities[searchCity.value]
      );
      displayJp.setSearchResult(weatherDataJp);
      console.log(weatherDataJp);
    }
  }
}

function getIp(url) {
  return fetch(url).then((res) => res.json());
}

const autoSearch = setTimeout(() => {
  getIp('https://api.ipapi.is').then((data) => {
    console.log(data.location.state);
    (async () => {
      const weatherData = await weather.getData(data.location.city);
      display.setSearchResult(weatherData);
      errorInfo.style.opacity = '1';
      errorInfo.textContent =
        '* This location is determined by your IP address.';
    })();
  });
}, 5000);
