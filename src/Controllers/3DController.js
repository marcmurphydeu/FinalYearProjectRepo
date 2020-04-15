import ForceGraph3D from '3d-force-graph';
import {getMaxValues} from './DataController';
import {computeCustomCypher} from '../Models/QueryConstructors';
import {setDataFromQuery} from '../Models/DatabaseModel';
import {runCustomQuerySession, runQuerySession} from '../Models/3DVisualization';


// Initial function for displaying the graph (from Form or custom input)
export default async function draw3D (country, property, year, limit, filter, customQuery=null,container = null){  
    // Check if there are any properties in the query, to get the max values    
    if(property.length !== 0){
            getMaxValues(property, country,year, async function(maxValues){
                let zeroCount = 0
                Object.keys(maxValues).forEach(function(key) {
                    // If no values are available,
                    // the max Value is set to 1
                    if(maxValues[key] === 0){
                        maxValues[key] = 1
                        zeroCount += 1
                    }
                });
                // Check if the query returned any data
                if(zeroCount === property.length){
                    alert("There is no data for this query")
                }else{
                    if(customQuery){
                        // Set the scaled value properties before displaying the current input query.
                        // The scaled value Cypher query uses the max values to set the properties' scaled value
                        let setScaledValueString = computeCustomCypher(maxValues,country,property,year,customQuery)
                        setDataFromQuery(setScaledValueString).then(()=>runCustomQuerySession(customQuery,container))
                    }
                    else{
                        // Display Form query graph
                        runQuerySession(maxValues,country,property,year,limit,filter)
                    }
                }
                
            })
        }
        // If no properties are present, display the input query
        else if (customQuery){
            runCustomQuerySession(customQuery,container) 
        }
    }


// Function for displaying the graph using ForceGraph3D
// Force 3D-graph: https://github.com/vasturiano/3d-force-graph
// Github inspiration: https://medium.com/neo4j/visualizing-graphs-in-3d-with-webgl-9adaaff6fe43
var graph;
// Called from the Model
// draw3D -> Model
// Model -> renderGraph
export function renderGraph(links, nodes,container=null){  
    // Configure where and how to display it
    const placement = container ? container : 'viz'
    const elem = document.getElementById(placement);
    const width = container ? document.getElementById('analysis8').offsetWidth-10 : elem.offsetWidth-10
    const height = container ? document.getElementById('analysis8').offsetHeight-10 : elem.offsetHeight-10
    

    // Transform the data to a format required by ForceGraph
    const gData = {nodes: Object.values(nodes), links: links}
    graph = ForceGraph3D()(elem)
                    .graphData(gData) // The data
                    .linkDirectionalArrowLength(6) // Arrow size
                    .linkOpacity(0.6) 
                    .nodeVal('size') // Size of the node
                    .linkWidth('weight') // Thickness of relationship
                    .nodeAutoColorBy('community') // Colour of nodes
                    .width(width) // Width of visualization
                    .height(height) // Height of visualization
                    .nodeLabel(node=> `${node.label}:${node.caption}`)  // Labels of nodes
                    .onNodeHover(node=>elem.style.cursor = node ? 'pointer':null); // Show info on hover
    
}

export function refresh(zooming){
    if (graph){
        if(zooming){
            graph.width(window.innerWidth-10)
            graph.height(window.innerHeight-10)
        }
        if(!zooming){
            const viz = document.getElementById('viz')
            graph.width(viz.offsetWidth -10)
            graph.height(viz.offsetHeight-10)
        }

    }
}