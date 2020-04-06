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
                console.log(maxValues)
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

// Called from the Model
// draw3D -> Model
// Model -> renderGraph
export function renderGraph(links, nodes,container=null){  
    // Configure where and how to display it
    const placement = container ? container : 'viz'
    const width = container ? document.getElementById('analysis8').offsetWidth-10 : window.innerWidth/2 -10
    const height = container ? document.getElementById('analysis8').offsetHeight-10 : 700-10
    const elem = document.getElementById(placement);

    // Transform the data to a format required by ForceGraph
    const gData = {nodes: Object.values(nodes), links: links}
    ForceGraph3D()(elem)
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