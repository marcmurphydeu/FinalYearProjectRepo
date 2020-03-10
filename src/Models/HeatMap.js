import {computeCypherForMap} from './QueryConstructors';
import {getDataFromQuery} from './DatabaseModel';



export async function getCountriesData(selectedCountries, selectedProperties, selectedYears, limit, filter, customQuery = null){
    var queryCountriesSize;
    var labels ={};
    if(!customQuery){
        queryCountriesSize = getDataFromQuery(computeCypherForMap(selectedCountries, selectedProperties, selectedYears, limit, filter))
                            .then(query_res=>{
                                return query_res.map(node_bundle=>{
                                    let property;
                                    let country;
                                    node_bundle.forEach(elem =>{
                                        if (elem.properties.country_name){
                                            country = elem
                                        }
                                        if (elem.properties.property){
                                            property = elem
                                        }
                                    })
                                    // Labels are not always the same 
                                    labels[country.properties.country_name] = property.properties.value
                                    return [country.properties.country_name, property.properties.value ]
                                })
                            })
    }
    else if (customQuery){
        queryCountriesSize = getDataFromQuery(customQuery)
                            .then(query_res=>{
                                return query_res.map(node_bundle=>{
                                    let property;
                                    let country;
                                    setLabels(node_bundle,labels)
                                    node_bundle.forEach(elem =>{
                                        if (elem.properties.country_name){
                                            country = elem
                                            
                                        }
                                        if (elem.properties.property){
                                            property = elem
                                        }
                                    })
                                    return [country.properties.country_name, property.properties.value ]
                                })
                            })
    }

    // Gets a list of the countries with their size, value and color
    // then it gets the countries positions (async) and set's a marker
    // for each of the countries with the information from the list
    return queryCountriesSize.then(l => normalizeNumbers(l, labels))
}

function setLabels(nodes,labels){
    switch(nodes.length){
        case 2:
            labels[nodes[0].properties.country_name] = nodes[1].properties.value //Where the first is the country and second is the value
            break;
        case 3: //For analysis
            nodes.forEach(node=>{
                if (node.properties.property === ("Population"||"PopulationWhereElevationIsBelow5Meters")){
                    labels[nodes[0].properties.country_name] = node.properties.value
                }
            })
            break;
        default:
            break;
    }
}

function normalizeNumbers(list, labels){
    let  maxDiameter = 30.0
    list.sort(function(a, b){return b[1]-a[1]});
    console.log(list)
    if (list[0][1] === 0){alert('There is no data for this query')}
    var newList = {}
    list.forEach((tuple,i)=>{
        
        if (i === 0){
            newList[tuple[0]] = {diameter:maxDiameter, value: tuple[1], colour: "#FF0000" , label: labels[tuple[0]]}
        }
        else{
            // For the diameter
            let p = (tuple[1]*100)/list[0][1]
            if (isNaN(p)){ p = 1}
            let d = (p/100)*maxDiameter

            let red = 255
            let calculateGreen = (p/100) * red 
            let green = 255 - calculateGreen

            newList[tuple[0]] = {diameter:d, value: tuple[1], colour: rgbToHex(Math.round(red), Math.round(green), 0), label: labels[tuple[0]]}
        }
    })
    return newList
}

const rgbToHex = (r, g, b) => '#' + [r, g, b]
  .map(x => x.toString(16).padStart(2, '0')).join('')
