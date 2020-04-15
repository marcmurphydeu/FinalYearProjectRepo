import {getData} from '../Controllers/DataController';

// neo4j://3e5378d8.databases.neo4j.io
// sDeAy2xzSR4afLgJ2eyUMJmy6_PsrM2sKOmikipLOKU

// Neovis.js: 
// https://github.com/neo4j-contrib/neovis.js/

// Computes the configuration needed for Neovis to display a graph
// It requires an object containing the database connection details,
// the relationships and labels expected from the query. 
export default async function getConfig(query = null, container=null){
    let placement = container ? container : 'viz'
    var config = {
        container_id: placement,
        server_url:"neo4j://3e5378d8.databases.neo4j.io", // Running locally
        server_user:"neo4j",
        server_password: "sDeAy2xzSR4afLgJ2eyUMJmy6_PsrM2sKOmikipLOKU",
        encrypted:"ENCRYPTION_ON",
        labels: {},
        // Define the relationships
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

    // Define the query
    if(query){
        config.initial_cypher = query
    }

    // Define the properties
    let properties = await getData('properties')
    properties.forEach(p=>{
    config.labels[(p[0][0])] =  {
        "caption": "property",
        "size":"scaledValue",
        "community":"community"
        }
    })

    // Define the countries
    config.labels["Country"] = {
        "caption": "country_name",
        "size": 5,
        "community": "community"
    }
    // Define the years
    config.labels["Year"] = {
        "caption": "year",
        "size": 5,
        "community": "community"
    }

    return config;
}

