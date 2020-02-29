import React, {useState, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
import Badges from './CountryBadges';
import DropDownMenu from './DropDownMenu';
import PropertiesBadges from './PropertyBadges';
import YearBadges from './YearBadges';
import Slider from './Slider';
import Grid from '@material-ui/core/Grid';
import SelectAllButton from './SelectAllButton';
import displayVisualization from '../Controllers/VisualController';
import TimeSeriesSlider from './TimeSeriesSlider';

export function UserForm(){
    const [limit , setLimit] = useState('250')
    const [filter , setFilter] = useState('asc') 
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedProperties, setSelectedProperties] = useState([])
    const [selectedYears, setSelectedYears] = useState([])
    const [visualization, setVisualization] = useState('2D')
 
    useEffect(()=>{
        displayVisualization(visualization, selectedCountries, selectedProperties,selectedYears,limit,filter,setSelectedYears)
    });

    return (
        <Grid item xs={6} id = "Form"> 

            {/* Country Form Row */}
            <Grid container id = "row">
                <Grid id = "formItem" item xs={11} >
                    <Grid item id = "labelAndDropdown">
                        <Form.Label id = "label">Country</Form.Label>
                        <DropDownMenu type={"countries"}  values = {selectedCountries} setSelectedValues = {setSelectedCountries}/>
                    </Grid>
                    <Grid item id = "labelAndDropdown">
                        <Form.Label id = "label">Others</Form.Label>
                        <DropDownMenu type={"otherCountries"}  values = {selectedCountries} setSelectedValues = {setSelectedCountries}/>
                    </Grid>
                    <SelectAllButton type={"countries"} setSelectedValues = {setSelectedCountries}/>
                    <Badges countries = {selectedCountries} setSelectedCountries = {setSelectedCountries}/>
                </Grid> 
            </Grid>      

            {/* Property Form Row */}
            <Grid container id = "row">
                <Grid id ="formItem" item xs={11}>
                        <Grid item id = "labelAndDropdown">
                            <Form.Label id = "label">Property</Form.Label>
                            <DropDownMenu  type = {"properties"} values = {selectedProperties} setSelectedValues = {setSelectedProperties}/>
                        </Grid>
                        <SelectAllButton type = {"properties"}  setSelectedValues = {setSelectedProperties}/>
                        <PropertiesBadges properties = {selectedProperties} setSelectedProperties = {setSelectedProperties}/>
                    </Grid>
            </Grid>
            
            {/* Year Form Row */}
            <Grid container id= "row">
                <Grid id ="formItem" item xs={11}>
                        <Grid item  id = "labelAndDropdown">
                            <Form.Label id = "label">Year</Form.Label>
                            <DropDownMenu type={"years"} values ={selectedYears} setSelectedValues = {setSelectedYears}/>
                        </Grid>
                        <Grid item>
                            <Slider id = "yearSlider" setSelectedYears = {setSelectedYears}/>
                        </Grid>
                        <Grid item>
                            <TimeSeriesSlider id = "timeSeriesSlider" setSelectedYears = {setSelectedYears}/>
                        </Grid>
                        <Grid item>
                            <SelectAllButton type={"years"} setSelectedValues = {setSelectedYears}/>    
                        </Grid>
                        
                    <Grid item>
                        <YearBadges years = {selectedYears} setSelectedYears = {setSelectedYears} />
                    </Grid>
                </Grid>
            </Grid>

            {/* Limit and Filter */}
            <Grid container id="row">
                <Grid item id = "formItem" xs={11}>
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

            {/* Visualization */}
            <Grid container id="row">
                <Grid item id = "formItem" xs={11}>
                        <Form.Label id = "label">Visualization</Form.Label>
                    <Grid id ="labelAndDropdown" item xs={5}>
                        <DropDownMenu type = {"visualization"} setSelectedValues ={setVisualization} values = {[visualization]}/>
                    </Grid>
                </Grid>
                    
            </Grid>
        </Grid>
    )
}

export default UserForm;