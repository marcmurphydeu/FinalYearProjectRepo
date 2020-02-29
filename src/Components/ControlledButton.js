import React, {useState, useEffect} from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import displayVisualization from '../Controllers/VisualController';


export default function ToggleButtonGroupControlled(props) {
    // const [value, setValue] = useState(props.visualization);
    const [visualization, setVisualization] = useState('2D')
    console.log("Value is ", visualization)
    useEffect(()=>{
        displayVisualization(visualization, 
                            props.selectedCountries, 
                            props.selectedProperties,
                            props.selectedYears,
                            props.limit,
                            props.filter,
                            props.setSelectedYears)
    });
    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = val => setVisualization(val);
  
    return (
      <ToggleButtonGroup type="checkbox" value={visualization} >
        <ToggleButton value={"2D"} onClick={()=>{setVisualization('2D')}} >2D</ToggleButton>
        <ToggleButton value={"3D"} onClick={(val)=>{setVisualization('3D')}}>3D</ToggleButton>
        <ToggleButton value={"Map"} onClick={(val)=>{setVisualization('Map')}}>Map</ToggleButton>
      </ToggleButtonGroup>
    );
  }