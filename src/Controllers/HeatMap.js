import L from 'leaflet';
import {getCountriesPositions} from '../Models/DatabaseModel'; 

export default function HeatMap (){
    var map = L.map('viz').setView([0, 0], 2);
    map.setMaxZoom(5);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFyY211cnBoeWRldSIsImEiOiJjazZ5d21jOHMwNjV2M2x1ZmJsNmFtcXMzIn0.aAIV1cnVp14mkZ7BIoJfcQ'
    }).addTo(map);

    getCountriesPositions().then(response=>{
        response.forEach(country=>{
            if (country[1] && country[2]){
                console.log(country)
                L.circleMarker([country[2], country[1]],{
                    color: "red",
                    fillColor: "#f03",
                    fillOpacity: 0.6,
                    radius: 20.0
                }).addTo(map)
            }
        })
    })
}
