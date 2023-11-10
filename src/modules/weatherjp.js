const weatherJp = (() => {
  function convertData(data) {
    const {
      publicTimeFormatted,
      forecasts,
      location: { city, area },
    } = data;
    const {
      date,
      telop,
      dateLabel,
      detail: { wind, wave },
      temperature: { min, max },
    } = forecasts[0];
    const { celsius: minC, fahrenheit: minF } = min;
    const { celsius: maxC, fahrenheit: maxF } = max;
    return {
      publicTimeFormatted,
      city,
      area,
      date,
      telop,
      dateLabel,
      wind,
      wave,
      minC,
      minF,
      maxC,
      maxF,
    };
  }

  async function getData(city) {
    const endpoint = `https://weather.tsukumijima.net/api/forecast?city=${city}`;
    const errorInfo = document.querySelector('#error-info');
    try {
      const response = await fetch(endpoint, { mode: 'cors' });
      if (!city) throw new Error(`情報が取得できませんでした。`);
      const data = convertData(await response.json());
      errorInfo.style.opacity = '0';
      errorInfo.textContent = '';
      return data;
    } catch (error) {
      console.log(error);
      const errorJp = error.toString().replace('Error:', 'エラー通知： ');
      errorInfo.style.opacity = '1';
      errorInfo.textContent = errorJp;
      return null;
    }
  }
  return { getData };
})();

export default weatherJp;
