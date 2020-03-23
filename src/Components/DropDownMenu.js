import React, {useState, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
import {getData, getQueryExamples} from '../Controllers/DataController';



export default function DropDownMenu (props) {
    const [values, setValues] = useState(props.values)

    // Gets the corresponding values from the database
    useEffect(()=>{
        switch(props.type) {
            case "properties":
                getData('properties').then((result)=>{
                    let values = result.map(function(key){
                        return key[0];
                    });
                    setValues(values)
                })
                break;
            case "countries":
                getData('countries').then((result)=>{
                    let newValues = result.map(function(key){
                        return key[0];
                    });
                    setValues(values.concat(newValues))
                })
                break;
            case "otherCountries":
                getData('otherCountries').then((result)=>{
                    let newValues = result.map(function(key){
                        return key[0];
                    });
                    setValues(values.concat(newValues))
                })
                break;

            //The following cases don't necessarily need to call the database
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
            case "customMenu":
                //Get the examples used in the Analysis
                setValues(getQueryExamples())
                break;
            default:
              alert('Invalid props type')
          }
        
    },[])

    return (
        <Dropdown  className = "formDropdown">
            <Dropdown.Toggle id="dropdown-basic">
                {/* Display the last used value as the drop-down value */}
                {props.values[props.values.length-1]}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            {/* Creates an unordered list of all the values contained in the drop-down */}
            <ul>
            {values.map((v) => <Dropdown.Item onSelect={()=>{

                    // Values that must be set individually
                    if (props.type === "limit" || props.type === "orderBy" || props.type === "customMenu" ){
                        props.setSelectedValues(v);
                    }
                    //Updates the selected values by adding it to the current list (i.e. adding a Country to the current list)
                    else{
                        props.setSelectedValues(props.values.concat([v]));
                    } 
                }} key={v}>{v}</Dropdown.Item>)}
            </ul>   
            </Dropdown.Menu>
        </Dropdown>
    )
}
