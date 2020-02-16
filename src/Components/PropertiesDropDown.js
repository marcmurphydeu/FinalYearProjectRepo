import React, {useState, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
import {getProperties} from '../Models/DatabaseModel';




export default function PropertiesDropDownMenu (props) {
    const [properties, setProperties] = useState(['Population'])

    useEffect(()=>{
        getProperties().then((result)=>{
            setProperties(result)
        })
    },[])

    return (
        
        <Dropdown  className = "formDropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {props.property}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <ul>
            {/* This adds the selected country to the dropdown title
                and adds the selected country to the list of country chips  */}
            {properties.map((property) => <Dropdown.Item onSelect={()=>{
                    props.setSelectedProperties(props.properties.concat([property[0]]))
                    props.setProperty(property[0]); 
                }} key={property[0]}>{property[0]}</Dropdown.Item>)}
            </ul>   
            </Dropdown.Menu>
        </Dropdown>
    )
}
