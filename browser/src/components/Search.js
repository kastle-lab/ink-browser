import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function Search({endpoint}) {

    // Initialize variables and state
    const [data, setData] = useState();
    const [search, setSearch] = useState('');
    const [isPening, setIsPending] = useState(false)
    const myEngine = new QueryEngine();

    // Function that is called on button click
    async function onSearch() {

        // Sets the search box to empty string and sets search pending to true
        setSearch('');
        setIsPending(true);

        const bindingsStream = await myEngine.queryBindings(`
        PREFIX text: <http://jena.apache.org/text#>
        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        SELECT ?s ?o
        WHERE {
        ?s rdfs:label ?o .
        FILTER regex(?o, '${search}')
        }`, {
            sources: [endpoint],
        });

        let query = await bindingsStream.toArray()

        
        console.log(query)
        setData(query);

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
                {data && data.map((item) => (

                    <li key={item.entries._root.entries[1][1].id} href={item.entries._root.entries[1][1].id}>{item.entries._root.entries[1][1].id}</li>
                ))}
            </ol>
        </div>
    </>
  )
}

export default Search