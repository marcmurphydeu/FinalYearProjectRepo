import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Slider, Switch } from 'antd';

export default function TimeSeriesSlider (props)  {
    const [enabled, setEnabled] = useState(false)
    return (
        <div id = "sliderDiv">
          Time series: <Switch size="small" checked={enabled} onChange={() => setEnabled(!enabled)} />
          {enabled ? <Slider defaultValue={2018} min = {1960} max = {2018} onChange = {(a)=> (props.setSelectedYears([a]))} disabled={!enabled} /> : ""}
        </div>
      );
}


          