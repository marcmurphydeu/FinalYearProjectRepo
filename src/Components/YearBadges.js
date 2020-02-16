import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chip from '@material-ui/core/Chip';

const findDuplicates = (arr) => {
    let sorted_arr = arr.slice().sort(); // You can define the comparing function here. 
    // JS by default uses a crappy string compare.
    // (we use slice to clone the array so the
    // original array won't be modified)
    let results = [];
    for (let i = 0; i < sorted_arr.length - 1; i++) {
      if (sorted_arr[i + 1] === sorted_arr[i]) {
        results.push(sorted_arr[i]);
      }
    }
    return results;
  }

function deleteYear(setSelectedYears, year, years){
    let value = year

    let arr = years

    arr = arr.filter(item => item !== value)

    setSelectedYears(arr)
}

export default function Badges (props) {
    const duplicates = findDuplicates(props.years)
    if (duplicates.length !== 0){
        alert("Enter a Year you haven't entered before")
        deleteYear(props.setSelectedYears, duplicates[0], props.years)
    }
    // console.log(props.countries)
    return (
        <div className="badges">
            {props.years.map(
                (year) => <Chip id = "badge" key = {year} label={year} size = "small" onDelete={() => deleteYear(props.setSelectedYears, year, props.years)} color="primary" />
            )}
            
        </div>
    )
}
