import React from 'react'

function Type({ data, bindings }) {
  
  return (
    <div className='type'>
      <div>
        <h2 className='quad-head'>Focus</h2>
      </div>
      <div className='type-bottom'>
        {!data && <p>Click a node on the diagram</p>}
        {data && <p>Data from node: {data && data.data.label}</p>}
      </div>
    </div>
  )
}

export default Type