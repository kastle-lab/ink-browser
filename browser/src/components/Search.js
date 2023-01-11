import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function Search({bindings, setBindings}) {

    const [search, setSearch] = useState('');
    const [isPening, setIsPending] = useState(false)

    async function engine() {

        setSearch('');

        setIsPending(true)

        const myEngine = new QueryEngine();

        const bindingsStream = await myEngine.queryBindings(`
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        select * where {
        ?s a owl:Class .
        }`, {
            sources: ['http://localhost:3030/earthquake-usgs/'],
        });

        bindingsStream.on('data', (binding) => {
            // console.log(binding); // Quick way to print bindings for testing
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

        setIsPending(false)
        
    }



  return (
    <>
        <div className='search-top'>
            <h2 className='left-search'>Search</h2>
            <div className='right-search'>
                <TextField
                    size="small"
                    id="search-field"
                    label="Lookup Schema"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={engine} variant="contained" >Search</Button>
            </div>
        </div>
        <div className='search-bottom'>
            {isPening && <h3>Gathering Data...</h3>}
            <ol>
                {bindings && bindings.map((binding) => (

                    <li key={binding.entries._root.entries[0][1].id} href={binding.entries._root.entries[0][1].id}>{binding.entries._root.entries[0][1].id}</li>

                ))}
            </ol>
        </div>
    </>
  )
}

export default Search