import React from 'react'

const QueryEngine = require('@comunica/query-sparql').QueryEngine;

function Type({ data, bindings, typeIsPending, setCoordinates }) {

  async function getPoint(e) {
    let earthquake = e.currentTarget.id
    earthquake = earthquake.split(".").pop()

    console.log(earthquake)

    const myEngine = new QueryEngine();

    // Query that is ran
    const bindingsStream = await myEngine.queryBindings(`
      PREFIX kwgr: <http://stko-kwg.geog.ucsb.edu/lod/resource>
      select * where {
      kwgr:geometry.point.${earthquake} ?p ?o.
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

    // Converts the results to an array
    let query = await (await bindingsStream.toArray())

    console.log(query)

  }
  
  return (
    <div className='type'>
      <div>
        <h2 className='quad-head'>Type</h2>
      </div>
      <div className='type-bottom'>
        {typeIsPending && <h2>Gathering Data...</h2>}
        {data && data.map((entity) => (
          <p key={entity.entries._root.entries[0][1].id} id={entity.entries._root.entries[0][1].id} onClick={getPoint}>{entity.entries._root.entries[0][1].id}</p>
        ))}
        {data && !typeIsPending && data.length === 0 && <p>No data</p>}
      </div>
    </div>
  )
}

export default Type