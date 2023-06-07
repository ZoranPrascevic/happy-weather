const tools = {
  getRange: (startDate) => {
    const starting = new Date(startDate);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const october1 = new Date(today.getFullYear(), 9, 1);
    const lastOctober1 = new Date(today.getFullYear() - 1, 9, 1);
    if (
      starting > lastOctober1 &&
      starting < october1 &&
      starting < yesterday
    ) {
      return {
        from: starting.toISOString().slice(0, 10),
        to: (today > october1 ? october1 : today).toISOString().slice(0, 10),
      };
    } else {
      console.log(
        "Today is not between last October 1st and this October 1st, or it is not before today."
      );
      return false;
    }
  },
  processWeatherData: (weatherData, sowDay) => {
    let daysData = [];
    let currentDay = weatherData[0][0].slice(0, 10);
    let currentTempAvg = 0;
    let currentPreciAvg = 0;
    let currentLng = 0;
    weatherData.forEach(([day, temp, preci]) => {
      if (day.slice(0, 10) === currentDay) {
        currentTempAvg =
          (currentTempAvg * currentLng + temp) / (currentLng + 1);
        currentPreciAvg =
          (currentPreciAvg * currentLng + preci) / (currentLng + 1);
        currentLng++;
      } else {
        currentTempAvg = parseFloat(currentTempAvg.toFixed(2));
        currentPreciAvg = parseFloat(currentPreciAvg.toFixed(2));
        daysData.push({
          date: currentDay,
          temp:
            currentTempAvg < 5
              ? currentTempAvg
              : daysData[daysData.length - 1] &&
                daysData[daysData.length - 1].temp &&
                !daysData[daysData.length - 1].dtemp
              ? currentTempAvg
              : null,
          preci:
            currentTempAvg < 5
              ? currentPreciAvg
              : daysData[daysData.length - 1] &&
                daysData[daysData.length - 1].temp &&
                !daysData[daysData.length - 1].dtemp
              ? currentPreciAvg
              : null,
          dtemp:
            currentTempAvg >= 5
              ? currentTempAvg
              : daysData[daysData.length - 1] &&
                daysData[daysData.length - 1].dtemp &&
                !daysData[daysData.length - 1].temp
              ? currentTempAvg
              : null,
          dpreci:
            currentTempAvg >= 5
              ? currentPreciAvg
              : daysData[daysData.length - 1] &&
                daysData[daysData.length - 1].dtemp &&
                !daysData[daysData.length - 1].temp
              ? currentPreciAvg
              : null,
        });
        currentDay = day.slice(0, 10);
        currentTempAvg = temp;
        currentPreciAvg = preci;
        currentLng = 1;
      }
    });
    if (tools.checkDateGap(sowDay, daysData[0].date)) {
      daysData = tools.fillDateGap(sowDay, daysData[0].date, daysData);
    }
    return daysData;
  },
  fillDateGap: (startDay, endDay, srcData) => {
    const startDate = new Date(startDay);
    const endDate = new Date(endDay);
    const gapData = [];
    for (
      let date = startDate;
      date < endDate;
      date.setDate(date.getDate() + 1)
    ) {
      gapData.push({
        date: date.toISOString().slice(0, 10),
        temp: 0,
        preci: 0,
      });
    }
    return [...gapData, ...srcData];
  },
  checkDateGap: (startDay, endDay) => {
    const date1 = new Date(startDay);
    const date2 = new Date(endDay);

    const diffInDays = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));

    return diffInDays > 0;
  },
};

export default tools;
