import {computeCypherForMap} from './QueryConstructors';
import {getDataFromQuery} from './DatabaseModel';
import ReactDOM from 'react-dom';
import React from 'react';
import closeIcon from '../closeIcon.png';
import correctIcon from '../correctIcon.png';

// Function for running either a custom query or a form query. Then, the labels are created and 
// a dictionary is computed in the normalizeNumbers() function containing the country's information.
export async function getCountriesData(selectedCountries, selectedProperties, selectedYears, limit, filter, customQuery = null){
    var queryCountriesSize;
    var labels ={};
    var element = <img src={correctIcon} id = "correctImg" alt = "Correct" />;
    if(!customQuery){
        // List of country-property values 
        // Gets the Cypher query from the Query Constructor
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
                                    // Labels are not always the same (f.e. in Analysis)
                                    labels[country.properties.country_name] = property.properties.value
                                    return [country.properties.country_name, property.properties.value ]
                                })
                            })
    }
    else if (customQuery){
        // Like above, but the custom query is computed directly
        queryCountriesSize = getDataFromQuery(customQuery)
                            .then(query_res=>{
                                // Display 'tick' if correct query
                                if(customQuery){
                                    ReactDOM.render(element, document.getElementById('correctLabel'));
                                }
                                return query_res.map(node_bundle=>{
                                    // The bundle is a list of nodes and relationships.
                                    let property;
                                    let country;
                                    // Set the labels for the markers
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
                            // If error in query, display 'error' icon
                            .catch(() => {
                                if (customQuery){
                                    element = <img src={closeIcon} id = "correctImg" alt = "Correct" />;
                                    ReactDOM.render(element, document.getElementById('correctLabel'));
                                }
                                // Null is returned to avoid redundant computation
                                return null
                            });  
    }
    // Wait for the response, since the database calls are asynchronous
    let awaitedCountriesSize = await queryCountriesSize
    return awaitedCountriesSize ? normalizeNumbers(awaitedCountriesSize, labels) : null
}

// Function for setting the labels for each marker on the map
function setLabels(nodes,labels){
    switch(nodes.length){
        case 2:
            labels[nodes[0].properties.country_name] = nodes[1].properties.value //Where the first is the country and second is the property
            break;
        case 4: //For map analysis (example of population affected if sea levels rise)
                let population; 
                let populationPercentage;
                let country_name;
                nodes.forEach(node=>{
                
                if(node.labels[0] === "Country"){ // Country node
                    country_name = node.properties.country_name
                }
                if (node.properties.property === ("Population")){ // Property node
                    population = node.properties.value
                }
                else if (node.properties.property === ("PopulationWhereElevationIsBelow5Meters")){ // Property node
                    populationPercentage = node.properties.value
                }
            })
            // Set the label for this particular analysis example
            labels[country_name] = Math.ceil(population*(populationPercentage/100))
            break;
        default:
            break;
    }
}


// Function for creating a dictionary of countries containing the necessary
// information for displaying them, the marker and labels on the map. 
function normalizeNumbers(list, labels){
    // Maximum size of the marker is assigned to the maximum property value
    let  maxDiameter = 30.0
    // Sort the list in descending order
    list.sort(function(a, b){return b[1]-a[1]});
    if (list[0][1] === 0){alert('There is no data for this query')}
    var newList = {}
    list.forEach((tuple,i)=>{
        // The first element is the country with highest property value  
        if (i === 0){
            newList[tuple[0]] = {diameter:maxDiameter, value: tuple[1], colour: "#FF0000" , label: labels[tuple[0]]}
        }
        // The others are scaled down, compared to the maximum value
        else{
            // For the diameter
            let p = (tuple[1]*100)/list[0][1]
            if (isNaN(p)){ p = 1} // Display a small marker if there is no data available for that country
            let d = (p/100)*maxDiameter

            // Calculate the colour gradient. The higher the value, the redder the colour. The lower, the greener. 
            let red = 255
            let calculateGreen = (p/100) * red 
            let green = 255 - calculateGreen

            newList[tuple[0]] = {diameter:d, value: tuple[1], colour: rgbToHex(Math.round(red), Math.round(green), 0), label: labels[tuple[0]]}
        }
    })
    return newList
}

// Function obtained from Stack overflow for converting rbg values to hexadecimal
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const rgbToHex = (r, g, b) => '#' + [r, g, b]
  .map(x => x.toString(16).padStart(2, '0')).join('')


