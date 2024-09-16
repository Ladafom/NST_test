import { useEffect, useState } from "react";
import {Slider as SliderAntD , ConfigProvider} from "antd";
import useResponsive from "../../hooks/useResponsive";

import { supportiveMonthsArr, supportiveYearArr } from "./extraDataKeeper";
import './slider.css'
import './antd-slider.css'

function  Slider({minYear, maxYear, minMonth, maxMonth}) {

  const breackpoint = useResponsive([760])

  const [sliderSize, setSliderSize] = useState((maxYear+1 - minYear)*12)
  const [isYearsSlider, setIsYearsSlider] = useState(true)
  const [isMonthSlider, setIsMonthSlider] = useState(false)

  const [sliderInfo, setSliderInfo] = useState([])
  const [shiftedRange, setShiftedRange] = useState(null)
  const [range, setRange] = useState([minMonth,maxMonth])

  let yearsArr = []
  let monthsArr = []
  const yearsMarks = {}
  let monthsMarks = {}

  useEffect(()=>{
    setShiftedRange(null)

    if (isYearsSlider) {
      const slider = establishMarkers(maxYear, minYear)
      setSliderInfo(slider)
    }

    if (isMonthSlider) {
      const min = sliderInfo[1][range[0]]
      const max =sliderInfo[1][range[1]]

      if(sliderInfo[1].length - 1 === range[1]){
        const slider = establishMarkers(max - 1, min)
        setSliderInfo(slider)
      } else {
        const slider = establishMarkers(max, min)
        setSliderInfo(slider)
      }
    }

  },[isYearsSlider,isMonthSlider, minYear, maxYear])

  useEffect(()=>{
    setRange([minMonth,maxMonth])
    setIsYearsSlider(true)
    setIsMonthSlider(false)
  },[minYear, maxYear, minMonth, maxMonth])

  function establishMarkers(max, min){

    setSliderSize((max+1 - min)*12)

    for (let i = min; i <= max + 1; i++) {
      yearsMarks[(i-min)*12]={
        style: {
          color:'#434343'
        },
        label:i
      }

      if( i <= max){
        monthsArr = monthsArr.concat(supportiveMonthsArr)
        yearsArr = yearsArr.concat(supportiveYearArr.fill(i))
      } else {
        monthsArr.push('январь')
        yearsArr.push(max + 1)
      }
    }

    if(isMonthSlider){
      const monthShift = (min - minYear)*12
      setShiftedRange([range[0]-monthShift, range[1]-monthShift])

      if (max-min >=10){
        monthsOverflowHandler(12)
      } else if (max-min >=7){
        monthsOverflowHandler(6)
      } else if (max-min >=5){
        monthsOverflowHandler(4)
      } else if (max-min >=2){
        monthsOverflowHandler(3)
      } else if (max-min >=0){
        monthsOverflowHandler(1)
      }
    }

    return [yearsMarks, yearsArr, monthsArr, monthsMarks]
  }

  function monthsOverflowHandler(divider){
    monthsArr.map((month, index) => {
      if(month === 'январь') {
        monthsMarks[index] = {
          style: {
            color:'#434343'
          },
          label: yearsArr[index]
        }
      } else if (index % divider ===0) {
        monthsMarks[index] = {
          style: {
            color:'#999'
          },
          label:month.slice(0,3)
        }
      }
    })
  }

  const onChange = (value) => {
    setRange(value)
    setShiftedRange(value)
  };

  function showYearsSlider(){
    setIsYearsSlider(true)
    setIsMonthSlider(false)
  }
  function showMonthsSlider(){
    setIsYearsSlider(false)
    setIsMonthSlider(true)
  }

  if(sliderInfo[0]) {
    const formatter = (value) => <div className="slider-tooltip">{sliderInfo[2][value]} <br/> {sliderInfo[1][value]}</div>;

    return (
      <div className="slider-container">

        <ConfigProvider
          theme={{
            components: {
              Slider: {
                trackBg:'#6FB6EC',
              },
            },
          }}
        >
          <SliderAntD
            range
            min={0}
            max={sliderSize}
            marks={isYearsSlider ? sliderInfo[0] : sliderInfo[3]}
            defaultValue={[3,44]}
            value={shiftedRange || range}
            onChange={onChange}
            tooltip={{
              formatter,
              open,
              color:'#FFF',
              placement:'top',
              zIndex:1,
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

}

export default  Slider;