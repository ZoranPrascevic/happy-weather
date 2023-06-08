const tools = {
  // Format date to "YYYY-MM-DD"
  formatDate: (date) => {
    return date.toISOString().slice(0, 10);
  },
  // Get the date range between startDate and today
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
        from: tools.formatDate(starting),
        to: tools.formatDate(today > october1 ? october1 : today),
      };
    } else {
      console.log(
        "Today is not between last October 1st and this October 1st, or it is not before today."
      );
      return false;
    }
  },
  // Process weather data to calculate daily averages and fill gaps between sow day and starting day of API data
  processWeatherData: (weatherData, sowDay) => {
    let daysData = [];
    let currentDay = weatherData[0][0].slice(0, 10);
    let currentTempSum = 0;
    let currentPreciSum = 0;
    let currentLng = 0;
    weatherData.forEach(([day, temp, preci]) => {
      if (day.slice(0, 10) === currentDay) {
        currentTempSum += temp;
        currentPreciSum += preci;
        currentLng++;
      } else {
        const currentTempAvg = parseFloat(
          (currentTempSum / currentLng).toFixed(2)
        );
        const currentPreciAvg = parseFloat(
          (currentPreciSum / currentLng).toFixed(2)
        );
        daysData.push({
          date: new Date(currentDay).toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
          }),
          temp:
            currentTempAvg < 5
              ? currentTempAvg
              : daysData[daysData.length - 1] &&
                daysData[daysData.length - 1].temp &&
                !daysData[daysData.length - 1].dtemp
              ? currentTempAvg
              : null,
          preci: currentPreciAvg,
          dtemp:
            currentTempAvg >= 5
              ? currentTempAvg
              : daysData[daysData.length - 1] &&
                daysData[daysData.length - 1].dtemp &&
                !daysData[daysData.length - 1].temp
              ? currentTempAvg
              : null,
        });
        currentDay = day.slice(0, 10);
        currentTempSum = temp;
        currentPreciSum = preci;
        currentLng = 1;
      }
    });
    if (tools.checkDateGap(sowDay, daysData[0].date)) {
      daysData = tools.fillDateGap(sowDay, daysData[0].date, daysData);
    }
    return daysData;
  },
  // Fill date gaps with empty data (temp: 0, preci: 0)
  fillDateGap: (startDay, endDay, srcData) => {
    const startDate = new Date(startDay);
    const endDate = new Date(endDay);
    const gapData = Array.from(
      { length: Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) },
      (_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        return {
          date: date.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
          }),
          temp: 0,
          preci: 0,
        };
      }
    );
    return [...gapData, ...srcData];
  },
  // Check if there is a date gap between sow day and API data's start day
  checkDateGap: (startDay, endDay) => {
    const date1 = new Date(startDay);
    const date2 = new Date(endDay);

    const diffInDays = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));

    return diffInDays > 0;
  },
  // Format tooltip values for display
  tooltipFormatter: (value, name) => {
    let formattedName = "";
    let formattedValue = "";
    switch (name) {
      case "temp":
        formattedName = value >= 5 ? null : "Temperature";
        formattedValue = value >= 5 ? null : value + "℃";
        break;
      case "preci":
        formattedName = "Precipitation";
        formattedValue = value + "mm/hr";
        break;
      case "dtemp":
        formattedName = value < 5 ? null : "Degree Day";
        formattedValue =
          value < 5 ? null : `${value}℃(+${(value - 5).toFixed(2)})`;
        break;

      default:
        break;
    }
    return [formattedValue, formattedName];
  },
};

export default tools;
