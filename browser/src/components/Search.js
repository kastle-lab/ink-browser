import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function Search({bindings, setBindings, endpoint}) {

    // Initialize variables and state
    const [search, setSearch] = useState('');
    const [isPening, setIsPending] = useState(false)

    // Function that is called on button click
    async function engine() {

        // Sets the search box to empty string and sets search pending to true
        setSearch('');
        setIsPending(true)

        // Create new query engine and query the endpoint for classes
        const myEngine = new QueryEngine();
        const bindingsStream = await myEngine.queryBindings(`
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        select * where {
        ?s a owl:Class .
        }`, {
            sources: [endpoint],
        });
        bindingsStream.on('error', (error) => {
            console.error(error);
        });

        // Convery the query results to an array
        let query = await (await bindingsStream.toArray())

        // Set the data binding to the query results and set pending to false
        setBindings(query);
        setIsPending(false)
        
    }

  return (
    <>
        {/* Top of search view with heading, search box, and search button  */}
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

        {/* Bottom of search view where data is listed */}
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