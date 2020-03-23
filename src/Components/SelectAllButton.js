import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Switch } from 'antd';
import {getData} from '../Controllers/DataController';

export default function SelectAllButton (props)  {
    const [enabled, setEnabled] = useState(false)

    // When the switch is enabled, the appropriate 
    // data is received from the controller and, with it,
    // the list is updated to include all values. 
    const toggle = () => {
      setEnabled(!enabled);
      if (enabled===false){
        switch(props.type) {
            case "properties":
                getData('properties').then((result)=>{
                    let values = result.map(function(key){
                        return key[0];
                    });
                    props.setSelectedValues(values)
                })
                break;
            case "countries":
                getData('countries').then((result)=>{
                    let values = result.map(function(key){
                        return key[0];
                    });
                    props.setSelectedValues(values)
                })
                break;
                
            //The following cases don't necessarily need to call the database
            case "years":
                let years_list = [];
                for (var i = 1960; i <= 2018; i++) {
                    years_list.push(i);
                }
                props.setSelectedValues(years_list)
                break;
            case "limit":
                let limit_list = [];
                for (var l = 0; l <= 500; l++) {
                    limit_list.push(l);
                }
                props.setSelectedValues(limit_list)
                break;
            case "orderBy":
                let filters = ['ASC', 'DESC'];
                props.setSelectedValues(filters)
                break;
            case "visualization":
                let types = ['2D', '3D', 'heatMap']
                props.setSelectedValues(types);
                break;
            default:
              alert('Invalid props type')
          }
      }
      else{
          props.setSelectedValues([])
      }
    }

    return (
        <div id = "sliderDiv">
          Select All: <Switch size="small" checked={enabled} onChange={() => toggle()} />
        </div>
      );
}


          