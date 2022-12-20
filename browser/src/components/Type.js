import React from 'react'

function Type({ data, bindings }) {
  
  return (
    <div className='type'>
      {!data && <p>Click a node on the diagram</p>}
      {data && <p>Data from node {data && data.data.label}</p>}
      <ol>
      {bindings && bindings.map((binding) => (
        
        <li key={binding.entries._root.entries[0][1].id} href={binding.entries._root.entries[0][1].id}>{binding.entries._root.entries[0][1].id}</li>
          
      ))}
      </ol>
    </div>
  )
}

export default Type