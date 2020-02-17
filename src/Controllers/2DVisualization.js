import {getPageRank} from '../Models/DatabaseModel'


function countryString(countries){
    let string = ``
    countries.forEach((c) => {
        if (c === countries[countries.length-1]){
            string += `n.country_name = "`+c+`"` 
        }
        else {
            string += `n.country_name = "`+c+ `" or `
        }
    })
    return string
}

function propertyString(properties){
    let string = ``
    properties.forEach((p) => {
        if (p === properties[properties.length-1]){
            string += `labels(p1) = ["`+p+`"]` 
        }
        else {
            string += `labels(p1) = ["`+p+ `"] or `
        }
    })
    return string
}

function yearString(years){
    let string = ``
    years.forEach((y) => {
        if (y === years[years.length-1]){
            string += `y1.year = `+y+`` 
        }
        else {
            string += `y1.year = `+y+ ` or `
        }
    })
    return string
}

export function computeCypher(country, property, year, limit, filter, pageRank = false){
    let cypher = `MATCH (n:Country)-[r:had]->(p1)-[i:in]->(y1:Year) WHERE (`+countryString(country)+`)  AND (`+propertyString(property)+`)  AND (`+yearString(year)+`) `
    if (pageRank){
        let initialString = "CALL algo.pageRank.stream('MATCH (p)  RETURN id(p) as id', '"
        cypher = initialString + cypher
        cypher += `RETURN id(p1) as source, id(y1) as target', {graph:'cypher'})
                   YIELD nodeId,score with algo.asNode(nodeId) as node, score order by score desc LIMIT 20
                   RETURN node {.value, .country_name, .year}, score `
    }
    else{
        cypher += `RETURN n, p1 as p, y1, r, i ORDER BY p.value ` +filter+ ` LIMIT `+limit+``
    }
    return cypher;
}

export default function draw(country, property, year, limit, filter){
    var viz;
    console.log(getPageRank(computeCypher(country,property,year,limit,filter,true)).then(res => console.log(res)))
    var config = {
        container_id: "viz",
        server_url:"bolt://localhost:7687",
        server_user:"neo4j",
        server_password: "fender14",
        labels: {
                "Country" : {
                    "caption": "country_name",
                    "size": 3.0,
                    "community": "country_name"
                },
                [property[0]]:{
                    "caption" : "a", "size": 10.0, "community":"value",  
                },
                "Year":{
                    "caption": "year",
                    "size": 1.0,
                    "community": "year"
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
    var neo = require('neovis.js')
    viz = new neo.default(config);
    viz.render();

}