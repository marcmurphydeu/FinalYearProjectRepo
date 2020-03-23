import {computeCypher, computeCustomCypher2D} from '../Models/QueryConstructors';
import {getMaxValues} from './DataController';
import {setDataFromQuery} from '../Models/DatabaseModel';
import getConfig from '../Models/2DVisualization';


var viz;
var neo = require('neovis.js');


export default async function draw(country, property, year, limit, filter, isCustomQuery=false, customQueryString=null, container = null){
    if(property.length !== 0){
        getMaxValues(property, country, year,function(maxValues){
            let zeroCounts = 0
            Object.keys(maxValues).forEach(function(key) {
                if(maxValues[key] === 0){
                    maxValues[key] = 1
                    zeroCounts += 1
                }
            });
            if(zeroCounts === property.length){
                alert("No data for this query")
            }else{
                if (!isCustomQuery){
                    let query = computeCypher(country,property,year,limit, filter, maxValues); 
                    console.log(query)  
                    renderVisualization(query)
                }
                else{
                    let setScaledValueString = computeCustomCypher2D(maxValues,country,property,year,customQueryString)
                    setDataFromQuery(setScaledValueString).then(()=> renderVisualization(customQueryString, container))
                }
            }
        })
    }
    else if (customQueryString){ renderVisualization(customQueryString, container)  }
}

async function renderVisualization(query,container = null){
        getConfig(query, container).then(async c =>{
            viz = new neo.default(c);
            try{
                await viz.render();
            }
            catch(error){
                alert("Could not display query: ", error)
            }
        })
}