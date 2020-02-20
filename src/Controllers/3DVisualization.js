import ForceGraph3D from '3d-force-graph';
import neo4j from 'neo4j-driver';
import {computeQueryFor3D} from './queryConstructors';
//PUT SESSION STUFF TO MODEL


export default function draw3D (country, property, year, limit, filter){
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );       
        const session = driver.session();
        const start = new Date()
    session
        .run(computeQueryFor3D(country, property, year, limit, filter))
        .then(function (result) {
            // console.log(result)
            const links = []
            result.records.forEach(r => { 
                for (let i = 0; i<r._fields.length; i++){
                    // return {source:r.get('source').toNumber(), target:r.get('target').toNumber()}
                    links.push({source:r._fields[0][i].toNumber(), target:r._fields[1][i].toNumber()})
                }
                    // let sources = r._fields[0]
                    // let target = r._fields[1]
                    // console.log(sources)
                    // console.log(target)
                
            });
            console.log(links)        
            session.close();
            console.log(links.length+" links loaded in "+(new Date()-start)+" ms.")
            const ids = new Set()
            links.forEach(l => {ids.add(l.source);ids.add(l.target);});
            const gData = { nodes: Array.from(ids).map(id => {return {id:id}}), links: links}
            ForceGraph3D()(document.getElementById('viz')).graphData(gData);
          })
          .catch(function (error) {
            console.log(error);
          });
}
