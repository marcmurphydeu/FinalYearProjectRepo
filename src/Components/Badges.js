import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chip from '@material-ui/core/Chip';

function deleteCountry(setSelectedCountries, country, countries){
    let value = country

    let arr = countries

    arr = arr.filter(item => item !== value)

    setSelectedCountries(arr)
}

export default function Badges (props) {
    // console.log(props.countries)
    return (
        <div>
            {props.countries.map(
                (country) => <Chip key = {country} label={country} size = "small" onDelete={() => deleteCountry(props.setSelectedCountries, country, props.countries)} color="primary" />
            )}
            
        </div>
    )
}
