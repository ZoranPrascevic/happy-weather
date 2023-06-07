import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import API from "./utils/API";
import tools from "./utils/tools";

const App = ({ paramData }) => {
  const [dateRange, setDateRange] = useState(null);
  const [lineData, setLineData] = useState({
    daysData: [],
  });
  useEffect(() => {
    const dispRange = tools.getRange(paramData.sow);
    setDateRange(dispRange);
  }, []);

  useEffect(() => {
    if (dateRange) {
      API.getWeather(paramData.id, { pov: "growth", ...dateRange })
        .then((res) => tools.processWeatherData(res, paramData.sow))
        .then((daysData) => {
          setLineData({ daysData });
        });
    }
  }, [dateRange]);

  return (
    <>
      {lineData.daysData.length && (
        <ResponsiveContainer minHeight={400} width={"100%"}>
          <LineChart
            data={lineData.daysData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="1" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temp"
              stroke="#457b9d"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="preci"
              stroke="#1d3558"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="dtemp"
              stroke="#e73845"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="dpreci"
              stroke="#1d3558"
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default App;
