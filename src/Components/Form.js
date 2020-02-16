import React, {useState, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
import draw from './Visualization';
import CountriesDropDown from './CountriesDropDown';
import YearsDropDownMenu from './YearsDropDown';
import Badges from './CountryBadges';
import OrderByFilter from './OrderBy';
import PropertiesDropDown from './PropertiesDropDown';
import PropertiesBadges from './PropertyBadges';
import LimitDropDownMenu from './LimitDropDown';
import YearBadges from './YearBadges';
import TimeSeriesSlider from './TimeSeriesSlider';
import Slider from './Slider';
import Grid from '@material-ui/core/Grid';



export function UserForm(props){
    const [property, setProperty] = useState('Population')
    const [country, setCountry] = useState('Spain')
    const [year, setYear] = useState(2018)
    const [limit , setLimit] = useState(50)
    const [filter , setFilter] = useState('asc') 
    const [selectedCountries, setSelectedCountries] = useState([country])
    const [selectedProperties, setSelectedProperties] = useState([property])
    const [selectedYears, setSelectedYears] = useState([year])
 
    useEffect(()=>{
        draw(selectedCountries, selectedProperties, selectedYears, limit, filter)
    });


    return (
        <Grid item xs={6} id = "Form"> 

            <Grid container id = "row1">
                <Grid id = "countryForm" item xs={5} >
                    <Form.Label id = "label">Country</Form.Label>
                    <CountriesDropDown className = "dropdown" setCountry = {setCountry} country = {country} countries = {selectedCountries} setSelectedCountries = {setSelectedCountries}/>
                    <Badges countries = {selectedCountries} setSelectedCountries = {setSelectedCountries}/>
                </Grid>            

                <Grid id ="propertyForm" item xs={5}>
                    <Form.Label id = "label">Property</Form.Label>
                    <PropertiesDropDown  className = "dropdown" setProperty = {setProperty} property = {property} properties = {selectedProperties} setSelectedProperties = {setSelectedProperties}/>
                    <PropertiesBadges properties = {selectedProperties} setSelectedProperties = {setSelectedProperties}/>
                </Grid>
            </Grid> 

            <Grid container id= "row2">
                <Grid id ="yearForm" item xs={11}>
                    <Form.Label id = "label">Year</Form.Label>
                    <YearsDropDownMenu className = "dropdown" setYear ={setYear} year = {year}  selectedYears = {selectedYears} setSelectedYears = {setSelectedYears}/>
                    <YearBadges years = {selectedYears} setSelectedYears = {setSelectedYears} />
                    <Slider id = "yearSlider" setSelectedYears = {setSelectedYears}/>
                    <TimeSeriesSlider setSelectedYears = {setSelectedYears}/>
                </Grid>
            </Grid>

            <Grid container>
                <Grid id ="limitForm" item xs={6}>
                    <Form.Label id = "label">Limit</Form.Label>
                    <LimitDropDownMenu className = "dropdown" setLimit ={setLimit} limit = {limit}/>
                </Grid>
                <Grid id ="orderByForm" item xs={6}>
                    <Form.Label id = "label">Order By</Form.Label>
                    <OrderByFilter className = "dropdown" setFilter ={setFilter} filter = {filter}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default UserForm;