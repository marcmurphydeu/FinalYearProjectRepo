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

// Very important method.
export function computeCypher(country, property, year, limit, filter, maxValues = 1){
    // Must remove double quotes in the stringified version
    maxValues = JSON.stringify(maxValues)
    maxValues = maxValues.replace(/['"]+/g, '')

    let cypher = `UNWIND [`+maxValues+`] as mValues
                  MATCH (n:Country)-[r:had]->(p1)-[i:in]->(y1:Year) WHERE (p1.value <> 0.0) AND (`+computeString(country,'countries','n')+`)  AND (`+computeString(property, 'properties','p1')+`)  AND (`+computeString(year,'years','y1')+`)
                  AND (p1.value <> 0.0)
                  SET p1.scaledValue = ceil((p1.value/mValues[p1.property]) * 50), r.weight = p1.scaledValue/10 `
        cypher += `RETURN distinct n, id(n) as id,p1 as p, y1, r, i ORDER BY p.value ` +filter+ ` LIMIT `+limit+``
    return cypher;
}

export function computeCypherForMap(country, property, year, limit, filter){
    let cypher = `MATCH (n:Country)-[r:had]->(p1)-[i:in]->(y1:Year) WHERE (`+computeString(country,'countries','n')+`)  AND 
                    (`+computeString(property, 'properties','p1')+`)  AND (`+computeString(year,'years','y1')+`)`
        cypher += `RETURN n, p1 as p, y1, r, i ORDER BY p.value ` +filter+ ` LIMIT `+limit+``
    return cypher;
}

export function computeQueryFor3D(country, property, year, limit, filter, maxValues = 1){
    
    maxValues = JSON.stringify(maxValues)
    maxValues = maxValues.replace(/['"]+/g, '')

    let query = `UNWIND [`+maxValues+`] as mValues
                MATCH (n:Country)-[r:had]->(p1)-[:in]->(y1:Year) WHERE (p1.value <> 0.0) AND (`+computeString(country, 'countries','n')+`)  AND (`+computeString(property,'properties','p1')+`)  AND (`+computeString(year,'years','y1')+`)
                SET p1.scaledValue = ceil((p1.value/mValues[p1.property])*50), r.weight=p1.scaledValue/10 
                RETURN {id: [id(n), id(p1)], label: [labels(n), labels(p1)], 
                        caption: [n.country_name, p1.value], 
                        community:[n.community, labels(p1)], 
                        size:[3,p1.scaledValue] } as source, 
                        
                        {id: [id(p1), id(y1)], label:[labels(p1), labels(y1)], 
                        caption:[p1.value, y1.year], 
                        community:[labels(p1), y1.community], 
                        size:[p1.scaledValue,3] } as target, 
                        
                        {weight: r.weight, type:type(r)} as rel

                        ORDER BY p1.value `+filter+` LIMIT `+limit+``
    return query;
}

export function maxValueQuery(country, property, year){
    year = Array.from(new Set(year))
    var countryString = ''
    var propertyString = ''
    var yearString = ''
    if (country.length !== 0){
        countryString = `(`+computeString(country, 'countries','n')+`)  AND`
    }
    if(property.length !==0){
        propertyString = `(p1: `+property+`)  AND `
    }
    if(year.length !== 0){
        yearString = `(`+computeString(year,'years','y1')+`) AND `
    }

    return `MATCH (n:Country)-[r:had]->(p1)-[i:in]->(y1:Year) 
            WHERE `  + countryString + ` ` +propertyString+ ` `+yearString + `
            TOSTRING(p1.value)<>'NaN' Return p1.value order by p1.value DESC LIMIT 1`          
}

export function computeCustomCypher2D(maxValues, country, property, year){
    year = Array.from(new Set(year))
    maxValues = JSON.stringify(maxValues)
    maxValues = maxValues.replace(/['"]+/g, '')

    var countryString = ''
    var propertyString = ''
    var yearString = ''
    if (country.length !== 0){
        countryString = `(`+computeString(country, 'countries','n')+`)`
        if (year.length !== 0 || property.length !==0){
            countryString += ` AND`
        }
    }
    if(property.length !==0){
        propertyString = `(`+computeString(property, 'properties','p1')+`)`
        if(year.length !==0){
            propertyString+= ` AND`
        }
    }
    if(year.length !== 0){
        yearString = `(`+computeString(year,'years','y1')+`) `
    }

    return `UNWIND [`+maxValues+`] as mValues MATCH (n:Country)-[r:had]->(p1)-[:in]->(y1:Year) 
            WHERE `  + countryString + ` ` +propertyString+ ` `+yearString + `
            SET p1.scaledValue = p1.value/mValues[p1.property]*50,  r.weight = p1.scaledValue/10`
}