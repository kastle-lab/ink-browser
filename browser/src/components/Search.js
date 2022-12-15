import React, { useState } from 'react'

function Search() {

    const [search, setSearch] = useState('');

  return (
    <div className='search-top'>
        <h2 className='left'>Search</h2>
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

export default Search