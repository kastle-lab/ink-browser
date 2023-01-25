import React from 'react'
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function Type({ data, bindings, typeIsPending, setCoordinates, endpoint, setDataFromType }) {

  // Function is called when type data is clicked
  async function getPoint(e) {

    // Create query engine and run query
    const myEngine = new QueryEngine();
    let bindingsStream = await myEngine.queryBindings(`
    select * where {
    <${e.currentTarget.id}> ?p ?o.
    }`, {
      sources: [endpoint],
    });
    bindingsStream.on('error', (error) => {
      console.error(error);
    });

    // Converts the results to an array and set the data
    let query = (await bindingsStream.toArray())
    query = JSON.stringify(query)
    query = JSON.parse(query)
    setDataFromType(query)

    // Create variable to and if the item has geometry data set the variable
    let geometry = null;
    query && query.forEach((item) => {
      if (item.entries.p.value === "http://www.opengis.net/ont/geosparql#hasGeometry") {
        geometry = item.entries.o.value;
      }
    })

    // If there is geometry data continue
    if (geometry != null) {

      // Query for specific geometry data
      bindingsStream = await myEngine.queryBindings(`
      select * where {
      <${geometry}> ?p ?o.
      }`, {
        sources: [endpoint],
      });
      bindingsStream.on('error', (error) => {
        console.error(error);
      });

      // Set the query with updated geometry data 
      query = (await bindingsStream.toArray())
      query = JSON.stringify(query)
      query = JSON.parse(query)

    }

    // Initialize variable to store the coordinates, parse out the corrdinates and set the coordinates
    let point = null;
    query.forEach((item) => {
      if (item.entries.p.value === "http://www.opengis.net/ont/geosparql#asWKT") {
        point = item.entries.o.value;
        point = point.split("(").pop()
        point = point.substring(0, point.length - 1)
        point = point.split(' ')
        point = [point[1] * 1, point[0] * 1];
        setCoordinates(point)
      }
    })

  }
  
  return (
    <div className='type'>

      {/* Heading for the view */}
      <div>
        <h2 className='quad-head'>Type</h2>
      </div>

      {/* Bottom portion of the view  */}
      <div className='type-bottom'>

        {/* Shows when data is being gathered */}
        {typeIsPending && <h2>Gathering Data...</h2>}

        {/* Maps through the data and displays it */}
        {data && data.map((entity) => (
          <div className='type-bottom-item' key={entity.entries._root.entries[0][1].id}>

            {/* Visible data that is shown */}
            <p  id={entity.entries._root.entries[0][1].id} onClick={getPoint}>{entity.entries._root.entries[1][1].id}</p>

            {/* Clickable icon to take you to link */}
            <a href={entity.entries._root.entries[0][1].id} target='_blank' rel="noreferrer">
              <IconButton size='small'>
                <OpenInNewIcon fontSize='small'></OpenInNewIcon>
              </IconButton>
            </a>

          </div>
        ))}

        {/* Shows when no data is available */}
        {data && !typeIsPending && data.length === 0 && <p>No data</p>}

      </div>
    </div>
  )
}

export default Type