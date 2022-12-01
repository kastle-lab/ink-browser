const QueryEngine = require('@comunica/query-sparql').QueryEngine;

async function engine() {
    const myEngine = new QueryEngine();

    const bindingsStream = await myEngine.queryBindings(`
        SELECT ?s ?p ?o WHERE {
            ?s ?p <http://dbpedia.org/resource/Belgium>.
            ?s ?p ?o
        } LIMIT 100`, {
        sources: ['https://fragments.dbpedia.org/2015/en'],
    });

    const results = await bindingsStream.toArray()
    console.log(results)
}

engine()

export default engine;
