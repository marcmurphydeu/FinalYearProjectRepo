import neo4j from 'neo4j-driver';


async function getProperties(){
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );

    var session = driver.session()

    try {
    var result = await session.readTransaction(tx =>
        tx.run(
        'MATCH (n) WHERE NOT (labels(n) = ["Year"]) RETURN distinct labels(n)')
    )

    var records = result.records.map(record => record._fields)
    } finally {
    await session.close()
    }

    // on application exit:
    await driver.close()

    return records
}


export async function getPageRank(query){
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

async function getCountries(){
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );

    var session = driver.session()

    try {
    var result = await session.readTransaction(tx =>
        tx.run(
        'MATCH (c: Country) RETURN c.country_name')
    )

    var records = result.records.map(record => record._fields)

    } finally {
    await session.close()
    }

    // on application exit:
    await driver.close()

    return records
}




export {getCountries, getProperties}