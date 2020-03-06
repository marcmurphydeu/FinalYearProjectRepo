import {computeCypher, computeCustomCypher2D} from '../Models/QueryConstructors';
import {getMaxValues} from './DataController';
import {getData} from './DataController';
import {setDataFromQuery} from '../Models/DatabaseModel';

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

    let properties = await getData('properties')  // This is being done below too!
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




export default async function draw(country, property, year, limit, filter, isCustomQuery=false, customQueryString=null){
    if(property.length !== 0){
        getMaxValues(property, country, year,function(maxValues){
            console.log("Max values", maxValues)
            Object.keys(maxValues).forEach(function(key) {
                if(maxValues[key] === 0){
                    maxValues[key] = 1
                }
            });
            if (!isCustomQuery){
                let query = computeCypher(country,property,year,limit, filter, maxValues);   
                renderVisualization(query)
            }
            else{
                let setScaledValueString = computeCustomCypher2D(maxValues,country,property,year,customQueryString)
                setDataFromQuery(setScaledValueString).then(()=> renderVisualization(customQueryString))
            }
        })
    }
    else if (customQueryString){ renderVisualization(customQueryString)  }
}

async function renderVisualization(query){
        getConfig(query).then(c =>{
            viz = new neo.default(c);
            console.log(viz)
            try{
                viz.render();
            }
            catch(error){
                alert(error)
            }
        })
}

