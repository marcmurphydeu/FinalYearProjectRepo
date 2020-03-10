import ForceGraph3D from '3d-force-graph';
import neo4j from 'neo4j-driver';
import {getMaxValues} from './DataController';
import {computeCustomCypher2D} from '../Models/QueryConstructors';
import {setDataFromQuery} from '../Models/DatabaseModel';
import {runCustomQuerySession, runQuerySession} from '../Models/3DVisualization';

export default async function draw3D (country, property, year, limit, filter, customQuery=null,container = null){
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );       
        if(property.length !== 0){
            getMaxValues(property, country,year, async function(maxValues){
                let zeroCount = 0
                Object.keys(maxValues).forEach(function(key) {
                    if(maxValues[key] === 0){
                        maxValues[key] = 1
                        zeroCount += 1
                    }
                });
                if(zeroCount === property.length){
                    alert("There is no data for this query")
                }else{
                    if(customQuery){
                        let setScaledValueString = computeCustomCypher2D(maxValues,country,property,year,customQuery)
                        await setDataFromQuery(setScaledValueString)
                        runCustomQuerySession(driver,customQuery,container) 
                    }
                    else{
                        runQuerySession(maxValues,driver,country,property,year,limit,filter)
                    }
                }
                
            })
        }
        else if (customQuery){
            runCustomQuerySession(driver,customQuery,container) 
        }
    }


export function renderGraph(links, nodes,container=null){  
    const placement = container ? container : 'viz'
    const width = container ? document.getElementById('analysis8').offsetWidth-10 : window.innerWidth/2 -10
    const height = container ? document.getElementById('analysis8').offsetHeight-10 : 700-10
    const elem = document.getElementById(placement);
    const ids = new Set()
    links.forEach(l => {ids.add(l.source);ids.add(l.target);});
    const gData = { nodes: Object.values(nodes), links: links}
    ForceGraph3D()(elem)
                    .graphData(gData)
                    .nodeAutoColorBy('label')
                    .linkDirectionalArrowLength(6)
                    .linkOpacity(0.6)
                    .nodeVal('size')
                    .linkWidth('weight')
                    .nodeAutoColorBy('community')
                    .width(width)
                    .height(height)
                    .nodeLabel(node=> `${node.label}:${node.caption}`)
                    .onNodeHover(node=>elem.style.cursor = node ? 'pointer':null);
    
}