const display = (() => {
  function setSearchResult(weatherData) {
    if (!weatherData) return;
    console.log(weatherData.temperature);
    console.log(weatherData.feelsLike);
  }
  return { setSearchResult };
})();

export default display;
