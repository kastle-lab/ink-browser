import React from 'react'
const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function Schema() {

    async function engine() {
        const myEngine = new QueryEngine();

        const bindingsStream = await myEngine.queryBindings(`
        SELECT ?s ?p ?o WHERE {
            ?s ?p <http://dbpedia.org/resource/Belgium>.
            ?s ?p ?o
        } LIMIT 100`, {
            sources: ['https://fragments.dbpedia.org/2015/en'],
        });

        bindingsStream.on('data', (binding) => {
            console.log(binding.toString()); // Quick way to print bindings for testing

            console.log(binding.has('s')); // Will be true

            // Obtaining values
            console.log(binding.get('s').value);
            console.log(binding.get('s').termType);
            console.log(binding.get('p').value);
            console.log(binding.get('o').value);
        });
        bindingsStream.on('end', () => {
            // The data-listener will not be called anymore once we get here.
        });
        bindingsStream.on('error', (error) => {
            console.error(error);
        });

        // Consume results as an array (easier)
        const bindings = await bindingsStream.toArray();
        console.log(bindings[0].get('s').value);
        console.log(bindings[0].get('s').termType);
    }

    return (
        <div>
            <h2>Schema</h2>
            <button onClick={engine}>Query</button>
        </div>
    )
}

export default Schema