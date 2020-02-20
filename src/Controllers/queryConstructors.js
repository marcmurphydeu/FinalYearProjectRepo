export function countryString(countries, variable_name = null){
    let string = ``
    countries.forEach((c) => {
        if (c === countries[countries.length-1]){
            if(variable_name){
                string += variable_name + `.country_name = "`+c+`"`
            }else{
                string += `n.country_name = "`+c+`"` 
            }
            
        }
        else {
            if(variable_name){
                string += variable_name + `.country_name = "`+c+`" or `
            }else{
                string += `n.country_name = "`+c+ `" or `
            }
            
        }
    })
    return string
}

export function propertyString(properties, variable_name=null){
    let string = ``
    properties.forEach((p) => {
        if (p === properties[properties.length-1]){
            if(variable_name){
                string += variable_name+`.property = "`+p+`"` 
            }else{
                string += `p1.property = "`+p+`"` 
            }
            
        }
        else {
            if(variable_name){
                string += variable_name+`.property = "`+p+`" or ` 
            }else{
                string += `p1.property = "`+p+ `" or `
            }
        }
    })
    return string
}

export function yearString(years, variable_name=null){
    let string = ``
    years.forEach((y) => {
        if (y === years[years.length-1]){
            if(variable_name){
                string += variable_name+`.year = `+y+`` 
            }else{
                string += `y1.year = `+y+`` 
            }
            
        }
        else {
            if(variable_name){
                string += variable_name+`.year = `+y+ ` or `
            }else{
                string += `y1.year = `+y+ ` or `
            }
            
        }
    })
    return string
}

export function computeCypher(country, property, year, limit, filter, pageRank = false){
    let cypher = `MATCH (n:Country)-[r:had]->(p1)-[i:in]->(y1:Year) WHERE (`+countryString(country)+`)  AND (`+propertyString(property)+`)  AND (`+yearString(year)+`) `
    if (pageRank){
        let initialString = "CALL algo.pageRank.stream('MATCH (p) WHERE ("+countryString(country, "p")+") OR ("+propertyString(property, "p")+") OR ("+yearString(year, "p")+")  RETURN id(p) as id', '"
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
    let query = `MATCH (n:Country)-[r:had]->(p1)-[:in]->(y1:Year) WHERE (`+countryString(country)+`)  AND (`+propertyString(property)+` or (`+propertyString(property)+`) )  AND (`+yearString(year)+`)
                RETURN [id(n), id(p1)] as source, [id(p1), id(y1)] as target`
    return query;
}