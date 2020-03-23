import HeatMap from './MapController';
import draw3D from './3DController';
import draw from './2DVisualizationController';
import TimeSeriesSlider from '../Components/TimeSeriesSlider';
import React from 'react';
import ReactDOM from 'react-dom';
import {getData} from './DataController';


export default function displayVisualization(visualization, selectedCountries, selectedProperties, selectedYears, limit, filter, setSelectedYears){
    if (selectedCountries && selectedProperties && selectedYears.length){
        switch (visualization){
            case "2D":
                draw(selectedCountries, selectedProperties, selectedYears, limit, filter);
                break;
            case "3D":
                draw3D(selectedCountries, selectedProperties, selectedYears, limit, filter);
                break;
            case "Map":
                HeatMap(selectedCountries, selectedProperties, selectedYears, limit, filter);
                if (selectedProperties.length > 1){
                    displayMapWithSlider(setSelectedYears)
                }
                break;
            default:
                break;
            }    
    }
}   

function displayMapWithSlider(setSelectedYears){
    ReactDOM.unmountComponentAtNode(document.getElementById('analysis'))
    ReactDOM.render(<TimeSeriesSlider setSelectedYears={setSelectedYears}/>, document.getElementById('timeSeriesSlider'))
    const mapElement = document.getElementById('timeSeriesSlider')
    window.scrollTo(0, mapElement.offsetTop)
    mapElement.style.paddingTop = "10px";
    mapElement.style.boxShadow = "0px 0px 23px 4px rgba(0,0,0,0.57)"
    mapElement.style.borderRadius = "15px 15px 15px 15px;"
    mapElement.style.marginTop = "30px"
}

export async function drawFromCypher(textQuery, visualization, container = null){
    let countries = await getData('countries')
    let properties = await getData('properties')
    let otherCountries = await getData('otherCountries')
    let years = []
    for (let i = 1960; i< 2019; i++){
        years.push(""+i)
    }
    let separatedQuery = textQuery.split(/[.\=,:}()'" {><*+-/_]/).map(item=> {return item.trim()})

    let queryCountries = []
    let queryProperties = []
    let queryYears = []
    let valid = true //Check no deletion is attempted
    separatedQuery.forEach(elem=>{
        if(elem.toLowerCase() === "delete"||elem.toLowerCase() === "remove"){
            valid = false
            alert("No remove or delete queries are permitted")
        }
        if (countries.flat().includes(elem) || otherCountries.flat().includes(elem)){
            queryCountries.push(elem)
        }
        if(properties.flat().flat().includes(elem)){
            queryProperties.push(elem)
        }
        if (years.includes(elem)){
            queryYears.push(elem)
        }
    })

    if(valid){
        switch (visualization){
            case '2D':
                draw(queryCountries,queryProperties,queryYears,null,null,true,textQuery, container)
                break;
            case '3D':
                draw3D(queryCountries, queryProperties, queryYears, null,null, textQuery, container)
                break;
            case 'Map':
                HeatMap(queryCountries, queryProperties, queryYears, null, null, textQuery, container)
                break;
            default:
                break;
        }
    }
    
}

