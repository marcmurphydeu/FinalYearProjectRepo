import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chip from '@material-ui/core/Chip';

const findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort(); 
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] === sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  }

function deleteProperty(setSelectedProperties, property, properties){
    let value = property
    let arr = properties
    arr = arr.filter(item => item !== value)
    setSelectedProperties(arr)
}

export default function PropertyBadges (props) {
    const duplicates = findDuplicates(props.properties)
    if (duplicates.length !== 0){
        alert("Enter a property you haven't entered before")
        deleteProperty(props.setSelectedProperties, duplicates[0], props.properties)
    }
    // console.log(props.countries)
    return (
        <div className="badges">
            {props.properties.map(
                (property) => <Chip id = "badge" key = {property} label={property} size = "small" onDelete={() => deleteProperty(props.setSelectedProperties, property, props.properties)} color="primary" />
            )}
            
        </div>
    )
}
