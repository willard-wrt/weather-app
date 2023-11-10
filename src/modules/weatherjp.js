const weatherJp = (() => {
  function convertData(data) {
    const {
      publicTimeFormatted,
      forecasts,
      location: { city },
    } = data;
    const { date, telop } = forecasts[0];
    return {
      publicTimeFormatted,
      city,
      date,
      telop,
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
