import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';

export default function LimitDropDownMenu (props) {
    var limit_list = [];
    for (var i = 0; i <= 500; i++) {
        limit_list.push(i);
    }

    const limit = limit_list.map(
        (limit) => <Dropdown.Item onSelect={() => props.setLimit(limit)} key={limit}>{limit}</Dropdown.Item>
    ) 
    
    return (
        <Dropdown className = "filterFormDropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {props.limit}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <ul>
                {limit}
            </ul>   
            </Dropdown.Menu>
        </Dropdown>
    )
}
