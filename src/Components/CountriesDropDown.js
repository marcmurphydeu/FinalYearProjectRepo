import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
import getCountries from '../Models/DatabaseModel';

export default function CountriesDropDownMenu (props) {
    var lists = getCountries()
    let countries = []
    lists.then(function(result) {
        countries.push(result.map(
            (country) => <Dropdown.Item onSelect={() => props.setCountry(country[0])} key={country[0]}>{country[0]}</Dropdown.Item>
        )) 
    });
    return (
        <Dropdown >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {props.country}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <ul>
                {countries}
            </ul>   
            </Dropdown.Menu>
        </Dropdown>
    )
}
