import React, {useState, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
import draw from './Visualization';
import Badges from './CountryBadges';
import DropDownMenu from './DropDownMenu';
import PropertiesBadges from './PropertyBadges';
import YearBadges from './YearBadges';
import TimeSeriesSlider from './TimeSeriesSlider';
import Slider from './Slider';
import Grid from '@material-ui/core/Grid';



export function UserForm(){
    const [limit , setLimit] = useState()
    const [filter , setFilter] = useState('asc') 
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedProperties, setSelectedProperties] = useState([])
    const [selectedYears, setSelectedYears] = useState([])
 
    useEffect(()=>{
        draw(selectedCountries, selectedProperties, selectedYears, limit, filter)
    });


    return (
        <Grid item xs={6} id = "Form"> 
            <Grid container id = "row1">
                <Grid id = "countryForm" item xs={5} >
                    <Grid item id = "labelAndDropdown">
                        <Form.Label id = "label">Country</Form.Label>
                        <DropDownMenu type={"countries"}  values = {selectedCountries} setSelectedValues = {setSelectedCountries}/>
                    </Grid>
                    <Badges countries = {selectedCountries} setSelectedCountries = {setSelectedCountries}/>
                </Grid>            

                <Grid id ="propertyForm" item xs={5}>
                    <Grid item id = "labelAndDropdown">
                        <Form.Label id = "label">Property</Form.Label>
                        <DropDownMenu  type = {"properties"} values = {selectedProperties} setSelectedValues = {setSelectedProperties}/>
                    </Grid>
                    <PropertiesBadges properties = {selectedProperties} setSelectedProperties = {setSelectedProperties}/>
                </Grid>
            </Grid> 

            <Grid container id= "row2-box">
                <Grid id ="yearForm" item xs={11}>
                    <Grid item xs={11} id="row2row1">
                        <Grid item xs ={9} id = "labelAndDropdown">
                            <Form.Label id = "label">Year</Form.Label>
                            <DropDownMenu type={"years"} values ={selectedYears} setSelectedValues = {setSelectedYears}/>
                        </Grid>
                        <Grid item xs={3}>
                            <Slider id = "yearSlider" setSelectedYears = {setSelectedYears}/>
                        </Grid>
                        <Grid item xs={3}>
                            <TimeSeriesSlider setSelectedYears = {setSelectedYears}/>
                        </Grid>
                    </Grid>    
                    <Grid item xs = {11}>
                        <YearBadges years = {selectedYears} setSelectedYears = {setSelectedYears} />
                    </Grid>
                </Grid>
            </Grid>

            <Grid container id="row3">
                <Grid item id = "filterForm" xs={11}>
                    <Grid id ="labelAndDropdown" item xs={5}>
                            <Form.Label id = "label">Limit</Form.Label>
                            <DropDownMenu type = {"limit"} values ={[limit]} setSelectedValues = {setLimit}/>
                    </Grid>
                    <Grid id ="labelAndDropdown" item xs={5}>
                        <Form.Label id = "label">Order By</Form.Label>
                        <DropDownMenu type = {"orderBy"} setSelectedValues ={setFilter} values = {[filter]}/>
                    </Grid>
                </Grid>
                    
            </Grid>
        </Grid>
    )
}

export default UserForm;