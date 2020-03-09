import HeatMap from './HeatMap';
import draw3D from './3DVisualization';
import draw from './2DVisualization';
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
                if (selectedProperties.length > 1){
                    alert("You can only visualize one property in the map")
                }
                else{
                    HeatMap(selectedCountries, selectedProperties, selectedYears, limit, filter);
                    ReactDOM.render(<TimeSeriesSlider setSelectedYears={setSelectedYears}/>, document.getElementById('timeSeriesSlider'));
                }
                break;
            default:
                break;
            }    
    }
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
    separatedQuery.forEach(elem=>{
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
    // renderVisualization(textQuery)
}



