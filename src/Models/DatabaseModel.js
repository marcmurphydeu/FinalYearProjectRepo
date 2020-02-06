import neo4j from 'neo4j-driver';



export default async function getCountries(){
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );
    const session = driver.session();
    const result = await session.run("MATCH (c: Country) RETURN c.country_name")

    const countries = result.records.map(record =>  record._fields);

    session.close();
    driver.close();
    return countries;
}



