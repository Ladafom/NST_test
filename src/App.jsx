import { useState } from 'react'
import Slider from './components/Slider/Slider'
import DatePicker from './components/DatePicker/DatePicker'

function App() {

  const [dateRange, setDateRange] = useState({
    minYear : 2014,
    maxYear: 2017,
    minMonth: 3,
    maxMonth : 2,
  })

  function onCalendarChange(value){
    if(value[0] && value[1]){
      const startDate = `${value[0].$y}-${value[0].$M}`
      const endDate = `${value[1].$y}-${value[1].$M}`
      setDateRange(
        {
          minYear : Number(startDate.split('-')[0]),
          maxYear: Number(endDate.split('-')[0]),
          minMonth: Number(startDate.split('-')[1]),
          maxMonth : Number(endDate.split('-')[1]),
        }
      )
    }
  }

  return (
    <>
      <DatePicker
        onCalendarChange={onCalendarChange}
      />
      <Slider
        minYear={dateRange.minYear}
        maxYear={dateRange.maxYear}
        minMonth = {dateRange.minMonth}
        maxMonth = {dateRange.maxMonth + (dateRange.maxYear - dateRange.minYear) *12}
      />
    </>
  )
}

export default App
