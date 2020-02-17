import React, {useState, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
import {getProperties} from '../Models/DatabaseModel';
import {getCountries} from '../Models/DatabaseModel';




export default function DropDownMenu (props) {
    const [values, setValues] = useState(props.values)


    // Gets the values from the database
    // when needed
    useEffect(()=>{
        switch(props.type) {
            case "properties":
                getProperties().then((result)=>{
                    let values = result.map(function(key){
                        return key[0];
                    });
                    setValues(values)
                })
                break;
            case "countries":
                getCountries().then((result)=>{
                    let values = result.map(function(key){
                        return key[0];
                    });
                    setValues(values)
                })
                break;
            case "years":
                let years_list = [];
                for (var i = 1960; i <= 2018; i++) {
                    years_list.push(i);
                }
                setValues(years_list)
                break;
            case "limit":
                let limit_list = [];
                for (var l = 0; l <= 500; l++) {
                    limit_list.push(l);
                }
                setValues(limit_list)
                break;
            case "orderBy":
                let filters = ['ASC', 'DESC'];
                setValues(filters)
                break;
            default:
              alert('Invalid props type')
          }
        
    },[])

    return (
        <Dropdown  className = "formDropdown">
            <Dropdown.Toggle id="dropdown-basic">
                {props.values[props.values.length-1]}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            <ul>
            {/* This adds the selected country to the dropdown title
                and adds the selected country to the list of country chips  */}
            {values.map((v) => <Dropdown.Item onSelect={()=>{
                    if (props.type === "limit" || props.type === "orderBy"){
                        props.setSelectedValues(v);
                    }else{
                        props.setSelectedValues(props.values.concat([v]));
                    } 
                }} key={v}>{v}</Dropdown.Item>)}
            </ul>   
            </Dropdown.Menu>
        </Dropdown>
    )
}
