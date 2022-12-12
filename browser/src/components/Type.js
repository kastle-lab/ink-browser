import React from 'react'

function Type({ data, setData }) {

  return (
    <div>
      <h2>Type</h2>
      <div className='elements'>
        
        <p>{data && data.data.label}</p>
        
      </div>
    </div>
  )
}

export default Type