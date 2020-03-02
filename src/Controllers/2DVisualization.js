import {computeCypher, maxValueQuery} from '../Models/QueryConstructors';
import {getDataFromQuery} from '../Models/DatabaseModel';
import {getData} from './DataController';

var viz;
var neo = require('neovis.js');

function getConfig(query = null){
    var config = {
        container_id: "viz",
        server_url:"bolt://localhost:7687",
        server_user:"neo4j",
        server_password: "fender14",
        labels: {
                "Country" : {
                    "caption": "country_name",
                    "size": 5.0,
                    "community": "community"
                },
                "Year":{
                    "caption": "year",
                    "size": "pageRank",
                    "community": "community",
                }
            },
        relationships: {
            "had": {
            "thickness": "weight",
            "caption": true,
            "community": "value"
            },
            "in":{
            "thickness": "0.1",
            "caption": true,
            "community": 'value'
            }
        
            },
        arrows: true
    };

    if(query){
        config.initial_cypher = query
    }

    getData('properties').then(e=> {
        e.forEach(p=>{
        config.labels[p[0]] =  {
            "caption": "property",
            "size":"scaledValue",
            "community":"community"
            }
        })
    })

    return config;
}

export default async function draw(country, property, year, limit, filter){
    var query;
    var maxVal = await getDataFromQuery(maxValueQuery(country,property,year,limit,filter))
    if (maxVal[0][0] === 0){maxVal = [1]}
    query = computeCypher(country,property,year,limit, filter, maxVal[0]);

    let config = getConfig(query)
    viz = new neo.default(config);
    viz.render();
}

export async function drawFromCypher(textQuery){
    try{
        viz = new neo.default(getConfig(textQuery));
        console.log(viz)
        viz.renderWithCypher(textQuery);
    }
    catch(e){
        alert("Query is incorrect", "Error : \n", e)
    }
}