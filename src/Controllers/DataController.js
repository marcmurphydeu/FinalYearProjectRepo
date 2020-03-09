import {getDataFromQuery} from '../Models/DatabaseModel';
import {maxValueQuery} from '../Models/QueryConstructors';

export async function getData(element){
    switch (element){
        case 'properties':
            return getDataFromQuery('MATCH (n) WHERE NOT (labels(n) = ["Year"] OR labels(n)=["Country"]) RETURN distinct labels(n)')
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
            "MATCH (c:Country)-[h1:had]-> (area:LandAreaWhereElevationIsBelow5Meters) WITH ID(c) as countryID,area  MATCH(c: Country)-[h:had]->(population:Population)-[i:in]->(y:Year) WHERE ID(c) = countryID  AND c.is_pure_country = true AND y.year = 2018 RETURN c,population,area order by area.value desc limit 100",
            "MATCH (c:Country{is_pure_country:true})-[h1:had]->(p:CO2Emissions)-[i1:in]->(y:Year{year:2014}) WHERE (p.value <>  0.0) WITH c,p,y,h1,i1 ORDER BY p.value DESC LIMIT 10 MATCH (c)-[h2:had]->(r:RenewableEnergyConsumption)-[i2:in]->(y) WHERE (r.value <>  0.0) return c,p,y,h1,i1,h2,i2,r",
            "MATCH (c:Country{is_pure_country:true})-[h1:had]->(p:RenewableEnergyConsumption)-[i1:in]->(y:Year{year:2014}) WHERE (p.value <>  0.0) WITH c,p,y,h1,i1 ORDER BY p.value DESC LIMIT 10 MATCH (c)-[h2:had]->(r:CO2Emissions)-[i2:in]->(y) WHERE (r.value <>  0.0) return c,p,y,h1,i1,h2,i2,r",
            "MATCH(c:Country)-[h1:had]->(p:AgriculturalLand)-[i1:in]->(y:Year{year:2016}) WHERE (p.value <> 0.0) WITH c,p,y,i1,h1 ORDER BY p.value desc limit 20 MATCH (c)-[h2:had]-(l:ArableLand)-[i2:in]->(y) WHERE (l.value <> 0.0) return c,p,y,l,i1,i2,h1,h2",
            "MATCH(c:Country)-[h1:had]->(p:ForestArea)-[i1:in]->(y:Year{year:2016}) WHERE (p.value <> 0.0) WITH c,p,y,i1,h1 ORDER BY p.value desc limit 20 MATCH (c)-[h2:had]-(l:TerrestrialProtectedAreas)-[i2:in]->(y) WHERE (l.value <> 0.0) return c,p,y,l,i1,i2,h1,h2",
            "MATCH(c:Country)-[h1:had]->(t:TerrestrialProtectedAreas)-[i1:in]->(y:Year{year:2016}) WHERE (t.value <> 0.0) WITH c,y,i1,h1,t ORDER BY t.value desc limit 20 MATCH (c)-[h2:had]-(f:ForestArea)-[i2:in]->(y) WHERE (f.value <> 0.0) return c,y,t,f,i1,i2,h1,h2",
            "MATCH(c:Country)-[h:had]->(t:TerrestrialProtectedAreas)-[i:in]->(y:Year{year:2018}) WHERE (t.value <> 0.0) AND (c.is_pure_country = true) return c,h,t,i,y  ORDER BY t.value desc limit 10 UNION MATCH (c:Country)-[h:had]-(t:MarineProtectedAreas)-[i:in]->(y:Year{year:2018}) WHERE (t.value <> 0.0) AND (c.is_pure_country = true) return c,h,t,i,y  ORDER BY t.value desc limit 10",
            "MATCH(c:Country)-[h1:had]->(p)-[i1:in]->(y:Year) WHERE (p.value <> 0.0) AND (c.country_name = 'Low income') AND(y.year=2015 or y.year=1978) AND (p.property='ElectricityFromNaturalSources' or p.property='ElectricityFromNuclearSources' or p.property='ElectricityFromOilSources' or p.property='ElectricityFromHydroelectricSources' or p.property='ElectricityFromRenewableSources' or p.property='ElectricityFromCoalSources') return c,y,h1,p,i1 ORDER BY p.value desc limit 250",
            "MATCH(c:Country)-[h1:had]->(p)-[i1:in]->(y:Year) WHERE (p.value <> 0.0) AND (c.country_name = 'Middle income') AND(y.year=2015 or y.year=1978) AND (p.property='ElectricityFromNaturalSources' or p.property='ElectricityFromNuclearSources' or p.property='ElectricityFromOilSources' or p.property='ElectricityFromHydroelectricSources' or p.property='ElectricityFromRenewableSources' or p.property='ElectricityFromCoalSources') return c,y,h1,p,i1 ORDER BY p.value desc limit 250",
            "MATCH(c:Country)-[h1:had]->(p)-[i1:in]->(y:Year) WHERE (p.value <> 0.0) AND (c.country_name = 'High income') AND(y.year=2015 or y.year=1978) AND (p.property='ElectricityFromNaturalSources' or p.property='ElectricityFromNuclearSources' or p.property='ElectricityFromOilSources' or p.property='ElectricityFromHydroelectricSources' or p.property='ElectricityFromRenewableSources' or p.property='ElectricityFromCoalSources') return c,y,h1,p,i1 ORDER BY p.value desc limit 250"];
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

