import neo4j from 'neo4j-driver';

// Inspiration for setting up and closing drivers from:
// https://adamcowley.co.uk/javascript/using-the-neo4j-driver-with-nodejs/


const url = 'bolt://localhost:7687'
const password = 'Neo4jPassword'
// const url = 'neo4j://3e5378d8.databases.neo4j.io'
// const password = 'sDeAy2xzSR4afLgJ2eyUMJmy6_PsrM2sKOmikipLOKU'

// Function for getting data from the database, returning the response.
export async function getDataFromQuery(query){
    console.log("Open")
    console.log(query)
    var driver = neo4j.driver(
        url,
        neo4j.auth.basic('neo4j', password),
        // { encrypted: true } 
        );
    var session = driver.session()
    try {
    var result = await session.writeTransaction(tx =>
        tx.run(query)
    )
    console.log(result)
    var records = result.records.map(record => record._fields)
    } 
    catch (e){
        alert("Error in query", e)
    }
    finally {
        await session.close()
    }
    console.log("Close")
    // on application exit:
    await driver.close()
    return records
}


// Function for writing data to the database
export async function setDataFromQuery(query){
    var driver = neo4j.driver(
        url,
        neo4j.auth.basic('neo4j',password),
        // { encrypted: true } 
        );
    var session = driver.session()
    try {
    await session.writeTransaction(tx =>
        tx.run(query)
    )
    } finally {
    await session.close()
    }
    // on application exit:
    await driver.close()
    // return records
}

// Function for getting the longitude and latitude of all countries
export async function getCountriesPositions(){
    var query = 'MATCH (n:Country) return n.country_name, n.longitude, n.latitude'
    var driver = neo4j.driver(
        url,
        neo4j.auth.basic('neo4j', password),
        // { encrypted: true } 
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





