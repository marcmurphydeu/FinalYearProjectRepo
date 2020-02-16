import React, {useState, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
import {getCountries} from '../Models/DatabaseModel';




export default function CountriesDropDownMenu (props) {
    const [countries, setCountries] = useState(['Spain'])

    useEffect(()=>{
        getCountries().then((result)=>{
            setCountries(result)
        })
    },[])

    return (
        
        <Dropdown className = "formDropdown" >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {props.country}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <ul>
            {/* This adds the selected country to the dropdown title
                and adds the selected country to the list of country chips  */}
            {countries.map((country) => <Dropdown.Item onSelect={()=>{
                    props.setSelectedCountries(props.countries.concat([country[0]]))
                    props.setCountry(country[0]); 
                }} key={country[0]}>{country[0]}</Dropdown.Item>)}
            </ul>   
            </Dropdown.Menu>
        </Dropdown>
    )
}
