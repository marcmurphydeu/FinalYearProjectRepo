import L from 'leaflet';
import {getCountriesPositions} from '../Models/DatabaseModel'; 
import {computeCypherForMap} from '../Models/QueryConstructors';
import {getDataFromQuery} from '../Models/DatabaseModel';



export default function HeatMap (selectedCountries, selectedProperties, selectedYears, limit, filter, customQuery = null){
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

    var queryCountriesSize;
    if(!customQuery){
        queryCountriesSize = getDataFromQuery(computeCypherForMap(selectedCountries, selectedProperties, selectedYears, limit, filter))
                            .then(query_res=>{
                                return query_res.map(node_bundle=>{
                                    // In this case index 0 is the country node and index 2 is the property node
                                    return [node_bundle[0].properties.country_name, node_bundle[2].properties.value]
                                })
                            })
    }
    else if (customQuery){
        queryCountriesSize = getDataFromQuery(customQuery)
                            .then(query_res=>{
                                return query_res.map(node_bundle=>{
                                    // In this case index 0 is the country node and index 2 is the property node
                                    return [node_bundle[0].properties.country_name, node_bundle[2].properties.value]
                                })
                            })
    }
    
    queryCountriesSize.then(l => normalizeNumbers(l))
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
                         .setContent('Value is : '+list[country[0]].value +`\n ,`
                                    + '\r Country is: ' + country[0])
                         .openOn(map);
                      });
                }
            })
        })
    }).then(e=>{
        const mapElement = document.getElementById('timeSeriesSlider')
        window.scrollTo(0, mapElement.offsetTop)
        mapElement.style.paddingTop = "10px";
        mapElement.style.boxShadow = "0px 0px 23px 4px rgba(0,0,0,0.57)"
        mapElement.style.borderRadius = "15px 15px 15px 15px;"
        mapElement.style.marginTop = "30px"
        })
}

function normalizeNumbers(list){
    let  maxDiameter = 30.0

    list.sort(function(a, b){return b[1]-a[1]});
    
    var newList = {}
    list.forEach((tuple,i)=>{
        
        if (i === 0){
            newList[tuple[0]] = {diameter:maxDiameter, value: tuple[1], colour: "#FF0000" }
        }
        else{
            // For the diameter
            let p = (tuple[1]*100)/list[0][1]
            if (isNaN(p)){ p = 1}
            let d = (p/100)*maxDiameter

            let red = 255
            let calculateGreen = (p/100) * red 
            let green = 255 - calculateGreen

            newList[tuple[0]] = {diameter:d, value: tuple[1], colour: rgbToHex(Math.round(red), Math.round(green), 0)}
        }
    })
    return newList
}

const rgbToHex = (r, g, b) => '#' + [r, g, b]
  .map(x => x.toString(16).padStart(2, '0')).join('')
