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
    var labels ={};
    if(!customQuery){
        queryCountriesSize = getDataFromQuery(computeCypherForMap(selectedCountries, selectedProperties, selectedYears, limit, filter))
                            .then(query_res=>{
                                return query_res.map(node_bundle=>{
                                    let property;
                                    let country;
                                    node_bundle.forEach(elem =>{
                                        if (elem.properties.country_name){
                                            country = elem
                                        }
                                        if (elem.properties.property){
                                            property = elem
                                        }
                                    })
                                    // Labels are not always the same 
                                    labels[country.properties.country_name] = property.properties.value
                                    return [country.properties.country_name, property.properties.value ]
                                })
                            })
    }
    else if (customQuery){
        queryCountriesSize = getDataFromQuery(customQuery)
                            .then(query_res=>{
                                return query_res.map(node_bundle=>{
                                    let property;
                                    let country;
                                    setLabels(node_bundle,labels)
                                    node_bundle.forEach(elem =>{
                                        if (elem.properties.country_name){
                                            country = elem
                                            
                                        }
                                        if (elem.properties.property){
                                            property = elem
                                        }
                                    })
                                    return [country.properties.country_name, property.properties.value ]
                                })
                            })
    }
    // console.log(queryCountriesSize)
    // Gets a list of the countries with their size, value and color
    // then it gets the countries positions (async) and set's a marker
    // for each of the countries with the information from the list
    queryCountriesSize.then(l => normalizeNumbers(l))
    .then(list=>{
        getCountriesPositions().then(response=>{
            response.forEach(country=>{
                // console.log("List is", list)
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
                         .setContent('Value is : '+labels[country[0]] +`\n ,`
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

function setLabels(nodes,labels){
    console.log(nodes)
    switch(nodes.length){
        case 2:
            labels[nodes[0].properties.country_name] = nodes[1].properties.value //Where the first is the country and second is the value
            break;
        case 3: //For analysis
            nodes.forEach(node=>{
                if (node.properties.property === "Population"){
                    labels[nodes[0].properties.country_name] = node.properties.value
                }
            })
            break;
        default:
            break;
    }
    console.log(labels)
}

function normalizeNumbers(list){
    // let setScaledValueString = computeCustomCypher2D(maxValues,country,property,year,customQueryString)
    // setDataFromQuery(setScaledValueString).then(()=> renderVisualization(customQueryString))
    // computeCypherForMap

    let  maxDiameter = 30.0
    console.log("List is ", list)
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
    console.log(newList)
    return newList
}

const rgbToHex = (r, g, b) => '#' + [r, g, b]
  .map(x => x.toString(16).padStart(2, '0')).join('')
