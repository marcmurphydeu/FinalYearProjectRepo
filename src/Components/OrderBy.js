import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';

export default function OrderByDropDown (props) {
    var filter = ['ASC', 'DESC'];

    const filters = filter.map(
        (f) => <Dropdown.Item onSelect={() => props.setFilter(f)} key={f}>{f}</Dropdown.Item>
    ) 
    
    return (
        <Dropdown >
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {props.filter}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <ul>
                {filters}
            </ul>   
            </Dropdown.Menu>
        </Dropdown>
    )
}
