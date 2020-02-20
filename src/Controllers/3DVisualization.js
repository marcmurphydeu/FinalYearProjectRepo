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
        const elem = document.getElementById('viz');
        const start = new Date()
    session
        .run(computeQueryFor3D(country, property, year, limit, filter))
        .then(function (result) {
            // console.log(result)
            const links = []
            const nodes = {}
            console.log(result)
            result.records.forEach(r => { 
                for (let i = 0; i<r._fields.length; i++){
                    console.log(r)
                    
                    nodes[r._fields[0].id[i].toNumber()] = {id: r._fields[0].id[i].toNumber(), caption: r._fields[0].caption[i], label: r._fields[0].label[i]}
                    nodes[r._fields[1].id[i].toNumber()] = {id: r._fields[1].id[i].toNumber(), caption: r._fields[1].caption[i], label: r._fields[1].label[i]}
                    // return {source:r.get('source').toNumber(), target:r.get('target').toNumber()}
                    links.push({source:r._fields[0].id[i].toNumber(), target:r._fields[1].id[i].toNumber()})
                }
            });
            console.log("nodes", nodes)
            console.log(links)        
            session.close();
            console.log(links.length+" links loaded in "+(new Date()-start)+" ms.")
            const ids = new Set()
            links.forEach(l => {ids.add(l.source);ids.add(l.target);});
            const gData = { nodes: Object.values(nodes), links: links}
            console.log("GDATA IS ", gData)
            ForceGraph3D()(elem)
                            .graphData(gData)
                            .nodeAutoColorBy('label')
                            .nodeLabel(node=> `${node.label}:${node.caption}`)
                            .onNodeHover(node=>elem.style.cursor = node ? 'pointer':null);
          })
          .catch(function (error) {
            console.log(error);
          });
}
