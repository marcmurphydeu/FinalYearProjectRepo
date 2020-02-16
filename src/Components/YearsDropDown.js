import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';

export default function YearsDropDownMenu (props) {
    var years_list = [];
    for (var i = 1960; i <= 2018; i++) {
        years_list.push(i);
    }

    const years = years_list.map(
        (year) => <Dropdown.Item onSelect={() => {
            props.setYear(year);
            props.setSelectedYears(props.selectedYears.concat([year]))
        }} key={year}>{year}</Dropdown.Item>
    ) 
    
    return (
        <Dropdown >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {props.year}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <ul>
                {years}
            </ul>   
            </Dropdown.Menu>
        </Dropdown>
    )
}
