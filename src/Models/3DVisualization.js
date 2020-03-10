import {computeQueryFor3D} from './QueryConstructors';
import {renderGraph} from '../Controllers/3DController';

        
export function runCustomQuerySession(driver,customQuery,container){
        const links = []
        const nodes = {}
        const session = driver.session();
        session.run(customQuery).then((res)=> {
            res.records.forEach(batch =>{
                batch._fields.forEach(elem=>{
                    if (elem.properties.country_name){ //Country Node
                        nodes[elem.identity.toNumber()] = {id: elem.identity.toNumber(), 
                                                        caption: elem.properties.country_name,
                                                        label:elem.labels[0],
                                                        community: elem.properties.community,
                                                        size: 3}
                    }
                    if(elem.start){ //Relationship
                        links.push(Object.assign({source:elem.start.toNumber(), target:elem.end.toNumber()}, {weight: elem.properties.weight*10}))
                    }
                    if(elem.properties.property) {  // Property node
                        nodes[elem.identity.toNumber()] = {id: elem.identity.toNumber(), 
                                                            caption: elem.properties.value,
                                                            label:elem.labels[0],
                                                            community: elem.properties.community,
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
            session.close();
            renderGraph(links,nodes,container)
        })
        .catch(function (error) {
            alert(error);
        });   
    }

export function runQuerySession(maxValues,driver,country,property,year,limit,filter){
        const links = []
        const nodes = {}
        const session = driver.session();
        session.run(computeQueryFor3D(country, property, year, limit, filter, maxValues))
                .then(function (result) {
                    
                    result.records.forEach(r => { 
                        for (let i = 0; i<2; i++){
                            // Source information
                            nodes[r._fields[0].id[i].toNumber()] = {id: r._fields[0].id[i].toNumber(), 
                                                                    caption: r._fields[0].caption[i], 
                                                                    label: r._fields[0].label[i], 
                                                                    community: r._fields[0].community[i], 
                                                                    size: r._fields[0].size[i]}
    
                            // Target information
                            nodes[r._fields[1].id[i].toNumber()] = {id: r._fields[1].id[i].toNumber(), 
                                                                    caption: r._fields[1].caption[i], 
                                                                    label: r._fields[1].label[i], 
                                                                    community: r._fields[1].community[i], 
                                                                    size: r._fields[1].size[i]}
                            links.push(Object.assign({source:r._fields[0].id[i].toNumber(), target:r._fields[1].id[i].toNumber()}, r._fields[2]))
                        }
                    });
                    session.close();
                    renderGraph(links, nodes)
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    

    

