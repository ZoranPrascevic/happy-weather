import { useEffect, useState } from "react";
import API from "./utils/API";
import tools from "./utils/tools";
import CustomLegend from "./components/CustomLegend";
import SowDayPicker from "./components/SowDayPicker";
import WeatherChart from "./components/WeatherChart";
import ErrorChart from "./components/ErrorChart";
import Loader from "./components/Loader";

const App = ({ paramData }) => {
  const [dateRange, setDateRange] = useState(null);
  const [lineData, setLineData] = useState({
    daysData: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [sowDay, setSowDay] = useState(new Date(paramData.sow || Date()));
  // Update state when paramData.sow changes
  useEffect(() => {
    if (!paramData.sow || !paramData.id) {
      setIsError(true);
    } else {
      updateSowDay(paramData.sow);
    }
  }, [paramData]);
  // Fetch weather data when dateRange changes
  useEffect(() => {
    if (dateRange) {
      setIsError(false);
      setIsLoading(true);
      API.getWeather(paramData.id, { pov: "growth", ...dateRange })
        .then((res) => tools.processWeatherData(res, paramData.sow))
        .then((daysData) => {
          setLineData({ daysData });
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsError(true);
          setIsLoading(false);
        });
    } else {
      setLineData({ daysData: [] });
      setIsError(true);
    }
  }, [dateRange]);

  const updateSowDay = (dayData) => {
    const dispRange = tools.getRange(dayData);
    setDateRange(dispRange);
    setSowDay(new Date(dayData));
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-2 items-center p-4 sm:px-14 flex-wrap">
        <SowDayPicker
          sowDay={sowDay}
          setSowDay={(e) =>
            updateSowDay(new Date(e.target.value || paramData.sow))
          }
        />
        <CustomLegend />
      </div>
      <div className="w-full h-72 sm:h-96 md:h-[28rem] lg:h-[32rem] relative">
        {lineData.daysData.length > 0 ? (
          <WeatherChart lineData={lineData} />
        ) : null}
        {isError ? <ErrorChart /> : null}
        {isLoading ? <Loader /> : null}
      </div>
    </>
  );
};

export default App;
