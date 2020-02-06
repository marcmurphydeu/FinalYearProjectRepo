export default function draw(country, property, year, limit, filter){
    var viz;
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
                "Property": {
                    "caption": "no clue",
                    "size": 2.0,
                    "community": "value"
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

        initial_cypher: `MATCH (n:Country {country_name: "`+country+`"})-[r:had]->(p1: `+property+`)-[i:in]->(y1:Year) WHERE y1.year = `+year+` RETURN n, p1 as p, y1, r, i ORDER BY p.value ` +filter+ ` LIMIT `+limit+``,
        arrows: true
    };
    var neo = require('neovis.js')
    viz = new neo.default(config);
    viz.render();

}
// export default function Visualization (props) {
//     var visualizationType = '2D'
    
//     return (
//         <div>
            
//             </div>
//         </div>
//     )
// }
