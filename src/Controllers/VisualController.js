import HeatMap from './HeatMap';
import draw3D from './3DVisualization';
import draw,{drawFromCypher} from './2DVisualization';
import TimeSeriesSlider from '../Components/TimeSeriesSlider';
import React from 'react';
import ReactDOM from 'react-dom';

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

export function displayFromQuery(query){
    try{
        drawFromCypher(query)
    }
    catch(error){
        alert("Cypher query is incorrect")
    }
}

