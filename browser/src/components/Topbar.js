import React, { useState } from 'react'

function Topbar() {

  const views = ['Type', 'Schema', 'Focus']
  const [search, setSearch] = useState('');

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
          <select>
            {views.map((view) => (
              <option key={view}>{view}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Top Right</label>
          <select>
            {views.map((view) => (
              <option key={view}>{view}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Bottom Left</label>
          <select>
            {views.map((view) => (
              <option key={view}>{view}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Bottom Right</label>
          <select>
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