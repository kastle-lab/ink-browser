import React from 'react'

function Focus({dataFromType}) {

  return (
    <>
      {/* Heading of view */}
      <div>
        <h2 className='quad-head'>Focus</h2>
      </div>

      {/* Lower portion of view */}
      <div className='focus-lower'>

        {/* Heading of lower portion */}
        <div className='focus-lower-header'>
          <h3>Predicate</h3>
          <h3>Object</h3>
        </div>

        {/* Map over the data and display it in the lower portion */}
        {dataFromType && dataFromType.map((item) => (
          <div key={item.entries.o.value} className='focus-lower-items'>

            {/* Predicate items on the left */}
            <div className='focus-lower-item-left'>
              <p>{item.entries.p.value}</p>
            </div>

            {/* Object item on the right*/}
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