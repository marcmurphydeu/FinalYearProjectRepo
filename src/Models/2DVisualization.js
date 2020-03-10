import {getData} from '../Controllers/DataController';



export default async function getConfig(query = null, container=null){
    let placement = container ? container : 'viz'
    var config = {
        container_id: placement,
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
        arrows: true
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

