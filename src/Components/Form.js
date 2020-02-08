import React, {useState, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Col} from 'react-bootstrap';
import draw from './Visualization';
import CountriesDropDown from './CountriesDropDown';
import YearsDropDownMenu from './YearsDropDown';
import Badges from './Badges';
import styled from 'styled-components';
import OrderByFilter from './OrderBy';
import PropertiesDropDown from './PropertiesDropDown';
import PropertiesBadges from './PropertyBadges';

export function UserForm(props){
    const [property, setProperty] = useState('Population')
    const [country, setCountry] = useState('Spain')
    const [year, setYear] = useState(2018)
    const [limit , setLimit] = useState(50)
    const [filter , setFilter] = useState('asc') 
    const [selectedCountries, setSelectedCountries] = useState([country])
    const [selectedProperties, setSelectedProperties] = useState([property])
 
    useEffect(()=>{
        draw(selectedCountries, property, year, limit, filter)
    });


    return (
    <div>
        <Form>
            <Form.Row id = "FormRow"> 
               <div>
                    <Form.Group controlId="formCountry">
                    <Form.Label>Country</Form.Label>
                    <CountriesDropDown setCountry = {setCountry} country = {country} countries = {selectedCountries} setSelectedCountries = {setSelectedCountries}/>
                    </Form.Group>
                    <Badges countries = {selectedCountries} setSelectedCountries = {setSelectedCountries}/>
                </div>            

                <div>
                    <Form.Group controlId="formProperty">
                    <Form.Label>Property</Form.Label>
                    <PropertiesDropDown setProperty = {setProperty} property = {property} properties = {selectedProperties} setSelectedProperties = {setSelectedProperties}/>
                    <PropertiesBadges properties = {selectedProperties} setSelectedProperties = {setSelectedProperties}/>
                    </Form.Group>
                </div>
                
                <div>
                    <Form.Group controlId="formYear">
                    <Form.Label>Year</Form.Label>
                    <YearsDropDownMenu setYear ={setYear} year = {year}/>
                    </Form.Group>
                </div>
                
                <div>
                    <Form.Group controlId="formLimit">
                    <Form.Label>Limit</Form.Label>
                    <Form.Control onChange={e => setLimit(e.target.value)} type="number" placeholder={limit} />
                    </Form.Group>
                </div>

                <div>
                    <Form.Group controlId="forOrder">
                    <Form.Label>Order By</Form.Label>
                    <OrderByFilter setFilter ={setFilter} filter = {filter}/>
                    </Form.Group>
                </div>
                
            </Form.Row>
        
        </Form>
        <div id = "viz"></div>
    </div>
    )
}

export default UserForm;