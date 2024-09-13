import{ DatePicker as DatePickerAntD } from "antd";

function DatePicker({onCalendarChange}) {

  const { RangePicker } = DatePickerAntD;

  return (
    <RangePicker
      picker="month"
      onCalendarChange={onCalendarChange}
    />
  );
}

export default DatePicker;