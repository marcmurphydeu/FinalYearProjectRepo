import React, {useState, useEffect} from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import displayVisualization,{drawFromCypher} from '../Controllers/VisualController';

// This component gets rendered when a change in the form occurs.
// The form's data is passed through the props to display the graph 
// by invoking "displayVisualization". The default value for the component is 2D visualization.
export default function VisualizationToggle(props) {
    const [visualization, setVisualization] = useState('2D')
    useEffect(()=>{
        if (!props.customQuery){
            // Ask the controller to display the graph
            displayVisualization(visualization, 
                props.selectedCountries, 
                props.selectedProperties,
                props.selectedYears,
                props.limit,
                props.filter,
                props.setSelectedYears)
        }else{
          // Ask the controller to display a custom query
          drawFromCypher(props.customQuery, visualization)
        }
        
    });  
    return (
      <ToggleButtonGroup type="checkbox" value={visualization} >
        <ToggleButton className="controllerButton" value={"2D"} onClick={()=>{setVisualization('2D')}} >2D</ToggleButton>
        <ToggleButton className="controllerButton" value={"3D"} onClick={()=>{setVisualization('3D')}}>3D</ToggleButton>
        <ToggleButton className="controllerButton" value={"Map"} onClick={()=>{setVisualization('Map')}}>Map</ToggleButton>
      </ToggleButtonGroup>
    );
  }