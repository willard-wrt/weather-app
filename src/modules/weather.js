const weather = (() => {
  function convertData(data) {
    const {
      name: cityName,
      current: {
        temp_c: temperature,
        feelslike_c: feelsLike,
        humidity,
        wind_kmh: windSpeed,
      },
    } = data;
    return { cityName, temperature, feelsLike, humidity, windSpeed };
  }

  async function getData(city) {
    const endpoint = `https://api.weatherapi.com/v1/current.json?key=0f4960cfc8d04c8f996164334231206&q=${city}&aqi=no`;
    try {
      const response = await fetch(endpoint, { mode: 'cors' });
      if (!response.ok) throw new Error(`City ${city} not found`);
      const data = convertData(await response.json());
      return data;
    } catch (error) {
      alert(error);
      return null;
    }
  }
  return { getData };
})();

export default weather;
