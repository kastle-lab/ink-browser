import React, { useState } from 'react'

function Topbar() {

  const [search, setSearch] = useState();

  return (
    <div className="topbar">
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
  )
}

export default Topbar