import HeatMap from './HeatMap';
import draw3D from './3DVisualization';
import draw from './2DVisualization';
import TimeSeriesSlider from '../Components/TimeSeriesSlider';
import React from 'react';
import ReactDOM from 'react-dom';



export default function displayVisualization(visualization, selectedCountries, selectedProperties, selectedYears, limit, filter, setSelectedYears){
    if (selectedCountries.length !== 0
        && selectedProperties.length !==0 
        && selectedYears.length !==0){
        switch (visualization){
            case "2D":
                draw(selectedCountries, selectedProperties, selectedYears, limit, filter);
                break;
            case "3D":
                draw3D(selectedCountries, selectedProperties, selectedYears, limit, filter);
                break;
            case "Map":
                HeatMap(selectedCountries, selectedProperties, selectedYears, limit, filter, setSelectedYears);
                ReactDOM.render(<TimeSeriesSlider setSelectedYears={setSelectedYears}/>, document.getElementById('timeSeriesSlider'));
                break;
            default:
                break;
            }    
    }
}
