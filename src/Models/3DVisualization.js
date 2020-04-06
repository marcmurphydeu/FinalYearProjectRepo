import {computeQueryFor3D} from './QueryConstructors';
import {renderGraph} from '../Controllers/3DController';
import ReactDOM from 'react-dom';
import React from 'react';
import closeIcon from '../closeIcon.png';
import correctIcon from '../correctIcon.png';
import {getDataFromQuery} from './DatabaseModel';

// Force 3D-graph: https://github.com/vasturiano/3d-force-graph
// Github inspiration: https://medium.com/neo4j/visualizing-graphs-in-3d-with-webgl-9adaaff6fe43

// Run the custom query string and convert the result to a source/node format
// where the id, caption, label, community and size of each node is included.
export function runCustomQuerySession(customQuery,container){
        const links = []
        const nodes = {}
        var element = <img src={correctIcon} id = "correctImg" alt = "Close" />;
        // Run custom query
        getDataFromQuery(customQuery).then((res)=> {
            res.forEach(batch =>{
                batch.forEach(elem=>{
                    if (elem.properties.country_name){ //Country Node
                        nodes[elem.identity.toNumber()] = {id: elem.identity.toNumber(), 
                                                        caption: elem.properties.country_name,
                                                        label:elem.labels[0],
                                                        community: elem.properties.community,
                                                        size: 3}
                    }
                    if(elem.start){ //Relationship
                        links.push(Object.assign({source:elem.start.toNumber(), target:elem.end.toNumber()}, {weight: elem.properties.weight}))
                    }
                    if(elem.properties.property) {  // Property node
                        nodes[elem.identity.toNumber()] = {id: elem.identity.toNumber(), 
                                                            caption: elem.properties.value,
                                                            label:elem.labels[0],
                                                            community: elem.properties.property, // Community is the property
                                                            size: elem.properties.scaledValue}
                        }
                    if(elem.properties.year) {  // Year node
                        nodes[elem.identity.toNumber()] = {id: elem.identity.toNumber(), 
                                                            caption: elem.properties.year,
                                                            label:elem.labels[0],
                                                            community: elem.properties.community,
                                                            size: 3}
                    }
                })
            });
            // If correct, add 'tick' icon
            if(customQuery){
                ReactDOM.render(element, document.getElementById('correctLabel'));
            }
            // Display graph
            renderGraph(links,nodes,container)
        })
        //If incorrect, display 'cross' icon
        .catch(function () {
            if (customQuery){
                element = <img src={closeIcon} id = "correctImg" alt = "Correct" />;
                ReactDOM.render(element, document.getElementById('correctLabel'));
            }
        });   
    }


// Equivalent function to the above but for the Form input. The query is obtained from
// the query constructor. Then it is run and the response is converted to the source/target format
export function runQuerySession(maxValues,country,property,year,limit,filter){
        const links = []
        const nodes = {}
        // const session = driver.session();
        getDataFromQuery(computeQueryFor3D(country, property, year, limit, filter, maxValues))
                .then(function (result) {
                    result.forEach(r => { 
                        for (let i = 0; i<2; i++){
                            // Source information
                            nodes[r[0].id[i].toNumber()] = {id: r[0].id[i].toNumber(), 
                                                                    caption: r[0].caption[i], 
                                                                    label: r[0].label[i], 
                                                                    community: r[0].community[i], 
                                                                    size: r[0].size[i]}
    
                            // Target information
                            nodes[r[1].id[i].toNumber()] = {id: r[1].id[i].toNumber(), 
                                                                    caption: r[1].caption[i], 
                                                                    label: r[1].label[i], 
                                                                    community: r[1].community[i], 
                                                                    size: r[1].size[i]}
                            links.push(Object.assign({source:r[0].id[i].toNumber(), target:r[1].id[i].toNumber()}, r[2])) //r[2] is the relationship
                        }
                    });
                    // Display graph
                    renderGraph(links, nodes)
                })
                .catch(function (error) {
                    // Alert the error to the user
                    alert(error);
                });
    }

    

    

