// import './style.css';
import weather from './modules/weather';
import display from './modules/display';

console.log('webpack is working');

const weatherData = await weather.getData('bangkok');
display.setSearchResult(weatherData);
