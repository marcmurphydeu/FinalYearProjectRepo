// Usually p1 for property, n for country, y1 for year
function computeString(values, type, variable_name=null){
    let string = ``;
    let attribute = "";
    switch (type){
        case 'countries':
            attribute = '.country_name'
            break;
        case 'properties':
            attribute = '.property'
            break; 
        case 'years':
            attribute = '.year';
            break;
        default:
            break;
    }
    values.forEach((v) => {
        if (v === values[values.length-1]){
            if(variable_name){
                if (type === 'years'){
                    string += variable_name + `` + attribute + ` = `+v+``
                }else{
                    string += variable_name + `` + attribute + ` = "`+v+`"`
                }
            }
        }
        else {
            if(variable_name){
                if(type === 'years'){
                    string += variable_name + `` + attribute + ` = `+v+` or `
                }else{
                    string += variable_name + `` + attribute + ` = "`+v+`" or `
                }
            }
        }
    })
    return string;

}

export function computeCypher(country, property, year, limit, filter, pageRank = false){
    let cypher = `MATCH (n:Country)-[r:had]->(p1)-[i:in]->(y1:Year) WHERE (`+computeString(country,'countries','n')+`)  AND (`+computeString(property, 'properties','p1')+`)  AND (`+computeString(year,'years','y1')+`) `
    if (pageRank){
        let initialString = "CALL algo.pageRank.stream('MATCH (p) WHERE ("+computeString(country,'countries', "p")+") OR ("+computeString(property,'properties', "p")+") OR ("+computeString(year,'years', "p")+")  RETURN id(p) as id', '"
        cypher = initialString + cypher
        cypher += `RETURN id(p1) as source, id(y1) as target', {graph:'cypher'})
                   YIELD nodeId,score with algo.asNode(nodeId) as node, score order by score desc limit `+limit+`
                   RETURN node {.value, .country_name, .year, .property}, score `
    }
    else{
        cypher += `RETURN n, p1 as p, y1, r, i ORDER BY p.value ` +filter+ ` LIMIT `+limit+``
    }
    return cypher;
}

export function computeQueryFor3D(country, property, year, limit, filter, pageRank = false){
    let query = `MATCH (n:Country)-[r:had]->(p1)-[:in]->(y1:Year) WHERE (`+computeString(country, 'countries','n')+`)  AND (`+computeString(property,'properties','p1')+`)  AND (`+computeString(year,'years','y1')+`)
                RETURN {id: [id(n), id(p1)], label: [labels(n), labels(p1)], caption: [n.country_name, p1.value], size:[3,2] } as source, 
                {id: [id(p1), id(y1)], label:[labels(p1), labels(y1)], caption:[p1.value, y1.year], size:[3,y1.pageRank] } as target`
    return query;
}