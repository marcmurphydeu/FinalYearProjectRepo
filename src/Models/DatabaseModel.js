import neo4j from 'neo4j-driver';



export default async function getCountries(){
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );

    const session = driver.session()

    try {
    const result = await session.readTransaction(tx =>
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




