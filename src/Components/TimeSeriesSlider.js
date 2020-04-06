import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Slider, Switch } from 'antd';

// Slider used for time-series visualizations.
// Uses the Ant design slider component. https://ant.design/components/slider/
export default function TimeSeriesSlider (props)  {
  // Represents the upper and lower bound of the slider
  var start = props.start
  var end = props.end  
  const marks = {}
    marks[props.start] = {
      style: {
        color: 'white',
      },
      label: props.start,
    }
    marks[props.end] = {
      style: {
        color: 'white',
      },
      label: props.end,
    }
    
    // Toggle for enabling or disabling slider
    const [enabled, setEnabled] = useState(props.type?true:false)
    const timeSeries = <div>Time series: <Switch size="small" checked={enabled} onChange={() => setEnabled(!enabled)} /></div>
    const filter = <div><Switch size="small" checked={enabled} onChange={() => setEnabled(!enabled)} /></div>
    return (
        <div id = {props.type ? "limitSlider":"sliderDiv"}>
          {props.type ? filter : timeSeries}
          
          {enabled ? <Slider defaultValue={end/2} marks={marks} min = {start} max = {end} onChange = {(a)=> (props.setSelectedValues([a]))} disabled={!enabled} /> : ""}
        </div>
      );
}



          