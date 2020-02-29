import {computeCypher, maxValueQuery} from '../Models/QueryConstructors';
import {getDataFromQuery,} from '../Models/DatabaseModel';

export default async function draw(country, property, year, limit, filter){
    var viz;
    var query;
    var maxVal = await getDataFromQuery(maxValueQuery(country,property,year,limit,filter))
    query = computeCypher(country,property,year,limit, filter, maxVal[0]);

    var config = {
        container_id: "viz",
        server_url:"bolt://localhost:7687",
        server_user:"neo4j",
        server_password: "fender14",
        labels: {
                "Country" : {
                    "caption": "country_name",
                    "size": 5.0,
                    "community": "country_name"
                },
                "Year":{
                    "caption": "year",
                    "size": "pageRank",
                    "community": "year",
                }
            },
        relationships: {
            "had": {
            "thickness": "no clue",
            "caption": true,
            "community": "value"
            },
            "in":{
            "thickness": "no clue",
            "caption": true,
            "community": 'value'
            }
        
            },
        initial_cypher: query,
        arrows: true
    };


    console.log(query)
    property.forEach(p=>{
        config.labels[p] =  {
            "caption": "property",
            "size":"scaledValue",
            "community":"property"
            }
    })
    

    var neo = require('neovis.js')
    viz = new neo.default(config);
    viz.render();

}