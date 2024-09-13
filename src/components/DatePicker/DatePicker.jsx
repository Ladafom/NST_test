import{ DatePicker as DatePickerAntD, ConfigProvider } from "antd";
import './date-picker.css'

function DatePicker({onCalendarChange}) {

  const { RangePicker } = DatePickerAntD;

  return (
    <div className="date-picker">
      <ConfigProvider
        theme={{
          components: {
            DatePicker: {
              activeBorderColor:'#3A86BF',
              hoverBorderColor:'#3A86BF'
            },
          },
        }}
      >
        <RangePicker
          picker="month"
          onCalendarChange={onCalendarChange}
        />
      </ConfigProvider>
    </div>
  );
}

export default DatePicker;