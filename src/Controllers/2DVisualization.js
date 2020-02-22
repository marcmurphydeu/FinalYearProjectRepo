import {getPageRank, setPageRankOfQuery} from '../Models/DatabaseModel'
import {computeCypher} from '../Models/QueryConstructors';


export default function draw(country, property, year, limit, filter){
    var viz;
    // console.log(computeCypher(country, property, year, limit, filter,true))
    // getPageRank(computeCypher(country,property,year,limit,filter,true)).then(res => console.log(res))
    // console.log(setPageRankOfQuery(computeCypher(country,property,year,limit,filter,true)))
    var config = {
        container_id: "viz",
        server_url:"bolt://localhost:7687",
        server_user:"neo4j",
        server_password: "fender14",
        labels: {
                "Country" : {
                    "caption": "country_name",
                    "size": "pageRank",
                    "community": "country_name",
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
        initial_cypher: computeCypher(country,property,year,limit, filter),
        arrows: true
    };

    property.forEach(p=>{
        config.labels[p] =  {
            "caption": "property",
            "size":"pageRank",
            "community":"property"
            }
    })

    
    // console.log(config)

    var neo = require('neovis.js')
    viz = new neo.default(config);
    viz.render();

}