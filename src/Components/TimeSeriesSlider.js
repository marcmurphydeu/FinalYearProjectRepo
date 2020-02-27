import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Slider, Switch } from 'antd';
export default function TimeSeriesSlider (props)  {

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

    const [enabled, setEnabled] = useState(false)
    return (
        <div id = "sliderDiv">
          Time series: <Switch size="small" checked={enabled} onChange={() => setEnabled(!enabled)} />
          {enabled ? <Slider defaultValue={2018} marks={marks} min = {1960} max = {2018} onChange = {(a)=> (props.setSelectedYears([a]))} disabled={!enabled} /> : ""}
        </div>
      );
}



          