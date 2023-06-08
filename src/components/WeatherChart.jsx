import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts"; // Bundle size around 300kb
import tools from "../utils/tools";

const WeatherChart = ({ lineData }) => {
  return (
    <div className="h-full relative">
      <div className="absolute left-0 top-1/2 -translate-y-9 -translate-x-7 -rotate-90 text-sm font-medium">
        Temperature (℃)
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-9 translate-x-10 rotate-90 text-sm font-medium">
        Precipitation (mm/hr)
      </div>
      <ResponsiveContainer height={"100%"} width={"100%"}>
        <LineChart
          data={lineData.daysData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="1" />
          {/* Add an X-axis displaying dates */}
          <XAxis dataKey="date" />
          {/* Add a left Y-axis displaying temperature */}
          <YAxis yAxisId="left" tickCount={10} />
          {/* Add a right Y-axis displaying precipitation */}
          <YAxis yAxisId="right" orientation="right" tickCount={10} />
          {/* Add a line for temperature data <5℃ */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temp"
            stroke="#e73845"
          />
          {/* Add a line for precipitation data */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="preci"
            stroke="#1d3558"
          />
          {/* Add a line for temperature data >5℃ */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="dtemp"
            stroke="#84cc16"
          />
          <Tooltip formatter={tools.tooltipFormatter} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;
