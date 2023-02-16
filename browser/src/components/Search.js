import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function Search({bindings, setBindings, endpoint, setConnections}) {

    // Initialize variables and state
    const [search, setSearch] = useState('');
    const [isPening, setIsPending] = useState(false)
    const myEngine = new QueryEngine();

    async function queryForNodes() {

        // Create new query engine and query the endpoint for classes
        let bindingsStream = await myEngine.queryBindings(`
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX opla-sd: <http://ontologydesignpatterns.org/opla-sd#>
        select ?c ?x ?y where {
        ?c a owl:Class ;
        opla-sd:entityPosition ?eP .
        ?eP opla-sd:entityPositionX ?x .
        ?eP opla-sd:entityPositionY ?y .
        }`, {
            sources: [endpoint],
        });
        bindingsStream.on('error', (error) => {
            console.error(error);
        });

        // Convery the query results to an array
        let query = await bindingsStream.toArray()

        // Set the data binding to the query results and set pending to false
        setBindings(query);

    }

    async function queryForConnections() {

        // Query for connections
        let bindingsStream = await myEngine.queryBindings(`
        prefix opla-sd: <http://ontologydesignpatterns.org/opla-sd#>
        select ?connections where {
        ?ont opla-sd:hasConnections ?connections .
        }`, {
            sources: [endpoint],
        });

        let query = await bindingsStream.toArray()

        setConnections(query[0].entries._root.entries[0][1].id)

    }

    // Function that is called on button click
    async function onSearch() {

        // Sets the search box to empty string and sets search pending to true
        setSearch('');
        setIsPending(true);

        await queryForNodes();
        await queryForConnections();


        setIsPending(false);
        
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
                <Button onClick={onSearch} variant="contained" >Search</Button>
            </div>
        </div>

        {/* Bottom of search view where data is listed */}
        <div className='search-bottom'>
            {isPening && <h3>Gathering Data...</h3>}
            <ol>
                {bindings && bindings.map((binding) => (

                    <li key={binding.entries._root.entries[2][1].id} href={binding.entries._root.entries[2][1].id}>{binding.entries._root.entries[2][1].id}</li>

                ))}
            </ol>
        </div>
    </>
  )
}

export default Search