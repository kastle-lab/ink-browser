import React from 'react'

function Type({ data, bindings, typeIsPending }) {
  
  return (
    <div className='type'>
      <div>
        <h2 className='quad-head'>Type</h2>
      </div>
      <div className='type-bottom'>
        {typeIsPending && <h2>Gathering Data...</h2>}
        {data && data.map((entity) => (
          <p key={entity.entries._root.entries[0][1].id}>{entity.entries._root.entries[0][1].id}</p>
        ))}
        {data && !typeIsPending && data.length === 0 && <p>No data</p>}
      </div>
    </div>
  )
}

export default Type