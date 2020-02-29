import ForceGraph3D from '3d-force-graph';
import neo4j from 'neo4j-driver';
import {computeQueryFor3D, computeCypher, maxValueQuery} from '../Models/QueryConstructors';
import {getPageRank, setPageRankOfQuery, getDataFromQuery} from '../Models/DatabaseModel'
//PUT SESSION STUFF TO MODEL


export default async function draw3D (country, property, year, limit, filter){
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );       
        const session = driver.session();
        const elem = document.getElementById('viz');
        // setPageRankOfQuery(computeCypher(country,property,year,limit,filter,true))
        var maxVal = await getDataFromQuery(maxValueQuery(country,property,year,limit,filter))

    session
        .run(computeQueryFor3D(country, property, year, limit, filter, maxVal[0]))
        .then(function (result) {
            const links = []
            const nodes = {}
            result.records.forEach(r => { 
                for (let i = 0; i<r._fields.length; i++){
                    
                    nodes[r._fields[0].id[i].toNumber()] = {id: r._fields[0].id[i].toNumber(), caption: r._fields[0].caption[i], label: r._fields[0].label[i], size: r._fields[0].size[i]}
                    nodes[r._fields[1].id[i].toNumber()] = {id: r._fields[1].id[i].toNumber(), caption: r._fields[1].caption[i], label: r._fields[1].label[i], size: r._fields[1].size[i]}
                    links.push({source:r._fields[0].id[i].toNumber(), target:r._fields[1].id[i].toNumber()})
                }
            });
            session.close();
            const ids = new Set()
            links.forEach(l => {ids.add(l.source);ids.add(l.target);});
            const gData = { nodes: Object.values(nodes), links: links}
            ForceGraph3D()(elem)
                            .graphData(gData)
                            .nodeAutoColorBy('label')
                            .linkDirectionalArrowLength(3)
                            .linkOpacity(0.6)
                            .nodeVal('size')
                            .nodeLabel(node=> `${node.label}:${node.caption}`)
                            .onNodeHover(node=>elem.style.cursor = node ? 'pointer':null);
          })
          .catch(function (error) {
            console.log(error);
          });
}
