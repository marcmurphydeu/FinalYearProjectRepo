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

function deleteCountry(setSelectedCountries, country, countries){
    let value = country
    let arr = countries
    arr = arr.filter(item => item !== value)
    setSelectedCountries(arr)
}

export default function Badges (props) {
    const duplicates = findDuplicates(props.countries)
    if (duplicates.length !== 0){
        alert("Enter a country you haven't entered before")
        deleteCountry(props.setSelectedCountries, duplicates[0], props.countries)
    }
    return (
        <div className="badges">
            {props.countries.map(
                (country) => <Chip id = "badge" key = {country} label={country} size = "small" onDelete={() => deleteCountry(props.setSelectedCountries, country, props.countries)} color="primary" />
            )}
            
        </div>
    )
}
