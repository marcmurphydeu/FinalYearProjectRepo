import {computeCypher, maxValueQuery} from '../Models/QueryConstructors';
import {getDataFromQuery} from '../Models/DatabaseModel';
import {getData} from './DataController';

var viz;
var neo = require('neovis.js');

async function getConfig(query = null){
    var config = {
        container_id: "viz",
        server_url:"bolt://localhost:7687",
        server_user:"neo4j",
        server_password: "fender14",
        labels: {},
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
        // arrows: true
    };

    if(query){
        config.initial_cypher = query
    }

    let properties = await getData('properties')
    properties.forEach(p=>{
    config.labels[(p[0][0])] =  {
        "caption": "property",
        "size":"scaledValue",
        "community":"community"
        }
    })

    config.labels["Country"] = {
        "caption": "country_name",
        "size": 5,
        "community": "community"
    }
    config.labels["Year"] = {
        "caption": "year",
        "size": 5,
        "community": "community"
    }

    return config;
}


function getMaxValues(properties, country, year, limit, filter, callback){
    var maxVals = {}
    var remaining = properties.length
    properties.forEach(p =>{
        getDataFromQuery(maxValueQuery(country, p, year, limit, filter)).then(result=>{
            if (result.length !== 0){
                maxVals[p] = result[0][0]
                remaining -= 1
                if (remaining === 0){
                    callback(maxVals)
                }
            }
            
        })
    })
    return maxVals
}

export default async function draw(country, property, year, limit, filter){
    var query;
    getMaxValues(property, country, year, limit, filter, function(maxValues){

    Object.keys(maxValues).forEach(function(key) {
        if(maxValues[key] === 0){
            maxValues[key] = 1
        }
    });
    query = computeCypher(country,property,year,limit, filter, maxValues);

    console.log(query)
    

    let config = getConfig(query).then(c =>{
        console.log(c)
        viz = new neo.default(c);
        viz.render();
    })

    })
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