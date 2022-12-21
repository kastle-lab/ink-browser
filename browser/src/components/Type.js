import React from 'react'

function Type({ data, bindings }) {

  console.log(data)
  
  return (
    <div className='type'>
      <div>
        <h2 className='quad-head'>Type</h2>
      </div>
      <div className='type-bottom'>
        {!data && <p>Click a node on the diagram</p>}
        {data && <p>Data from node </p>}
      </div>
    </div>
  )
}

export default Type