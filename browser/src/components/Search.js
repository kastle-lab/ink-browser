import React, { useState } from 'react'
const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function Search({bindings, setBindings}) {

    const [search, setSearch] = useState('');

    async function engine() {
        const myEngine = new QueryEngine();

        const bindingsStream = await myEngine.queryBindings(`
        SELECT ?subject ?predicate ?object
        WHERE {
            ?subject ?predicate ?object
        }
        LIMIT 25`, {
            sources: ['http://localhost:3030/earthquake-usgs/'],
        });

        bindingsStream.on('data', (binding) => {
            // console.log(binding.toString()); // Quick way to print bindings for testing
        });
        bindingsStream.on('end', () => {
            // The data-listener will not be called anymore once we get here.
        });
        bindingsStream.on('error', (error) => {
            console.error(error);
        });

        // Consume results as an array (easier)
        let query = await (await bindingsStream.toArray())

        setBindings(query);
        
    }

  return (
    <>
        <div className='search-top'>
            <h2 className='left-search'>Search</h2>
            <div className='right-search'>
                <input
                    placeholder='Lookup Schema'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={engine}>
                    Search
                </button>
            </div>
        </div>
        <div className='search-bottom'>
            {bindings && bindings.map((binding) => (
                <>
                    <a>{binding.entries._root.entries[0][0] + ': '}</a>
                    <a href={binding.entries._root.entries[0][1].id}>{binding.entries._root.entries[0][1].id}</a>
                    <br></br>
                    <a>{binding.entries._root.entries[1][0] + ': '}</a>
                    <a href={binding.entries._root.entries[1][1].id}>{binding.entries._root.entries[1][1].id}</a>
                    <br></br>
                    <a>{binding.entries._root.entries[2][0] + ': '}</a>
                    <a href={binding.entries._root.entries[2][1].id}>{binding.entries._root.entries[2][1].id}</a>
                    <br></br>
                    <br></br>
                </>
            ))}
        </div>
    </>
  )
}

export default Search