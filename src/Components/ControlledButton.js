import React, {useState, useEffect} from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import displayVisualization,{displayFromQuery} from '../Controllers/VisualController';


export default function ToggleButtonGroupControlled(props) {
    // const [value, setValue] = useState(props.visualization);
    const [visualization, setVisualization] = useState('2D')
    useEffect(()=>{
        if (!props.customQuery){
            displayVisualization(visualization, 
                props.selectedCountries, 
                props.selectedProperties,
                props.selectedYears,
                props.limit,
                props.filter,
                props.setSelectedYears)
        }else{
            displayFromQuery(props.customQuery)
        }
        
    });  
    return (
      <ToggleButtonGroup type="checkbox" value={visualization} >
        <ToggleButton className="controllerButton" value={"2D"} onClick={()=>{setVisualization('2D')}} >2D</ToggleButton>
        <ToggleButton className="controllerButton" value={"3D"} onClick={(val)=>{setVisualization('3D')}}>3D</ToggleButton>
        <ToggleButton className="controllerButton" value={"Map"} onClick={(val)=>{setVisualization('Map')}}>Map</ToggleButton>
      </ToggleButtonGroup>
    );
  }