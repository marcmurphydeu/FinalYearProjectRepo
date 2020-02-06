import React, {useState, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
import getCountries from '../Models/DatabaseModel';


export default function CountriesDropDownMenu (props) {
    const [countries, setCountries] = useState(['Spain'])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true);
        getCountries().then((result)=>{
            setCountries(result)
        })
    },[])

    return (
        
        <Dropdown >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {props.country}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <ul>
                {!isLoading ? "" : countries.map((country) => <Dropdown.Item onSelect={()=>props.setCountry(country[0])} key={country[0]}>{country[0]}</Dropdown.Item>)}
            </ul>   
            </Dropdown.Menu>
        </Dropdown>
    )
}
