import React, { useState } from 'react'

function Topbar(layout) {

  const views = ['Type', 'Schema', 'Focus', 'Empty']
  const [search, setSearch] = useState('');
  const {setTopLeft, setTopRight, setBottomLeft, setBottomRight, topLeft, topRight, bottomLeft, bottomRight} = layout;

  return (

    <div className='topbar'>
      <div className="top">
        <div className='left'>
          <h1>ink-browser</h1>
          <a>Class Hierarchy</a>
          <a>Client</a>
          <a>Statistics</a>
        </div>
        <div className='right'>
          <input
            placeholder='Lookup Schema'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            Search
          </button>
        </div>
        
      </div>
      <div className='bottom'>
        <div>
          <label>Top Left</label>
          <select
            value={topLeft}
            onChange={(e) => {
              setTopLeft(e.target.value)
            }}
          >
            {views.map((view) => (
              <option key={view}>{view}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Top Right</label>
          <select
            value={topRight}
            onChange={(e) => {
              setTopRight(e.target.value)
            }}
          >
            {views.map((view) => (
              <option key={view}>{view}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Bottom Left</label>
          <select
            value={bottomLeft}
            onChange={(e) => {
              setBottomLeft(e.target.value)
            }}
          >
            {views.map((view) => (
              <option key={view}>{view}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Bottom Right</label>
          <select
            value={bottomRight}
            onChange={(e) => {
              setBottomRight(e.target.value)
            }}
          >
            {views.map((view) => (
              <option key={view}>{view}</option>
            ))}
          </select>
        </div>
        
      </div>
    </div>
  )
}

export default Topbar