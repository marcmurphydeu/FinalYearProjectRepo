import {getDataFromQuery} from '../Models/DatabaseModel';
import {maxValueQuery} from '../Models/QueryConstructors';

export async function getData(element){
    switch (element){
        case 'properties':
            return getDataFromQuery('MATCH (n) WHERE NOT (labels(n) = ["Year"]) RETURN distinct labels(n)')
        case 'countries':
            return getDataFromQuery('MATCH (c: Country) WHERE c.is_pure_country = True ' +
                                     'RETURN c.country_name')
        case 'otherCountries':
            return getDataFromQuery('MATCH (c: Country) WHERE c.is_pure_country = False ' +
                                    'RETURN c.country_name')
        default:
            break;
    }
}

export function getQueryExamples(){
    return ["MATCH(c:Country{country_name:'Spain'}) return c",
            "MATCH (c:Country)-[h:had]->(p:CO2Emissions)-[i:in]->(y:Year{year: 2013}) WHERE c.is_pure_country = true return c,h,p,y,i ORDER BY p.value DESC LIMIT 100",
            "MATCH (c:Country)-[h1:had]-> (area:LandAreaWhereElevationIsBelow5Meters) WITH ID(c) as countryID,area,h1  MATCH(c: Country)-[h:had]->(population:Population)-[i:in]->(y:Year) WHERE ID(c) = countryID  AND c.is_pure_country = true AND y.year = 2018 RETURN c,i,h,h1,population,area order by area.value desc limit 100"];
}

export function getMaxValues(properties, country, year, callback){
    var maxVals = {}
    var remaining = properties.length
    properties.forEach(p =>{
        getDataFromQuery(maxValueQuery(country, p, year)).then(result=>{
            if (result.length !== 0){
                maxVals[p] = result[0][0]
                remaining -= 1
                if (remaining === 0){
                    callback(maxVals)
                }
            }
        })
    })
    return maxVals
}

