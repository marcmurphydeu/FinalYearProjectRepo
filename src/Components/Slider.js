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
    return (
        <div id = "sliderDiv">
          Range: <Switch size="small" checked={enabled} onChange={() => setEnabled(!enabled)} />
          {enabled ? <Slider tooltipVisible = {true} min = {1960} max = {2018} range defaultValue={[2016, 2018]} onChange = {(a)=> setYears(props.setSelectedYears, a)} disabled={!enabled} /> : "" }
        </div>
      );
}


          