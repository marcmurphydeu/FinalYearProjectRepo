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


export async function setPageRankOfQuery(query){
    var driver = neo4j.driver(
        'bolt://localhost:7687',
        neo4j.auth.basic('neo4j', 'fender14'),
        );

    var session = driver.session()
    var pageRank = await getPageRank(query)
    console.log(pageRank)
    var setQueries = []
    pageRank.forEach(node => {
        if (node[0].country_name !== null){
            let q = "MATCH (c:Country{country_name: '"+node[0].countrty_name+"'}) SET c.pageRank = " + node[1]*10
            setQueries.push(q)
        }
        else if (node[0].value !== null && node[0].property !== null){
            if (node[0].value === "NaN"){
                console.log("YIKES")
            }
            let q = "MATCH (p:"+node[0].property+"{value:"+node[0].value+"}) SET p.pageRank = " + node[1]*10
            console.log(q)
            setQueries.push(q)
        }
        else if (node[0].year !== null){
            let q = "MATCH (y:Year{year:"+node[0].year+"}) SET y.pageRank = " + node[1]*10
            setQueries.push(q)
        }
    })

    try {
        await session.writeTransaction(tx =>
        setQueries.forEach(q => tx.run(q))
    )

    // var records = result.records.map(record => record._fields)

    } finally {
    await session.close()
    }

    // on application exit:
    await driver.close()

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