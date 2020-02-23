import L from 'leaflet';
import {getCountriesPositions} from '../Models/DatabaseModel'; 
import {computeCypher} from '../Models/QueryConstructors';
import {getDataFromQuery} from '../Models/DatabaseModel';

export default function HeatMap (selectedCountries, selectedProperties, selectedYears, limit, filter){
    var container = L.DomUtil.get('map'); if(container != null){ container._leaflet_id = null; }
    var map = L.map('map').setView([0, 0], 2);
    map.setMaxZoom(5);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFyY211cnBoeWRldSIsImEiOiJjazZ5d21jOHMwNjV2M2x1ZmJsNmFtcXMzIn0.aAIV1cnVp14mkZ7BIoJfcQ'
    }).addTo(map);

    var queryCountriesSize = getDataFromQuery(computeCypher(selectedCountries, selectedProperties, selectedYears, limit, filter))
    .then(query_res=>{
        return query_res.map(node_bundle=>{
            return [node_bundle[0].properties.country_name, node_bundle[1].properties.value]
        })
    })
    queryCountriesSize.then(l => normalizeNumbers(l))
    .then(list=>{
        console.log(list)
        getCountriesPositions().then(response=>{
            response.forEach(country=>{
                if (country[1] && country[2] && country[0] in list){
                    let marker = L.circleMarker([country[2], country[1]],{
                        color: "red",
                        fillColor: "#f03",
                        fillOpacity: 0.6,
                        radius: list[country[0]].diameter
                    }).addTo(map)
                    marker.on('mouseover', function(e) {
                        //open popup;
                        var popup = L.popup()
                         .setLatLng([country[2], country[1]]) 
                         .setContent(''+list[country[0]].value)
                         .openOn(map);
                      });
                }
            })
        })
    }     
    )  
}

function normalizeNumbers(list){
    let  maxDiameter = 30.0
    var max = list[0]
    list.forEach(tuple=>{
        if (tuple[1] >= max[1]){
            max = tuple
        }
    })

    var newList = {}
    list.forEach(tuple=>{
        if (tuple === max){
            newList[tuple[0]] = {diameter:maxDiameter, value: tuple[1]}
        }
        else{
            let p = (tuple[1]*100)/max[1]
            let d = (p/100)*maxDiameter
            newList[tuple[0]] = {diameter:d, value: tuple[1]}
        }
    })
    return newList
}
