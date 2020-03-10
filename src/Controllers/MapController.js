import L from 'leaflet';
import {getCountriesPositions} from '../Models/DatabaseModel'; 
import {getCountriesData} from '../Models/HeatMap';
import {getData} from './DataController';


export default function HeatMap (selectedCountries, selectedProperties, selectedYears, limit, filter, customQuery = null, analysis_container=null){
    checkCountries(selectedCountries)
    if(selectedProperties.length !== 0){
        var placement = analysis_container ? analysis_container : 'map'
        var container = L.DomUtil.get(placement); if(container != null){ container._leaflet_id = null; }
        var map = L.map(placement).setView([0, 0], 2);
        map.setMaxZoom(5);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWFyY211cnBoeWRldSIsImEiOiJjazZ5d21jOHMwNjV2M2x1ZmJsNmFtcXMzIn0.aAIV1cnVp14mkZ7BIoJfcQ'
        }).addTo(map);
    
        //Call the model
        getCountriesData(selectedCountries, selectedProperties, selectedYears, limit, filter, customQuery)
        .then(list=>{
            getCountriesPositions().then(response=>{
                response.forEach(country=>{
                    if (country[1] && country[2] && country[0] in list){
                        let marker = L.circleMarker([country[2], country[1]],{
                            color: list[country[0]].colour,
                            fillColor: list[country[0]].colour,
                            fillOpacity: 0.6,
                            radius: list[country[0]].diameter
                        }).addTo(map)
                        marker.on('mouseover', function(e) {
                            L.popup()
                             .setLatLng([country[2], country[1]]) 
                             .setContent('Value is : '+list[country[0]].label +`\n ,`
                                        + '\r Country is: ' + country[0])
                             .openOn(map);
                          });
                    }
                })
            })
        })
    }else{alert('Property size was 0')}

}

function checkCountries(selectedCountries){
    getData('otherCountries').then(otherCountries=>{
        selectedCountries.forEach(country => {
            if(otherCountries.flat().includes(country)){
                alert("Warning, having a country that can't be physically mapped will produce wrong visualization ")
            }
        })
    })
}