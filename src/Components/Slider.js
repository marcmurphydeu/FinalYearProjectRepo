import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Slider, Switch } from 'antd';

function setYears (setSelectedYears, rangeOfYears){
    let years = []
    console.log(rangeOfYears[0])
    console.log(rangeOfYears[1])
    for (var i = rangeOfYears[0]; i <= rangeOfYears[1]; i++) {
        years.push(i);
    }
    
    setSelectedYears(years)
}

export default function YearRangeSlider (props)  {
    const [enabled, setEnabled] = useState(false)
    const marks = {
      1960: {
        style: {
          color: 'white',
        },
        label: 1960,
      },
      2018: {
        style: {
          color: 'white',
        },
        label: 2018,
      },
    };
    const toggle = () => {
      setEnabled(!enabled);
      if (enabled===true){
        props.setSelectedYears([])
      }
    }

    return (
        <div id = "sliderDiv">
          Range: <Switch size="small" checked={enabled} onChange={() => toggle()} />
          {enabled ? <Slider size="large"  min = {1960} max = {2018} range marks={marks} defaultValue={[2016, 2018]} onAfterChange = {(a)=> setYears(props.setSelectedYears, a)} disabled={!enabled} /> : "" }
        </div>
      );
}


          