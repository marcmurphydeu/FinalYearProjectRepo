import {computeCypher, computeCustomCypher} from '../Models/QueryConstructors';
import {getMaxValues} from './DataController';
import {setDataFromQuery} from '../Models/DatabaseModel';
import getConfig from '../Models/2DVisualization';
import ReactDOM from 'react-dom';
import React from 'react';
import closeIcon from '../closeIcon.png';
import correctIcon from '../correctIcon.png';

// Function for displaying a graph based on the input (Form or Custom Query)
export default async function draw(country, property, year, limit, filter, isCustomQuery=false, customQueryString=null, container = null){
    // Check if there are any properties in the query, to get the max values
    if(property.length !== 0){
        getMaxValues(property, country, year,function(maxValues){
            let zeroCounts = 0
            Object.keys(maxValues).forEach(function(key) {
                // If no values are available,
                // the max Value is set to 1
                if(maxValues[key] === 0){
                    maxValues[key] = 1
                    zeroCounts += 1
                }
            });
            // Check if the query returned any data
            if(zeroCounts === property.length){
                alert("No data for this query")
            }else{
                if (!isCustomQuery){
                    // Get the Cypher query from the Query Constructor
                    let query = computeCypher(country,property,year,limit, filter, maxValues); 
                    // Display the graph 
                    renderVisualization(query)
                }
                else{
                    // Set the scaled value properties before displaying the current input query.
                    // The scaled value Cypher query uses the max values to set the properties' scaled value
                    let setScaledValueString = computeCustomCypher(maxValues,country,property,year,customQueryString)
                    setDataFromQuery(setScaledValueString).then(()=> renderVisualization(customQueryString, container, true))
                }
            }
        })
    }
    // If no properties are present, display the input query
    else if (customQueryString){ renderVisualization(customQueryString, container, true)  }
}


// Function for rendering the query using Neovis.js
// Neovis.js: https://github.com/neo4j-contrib/neovis.js/

var neo = require('neovis.js');

async function renderVisualization(query,container = null, customQuery = false){
    var viz;
    var element = <img src={closeIcon} id="correctImg" alt = "Close" />;
    // Invoke the model to obtain the configuration
    getConfig(query, container).then(async c =>{
            // The query is wrong until Neovis completes it
            if(customQuery){
                ReactDOM.render(element, document.getElementById('correctLabel'));
            }
            viz = new neo.default(c);
            // Display the graph
            await viz.render()

            // Listen to the completion event.
            // When the callback is executed, the icon is set to the 'tick'
            viz.registerOnEvent("completed", (e)=>{
                if (customQuery){
                    element = <img src={correctIcon} id="correctImg" alt = "Correct" />;
                    ReactDOM.render(element, document.getElementById('correctLabel'));
                }
            });
    });
}
