import React, {useState, useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';
import draw from './Visualization';
import CountriesDropDown from './CountriesDropDown';
import YearsDropDownMenu from './YearsDropDown';





export function UserForm(props){
    const [property, setProperty] = useState('Population')
    const [country, setCountry] = useState('Spain')
    const [year, setYear] = useState(2018)
    const [limit , setLimit] = useState(50)
    const [filter , setFilter] = useState('asc') 

    useEffect(()=>{
        draw(country, property, year, limit, filter)
    });


    return (
    <div>
        <Form>
        <Form.Group controlId="formCountry">
        <Form.Label>Country</Form.Label>
        <CountriesDropDown setCountry = {setCountry} country = {country}/>
        </Form.Group>

        <Form.Group controlId="formProperty">
        <Form.Label>Property</Form.Label>
        <Form.Control onChange={e => setProperty(e.target.value)} type="text" placeholder={property} />
        <Form.Text className="text-muted">
            Choose from the drop down
        </Form.Text>
        </Form.Group>

        <Form.Group controlId="formYear">
        <Form.Label>Year</Form.Label>
        <YearsDropDownMenu setYear ={setYear} year = {year}/>
        {/* <Form.Control onChange={e => setYear(e.target.value)} type="number" placeholder={year} /> */}
        </Form.Group>

        <Form.Group controlId="formLimit">
        <Form.Label>Limit</Form.Label>
        <Form.Control onChange={e => setLimit(e.target.value)} type="number" placeholder={limit} />
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="ASC" onChange={e => setFilter(e.target.value)} />
        <Form.Check type="checkbox" label="DESC" onChange={e => setFilter(e.target.value)}/>
        </Form.Group>
    </Form>
    <div id = "viz"></div>
    </div>
    )
}

export default UserForm;