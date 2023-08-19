import moment from 'moment';

const locationText = document.querySelector('.location-info');
const timeText = document.querySelector('.time-info');

const display = (() => {
  function setSearchResult(weatherData) {
    if (!weatherData) return;
    console.log(locationText);
    locationText.textContent = `${weatherData.name}, ${weatherData.country}`;
    timeText.textContent = moment(new Date(weatherData.time)).format(
      'MMMM Do YYYY | h:mm a'
    );
    console.log(`${weatherData.name}, ${weatherData.country}`);
    console.log(weatherData.desc);
    console.log(timeText);
  }
  return { setSearchResult };
})();

export default display;
