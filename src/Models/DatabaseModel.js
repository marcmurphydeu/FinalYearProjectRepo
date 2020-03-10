import neo4j from 'neo4j-driver';

export async function getDataFromQuery(query){
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );
    var session = driver.session()
    try {
    var result = await session.readTransaction(tx =>
        tx.run(query)
    )
    var records = result.records.map(record => record._fields)
    } 
    catch (e){
        alert(e)
    }
    finally {
        await session.close()
    }
    // on application exit:
    await driver.close()
    return records
}

export async function setDataFromQuery(query){
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );
    var session = driver.session()
    try {
    await session.writeTransaction(tx =>
        tx.run(query)
    )
    // var records = result.records.map(record => record._fields)
    } finally {
    await session.close()
    }
    // on application exit:
    await driver.close()
    // return records
}

export async function getCountriesPositions(){
    var query = 'MATCH (n:Country) return n.country_name, n.longitude, n.latitude'
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );
    var session = driver.session()
    try {
    var result = await session.readTransaction(tx =>
        tx.run(query)
    )
    var records = result.records.map(record => record._fields)
    } finally {
    await session.close()
    }
    // on application exit:
    await driver.close()
    return records
}





