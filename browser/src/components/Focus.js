import React from 'react'

function Focus({dataFromType}) {

  return (
    <>
      <div>
        <h2 className='quad-head'>Focus</h2>
      </div>
      <div className='focus-lower'>
        <div className='focus-lower-header'>
          <h3>Predicate</h3>
          <h3>Object</h3>
        </div>
        {dataFromType && dataFromType.map((item) => (
          <div key={item.entries.o.value} className='focus-lower-items'>
            <div className='focus-lower-item-left'>
              <p>{item.entries.p.value}</p>
            </div>
            <div className='focus-lower-item-right'>
              <p>{item.entries.o.value}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Focus