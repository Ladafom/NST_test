import { useEffect, useState } from "react";
import {Slider as SliderAntD , ConfigProvider} from "antd";
import useResponsive from "../../hooks/useResponsive";

import './slider.css'

function  Slider({minYear, maxYear, minMonth, maxMonth}) {

  let supportiveMonthsArr = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл','авг', 'сен','окт','ноя', 'дек']
  let supportiveYearArr = [0,1,2,3,4,5,6,7,8,9,10,11]
  const breackpoint = useResponsive([760])

  const [sliderSize, setSliderSize] = useState((maxYear+1 - minYear)*12)
  const [marks, setMarks] = useState('yearsMarks')
  const [isYearsSlider, setIsYearsSlider] = useState(true)
  const [isMonthSlider, setIsMonthSlider] = useState(false)

  const [sliderInfo, setSliderInfo] = useState([])
  const [shiftedRange, setShiftedRange] = useState(null)
  const [range, setRange] = useState(null)

  let yearsArr = []
  let monthsArr = []
  const yearsMarks = {}
  let monthsMarks = {}

  useEffect(()=>{
    setShiftedRange(null)
    if (isYearsSlider) {
      const slider = establishMarkers(maxYear, minYear, 'yearsMarks')
      setSliderInfo(slider)
    }
    if (isMonthSlider) {
      if(sliderInfo[1].length - 1 === range[1]){
        console.log('r')
        const slider = establishMarkers(sliderInfo[1][range[1]] - 1 , sliderInfo[1][range[0]], 'monthsMarks')
        setSliderInfo(slider)
      } else {
        const slider = establishMarkers(sliderInfo[1][range[1]] , sliderInfo[1][range[0]], 'monthsMarks')
        setSliderInfo(slider)
      }
    }
  },[isYearsSlider,isMonthSlider,  minYear, maxYear,minMonth,maxMonth])
  useEffect(()=>{
    setRange([minMonth,maxMonth])
  },[minYear, maxYear,minMonth,maxMonth])

  function establishMarkers(max, min, marks){

    setSliderSize((max+1 - min)*12)

    for (let i = min; i <= max + 1; i++) {
      yearsMarks[(i-min)*12]=i

      if( i <= max){
        monthsArr = monthsArr.concat(supportiveMonthsArr)
        yearsArr = yearsArr.concat(supportiveYearArr.fill(i))
      } else {
        monthsArr.push('янв')
        yearsArr.push(max + 1)
      }
    }

    if(marks === 'monthsMarks'){
      const monthShift = (min - minYear)*12
      setShiftedRange([range[0]-monthShift, range[1]-monthShift])

        monthsArr.map((month, index) => {
          if(month === 'янв') {
            monthsMarks[index] = yearsArr[index]
          } else {
            monthsMarks[index] = month
          }
        })
    }

    return [yearsMarks, yearsArr, monthsArr, monthsMarks]
  }

  const onChange = (value) => {
    setRange(value)
    setShiftedRange(value)
  };

  function showYearsSlider(){
    setIsYearsSlider(true)
    setIsMonthSlider(false)
    setMarks('yearsMarks')
  }
  function showMonthsSlider(){
    setIsYearsSlider(false)
    setIsMonthSlider(true)
    setMarks('monthsMarks')
  }

  const formatter = (value) => `${sliderInfo[2][value]} ${sliderInfo[1][value]}`;

  return (
    <div className="slider-container">

      <ConfigProvider
        theme={{
          components: {
            Slider: {
              trackBg:'#6FB6EC',
              trackHoverBg:'#3A86BF'
            },
          },
        }}
      >
        <SliderAntD
          range
          min={0}
          max={sliderSize}
          marks={marks === 'yearsMarks' ? sliderInfo[0] : sliderInfo[3]}
          defaultValue={[3,44]}
          value={shiftedRange || range || [minMonth,maxMonth]}
          onChange={onChange}
          tooltip={{
            formatter,
            color:'#3A86BF'
          }}
          vertical={breackpoint === 0 ? true : false}
        />
      </ConfigProvider>

      <div className='slider-container__toggle-btns'>
        <a onClick={showYearsSlider} className={isYearsSlider ? 'active' : ''}>
          Все года
        </a>
        <a onClick={showMonthsSlider} className={isMonthSlider ? 'active' : ''}>
          Mесяца
        </a>
      </div>
    </div>
  );
}

export default  Slider;