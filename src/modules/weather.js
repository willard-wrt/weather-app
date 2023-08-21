const weather = (() => {
  function convertData(data) {
    const {
      location: { name, country, localtime: time },
      current: {
        temp_c: tempC,
        temp_f: tempF,
        feelslike_c: feelsLikeCel,
        feelslike_f: feelsLikeFah,
        humidity,
        wind_kph: windSpeed,
        condition: { text: desc },
      },
    } = data;
    return {
      name,
      country,
      time,
      tempC,
      tempF,
      feelsLikeCel,
      feelsLikeFah,
      humidity,
      windSpeed,
      desc,
    };
  }

  async function getData(city) {
    const endpoint = `https://api.weatherapi.com/v1/current.json?key=0f4960cfc8d04c8f996164334231206&q=${city}&aqi=no`;
    const errorInfo = document.querySelector('#error-info');
    try {
      const response = await fetch(endpoint, { mode: 'cors' });
      if (!response.ok) throw new Error(`City '${city}' not found`);
      const data = convertData(await response.json());
      errorInfo.style.opacity = '0';
      errorInfo.textContent = '';
      return data;
    } catch (error) {
      errorInfo.style.opacity = '1';
      errorInfo.textContent = error;
      return null;
    }
  }
  return { getData };
})();

export default weather;
