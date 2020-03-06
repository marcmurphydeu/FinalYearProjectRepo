import ForceGraph3D from '3d-force-graph';
import neo4j from 'neo4j-driver';
import {computeQueryFor3D} from '../Models/QueryConstructors';
import {getMaxValues} from './DataController';
import {computeCustomCypher2D} from '../Models/QueryConstructors';
import {setDataFromQuery} from '../Models/DatabaseModel';




//PUT SESSION STUFF TO MODEL

export default async function draw3D (country, property, year, limit, filter, customQuery=null){
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );       
        const session = driver.session();
        const elem = document.getElementById('viz');

        if(property.length!==0){
            getMaxValues(property, country,year, async function(maxValues){
                Object.keys(maxValues).forEach(function(key) {
                    if(maxValues[key] === 0){
                        maxValues[key] = 1
                    }
                });
                const links = []
                const nodes = {}
                if(customQuery){
                    let setScaledValueString = computeCustomCypher2D(maxValues,country,property,year,customQuery)
                    await setDataFromQuery(setScaledValueString)
                    session.run(customQuery).then((res)=> {
                        res.records.forEach(batch =>{
                            console.log(batch)
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
                        const ids = new Set()
                        links.forEach(l => {ids.add(l.source);ids.add(l.target);});
                        const gData = { nodes: Object.values(nodes), links: links}
                        ForceGraph3D()(elem)
                                        .graphData(gData)
                                        .nodeAutoColorBy('label')
                                        .linkDirectionalArrowLength(6)
                                        .linkOpacity(0.6)
                                        .nodeVal('size')
                                        .linkAutoColorBy('type')
                                        .linkWidth('weight')
                                        .nodeAutoColorBy('community')
                                        .width(window.innerWidth/2 -15)
                                        .nodeLabel(node=> `${node.label}:${node.caption}`)
                                        .onNodeHover(node=>elem.style.cursor = node ? 'pointer':null);
                    
                    })
                    .catch(function (error) {
                        console.log(error);
                    });    
                }
                else{
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
                        const ids = new Set()
                        links.forEach(l => {ids.add(l.source);ids.add(l.target);});
                        const gData = { nodes: Object.values(nodes), links: links}
                        ForceGraph3D()(elem)
                                        .graphData(gData)
                                        .nodeAutoColorBy('label')
                                        .linkDirectionalArrowLength(6)
                                        .linkOpacity(0.6)
                                        .nodeVal('size')
                                        // .linkAutoColorBy('type')
                                        .linkWidth('weight')
                                        .nodeAutoColorBy('community')
                                        .width(window.innerWidth/2 -15)
                                        .nodeLabel(node=> `${node.label}:${node.caption}`)
                                        .onNodeHover(node=>elem.style.cursor = node ? 'pointer':null);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
               
            })
        }
        

        
        // var maxVal = await getDataFromQuery(maxValueQuery(country,property,year,limit,filter))
        // if (maxVal[0][0] === 0){maxVal = [1]}

        // console.log(computeQueryFor3D(country, property, year, limit, filter, maxValues))

    
}
