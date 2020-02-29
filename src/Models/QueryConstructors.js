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
                string += variable_name + `` + attribute 
                if (type === 'years'){
                    string += ` = `+v+``
                }else{
                    string += ` = "`+v+`"`
                }
            }
        }
        else {
            if(variable_name){
                string += variable_name + `` + attribute
                if(type === 'years'){
                    string += ` = `+v+` or `
                }else{
                    string += ` = "`+v+`" or `
                }
            }
        }
    })
    return string;

}

export function computeCypher(country, property, year, limit, filter, maxValue = 1){
    let cypher = `MATCH (n:Country)-[r:had]->(p1)-[i:in]->(y1:Year) WHERE (`+computeString(country,'countries','n')+`)  AND (`+computeString(property, 'properties','p1')+`)  AND (`+computeString(year,'years','y1')+`)
                  SET p1.scaledValue = (p1.value/`+maxValue+`)*50 `
        cypher += `RETURN n, p1 as p, y1, r, i ORDER BY p.value ` +filter+ ` LIMIT `+limit+``
    return cypher;
}

export function computeQueryFor3D(country, property, year, limit, filter, maxValue = 1){
    let query = `MATCH (n:Country)-[r:had]->(p1)-[:in]->(y1:Year) WHERE (`+computeString(country, 'countries','n')+`)  AND (`+computeString(property,'properties','p1')+`)  AND (`+computeString(year,'years','y1')+`)
                SET p1.scaledValue = (p1.value/`+maxValue+`)*50 
                RETURN {id: [id(n), id(p1)], label: [labels(n), labels(p1)], caption: [n.country_name, p1.value], size:[3,p1.scaledValue] } as source, 
                {id: [id(p1), id(y1)], label:[labels(p1), labels(y1)], caption:[p1.value, y1.year], size:[p1.scaledValue,3] } as target ORDER BY p1.value `+filter+` LIMIT `+limit+``
    return query;
}


export function maxValueQuery(country, property, year){
    return `MATCH (n:Country)-[r:had]->(p1)-[i:in]->(y1:Year) 
                WHERE (`+computeString(country, 'countries','n')+`)  AND
                      (`+computeString(property, 'properties','p1')+`)  AND 
                      (`+computeString(year,'years','y1')+`) AND
                      TOSTRING(p1.value)<>'NaN' Return p1.value order by p1.value DESC LIMIT 1`
}