import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chip from '@material-ui/core/Chip';

//Check if the updated list contains any duplicates
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

// Remove the chosen badge and update the list accordingly  
function deleteValue(setSelectedValues, value, values){
    values = values.filter(item => item !== value)
    setSelectedValues(values)
}

// Badge list component which displays the selected values 
// from the drop-down menu
export default function Badges (props) {
    const duplicates = findDuplicates(props.values)
    if (duplicates.length !== 0){
        alert("Enter a value you haven't entered before")
        deleteValue(props.setSelectedValues, duplicates[0], props.values)
    }
    return (
        <div className="badges">
            {props.values.map(
                (value) => <Chip id = "badge" key = {value} label={value} size = "small" onDelete={() => deleteValue(props.setSelectedValues, value, props.values)} color="primary" />
            )}
            
        </div>
    )
}
