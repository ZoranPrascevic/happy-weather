const payload = [
  {
    value: "Temperature",
    color: "text-[#e73845]",
    bgColor: "stroke-[#e73845]",
  },
  {
    value: "Precipitation",
    color: "text-[#1d3558]",
    bgColor: "stroke-[#1d3558]",
  },
  {
    value: "Degree Days",
    color: "text-[#84cc16]",
    bgColor: "stroke-[#84cc16]",
  },
];

const CustomLegend = () => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-3 my-2">
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 32 32">
            <title></title>
            <desc></desc>
            <path
              strokeWidth="4"
              fill="none"
              className={`${item.bgColor}`}
              d="M0,16h10.666666666666666
        A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
        H32M21.333333333333332,16
        A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
            ></path>
          </svg>
          <div className={`text-sm ${item.color}`}>{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
