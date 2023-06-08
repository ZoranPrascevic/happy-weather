import tools from "../utils/tools";

const today = new Date();
// Function to get date range
function getDateRange() {
  // Setting last year's date to October 1st
  const lastYear = new Date(today.getFullYear() - 1, 9, 1);
  // Setting max date to October 1st of current year
  const maxDate = new Date(today.getFullYear(), 9, 1);
  return {
    min: tools.formatDate(lastYear),
    max: tools.formatDate(today > maxDate ? maxDate : today),
  };
}

const SowDayPicker = ({ sowDay, setSowDay }) => {
  const { min, max } = getDateRange();
  return (
    <div className="flex items-center gap-2">
      <div>Sow Date:</div>
      <input
        type="date"
        name="sowday"
        id="sowday"
        value={tools.formatDate(sowDay)}
        onChange={setSowDay}
        required={true}
        min={min}
        max={max}
        className="p-1 rounded outline-none border-2 border-blue-500 uppercase w-36 clear-none"
      />
    </div>
  );
};

export default SowDayPicker;
