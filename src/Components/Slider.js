import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Slider, Switch } from 'antd';

// Update the list of years with the range selected by the user
function setYears (setSelectedYears, rangeOfYears){
    let years = []
    for (var i = rangeOfYears[0]; i <= rangeOfYears[1]; i++) {
        years.push(i);
    }
    setSelectedYears(years)
}

// Slider from Ant design specifically for selecting a range of years
export default function YearRangeSlider (props)  {
    const [enabled, setEnabled] = useState(false)
    
    // The lower and upper bound in the slider
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
    // Disabling the toggle empties the list of years
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


          