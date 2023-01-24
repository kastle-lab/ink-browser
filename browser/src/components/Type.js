import React from 'react'
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function Type({ data, bindings, typeIsPending, setCoordinates, endpoint, setDataFromType }) {

  async function getPoint(e) {

    const myEngine = new QueryEngine();

    // Query that is ran
    let bindingsStream = await myEngine.queryBindings(`
    select * where {
    <${e.currentTarget.id}> ?p ?o.
    }`, {
      sources: [endpoint],
    });

    bindingsStream.on('error', (error) => {
      console.error(error);
    });

    // Converts the results to an array
    let query = (await bindingsStream.toArray())
    query = JSON.stringify(query)
    query = JSON.parse(query)

    setDataFromType(query)

    let geometry = null;

    query && query.forEach((item) => {
      if (item.entries.p.value === "http://www.opengis.net/ont/geosparql#hasGeometry") {
        geometry = item.entries.o.value;
      }
    })

    if (geometry != null) {
      bindingsStream = await myEngine.queryBindings(`
      select * where {
      <${geometry}> ?p ?o.
      }`, {
        sources: [endpoint],
      });

      bindingsStream.on('error', (error) => {
        console.error(error);
      });

      query = (await bindingsStream.toArray())
      query = JSON.stringify(query)
      query = JSON.parse(query)

    }

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
      <div>
        <h2 className='quad-head'>Type</h2>
      </div>
      <div className='type-bottom'>
        {typeIsPending && <h2>Gathering Data...</h2>}
        {data && data.map((entity) => (
          <div className='type-bottom-item' key={entity.entries._root.entries[0][1].id}>
            <p  id={entity.entries._root.entries[0][1].id} onClick={getPoint}>{entity.entries._root.entries[1][1].id}</p>
            <a href={entity.entries._root.entries[0][1].id} target='_blank' rel="noreferrer">
              <IconButton size='small'>
                <OpenInNewIcon fontSize='small'></OpenInNewIcon>
              </IconButton>
            </a>
          </div>
        ))}
        {data && !typeIsPending && data.length === 0 && <p>No data</p>}
      </div>
    </div>
  )
}

export default Type