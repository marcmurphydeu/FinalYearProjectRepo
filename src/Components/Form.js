import React, {useState, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import DropDownMenu from './DropDownMenu';
import Badges from './Badges';
import Slider from './Slider';
import Grid from '@material-ui/core/Grid';
import SelectAllButton from './SelectAllButton';
import TimeSeriesSlider from './TimeSeriesSlider';
import ReactDOM from 'react-dom';
import VisualizationToggle from './ControlledButton';
import Popup from './Popup';
import {getText} from '../Controllers/InformationController';

function toggle(customQuery){
    ReactDOM.render(<VisualizationToggle 
        customQuery={customQuery}
        />, document.getElementById('controlledButton'));   
}



// Main Form in the application (in red). It presents drop-downs
// for selecting Countries, Properties, Years and Filters. 
// It also contains the custom query.
// Inspiration for using forms:
// https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f

export function UserForm(){
    const [limit , setLimit] = useState('250')
    const [filter , setFilter] = useState('DESC') 
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedProperties, setSelectedProperties] = useState([])
    const [selectedYears, setSelectedYears] = useState([])
    const [selectedOtherCountries, setOtherCountries] = useState([])
    const [customQuery, setCustomQuery] = useState("")

    useEffect(()=>{
            ReactDOM.render(<VisualizationToggle 
                setSelectedYears={setSelectedYears}
                selectedYears = {selectedYears}
                limit = {limit}
                filter = {filter}
                selectedCountries = {selectedCountries.concat(selectedOtherCountries)}
                selectedProperties = {selectedProperties}
                />, document.getElementById('controlledButton'));   
    },[customQuery, filter, limit, selectedCountries, selectedOtherCountries, selectedProperties, selectedYears]);

    return (
        <Grid item xs={6} id = "Form"> 

            {/* Country Form Row */}
            <Grid container id = "row">
                <Grid id = "formItem" item xs={11} >
                    <Grid item id="iconRow" xs={12}>
                        <Popup text={getText("Countries")}/>
                    </Grid>
                    <Grid item id = "labelAndDropdown">
                        <Form.Label id = "label">Country</Form.Label>
                        <DropDownMenu type={"countries"}  values = {selectedCountries} setSelectedValues = {setSelectedCountries}/>
                        
                    </Grid>
                    <Grid item id = "labelAndDropdown">
                        <Form.Label id = "label">Others</Form.Label>
                        <DropDownMenu type={"otherCountries"}  values = {selectedOtherCountries} setSelectedValues = {setOtherCountries}/>
                    </Grid>
                    <SelectAllButton type={"countries"} setSelectedValues = {setSelectedCountries}/>
                    <Badges values = {selectedCountries} setSelectedValues = {setSelectedCountries}/>
                    <Badges values = {selectedOtherCountries} setSelectedValues = {setOtherCountries}/>
                    
                </Grid> 
            </Grid>      

            {/* Property Form Row */}
            <Grid container id = "row">
                <Grid id ="formItem" item xs={11}>
                    <Grid item id="iconRow" xs={12}>
                        <Popup text={getText("Property")}/>
                    </Grid>
                        <Grid item id = "labelAndDropdown">
                            <Form.Label id = "label">Property</Form.Label>
                            <DropDownMenu  type = {"properties"} values = {selectedProperties} setSelectedValues = {setSelectedProperties}/>
                        </Grid>
                        <SelectAllButton type = {"properties"}  setSelectedValues = {setSelectedProperties}/>
                        <Badges values = {selectedProperties} setSelectedValues = {setSelectedProperties}/>
                    </Grid>
            </Grid>
            
            {/* Year Form Row */}
            <Grid container id= "row">
                <Grid id ="formItem" item xs={11}>
                        <Grid item id="iconRow" xs={12}>
                            <Popup text={getText("Years")}/>
                        </Grid>
                        <Grid item id = "labelAndDropdown">
                            <Form.Label id = "label">Year</Form.Label>
                            <DropDownMenu type={"years"} values ={selectedYears} setSelectedValues = {setSelectedYears}/>
                        </Grid>
                        <Grid xs={3} item>
                            <Slider id = "yearSlider" setSelectedYears = {setSelectedYears}/>
                        </Grid>
                        <Grid xs={3} item>
                            <TimeSeriesSlider id = "timeSeriesSlider" start = {1960} end = {2018} setSelectedValues = {setSelectedYears}/>
                        </Grid>
                        <Grid item>
                            <SelectAllButton type={"years"} setSelectedValues = {setSelectedYears}/>    
                        </Grid>
                        
                    <Grid item>
                        <Badges values = {selectedYears} setSelectedValues = {setSelectedYears} />
                    </Grid>
                </Grid>
            </Grid>

            {/* Limit and Filter */}
            <Grid container id="row">
                
                <Grid item id = "formItem" xs={11}>
                    <Grid item id="iconRow" xs={12}>
                        <Popup text={getText("Filters")}/>
                    </Grid>
                    <Grid id ="labelAndDropdown" item xs={11}>
                        <Grid xs={3} item>
                            <Form.Label id = "label">Limit</Form.Label>
                        </Grid>
                        <Grid xs={8} item  >
                            <TimeSeriesSlider id = "timeSeriesSlider" start = {0} type = {"filter"} end = {500} setSelectedValues = {setLimit}/>
                        </Grid>
                    </Grid>
                    <Grid id ="labelAndDropdown" item xs={12}>
                        <Form.Label id = "label">Order By</Form.Label>
                        <DropDownMenu type = {"orderBy"} setSelectedValues ={setFilter} values = {[filter]}/>
                    </Grid>
                </Grid>
                    
            </Grid>


            {/* Custom query filter */}
            <Grid container id="row">
                <Grid item id = "customQueryItem" xs={11}>
                    <Grid item id="iconRow" xs={12}>
                        <Popup text={getText("CustomQuery")}/>
                    </Grid>
                    <Form.Label id ="label">Custom query</Form.Label>
                    <Grid item id="customQueryBox" xs ={12}>
                        <Form.Control id={"customMenuForm"} value={customQuery} onChange={e => setCustomQuery(e.target.value)} as = "textarea" type="text" placeholder="MATCH (n: Country) ..." />
                        <DropDownMenu type = {"customMenu"} setSelectedValues ={setCustomQuery} values = {['Examples']}/>
                    </Grid>
                    <div id = "correctLabel"/>
                    <Button onClick = {()=> toggle(customQuery)}  id = "submitButton">Submit</Button>
                </Grid>        
            </Grid>

        </Grid>
    )
}

export default UserForm;