import React, { useState } from 'react'

function Topbar(layout) {

  // Destructuring the variables passed down from the parent component into their own variables
  const { setTopLeft, setTopRight, setBottomLeft, setBottomRight, topLeft, topRight, bottomLeft, bottomRight } = layout;

  // Array of views that can be chosen from as drop down options
  const views = ['Type', 'Schema', 'Focus', 'Class Hierarchy', 'Client', 'Statistics', 'Search', 'Empty']

  // Variable for what is typed into the search bar
  const [search, setSearch] = useState('');

  return (
    <div className='topbar'>

      {/* Div for the upper section of the top bar */}
      <div className="top">

        {/* Elements on the left side of the screen */}
        <div className='left'>
          <h1>ink-browser</h1>
        </div>

        {/* Elements on the right side of the screen */}
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

      {/* Div to create the line seperating the top bar sections */}
      <div className='line'></div>

      {/* Div for the lower section of the top bar */}
      <div className='bottoms'>

        {/* Drop down menu to choose the view for top left quadrant */}
        <div>
          <label>Top Left</label>
          <select
            value={topLeft}
            onChange={(e) => {
              setTopLeft(e.target.value)
              localStorage.setItem('topLeft', e.target.value)
            }}
          >
            {views.map((view) => (
              <option key={view}>{view}</option>
            ))}
          </select>
        </div>

        {/* Drop down menu to choose the view for top right quadrant */}
        <div>
          <label>Top Right</label>
          <select
            value={topRight}
            onChange={(e) => {
              setTopRight(e.target.value)
              localStorage.setItem('topRight', e.target.value)
            }}
          >
            {views.map((view) => (
              <option key={view}>{view}</option>
            ))}
          </select>
        </div>

        {/* Drop down menu to choose the view for bottom left quadrant */}
        <div>
          <label>Bottom Left</label>
          <select
            value={bottomLeft}
            onChange={(e) => {
              setBottomLeft(e.target.value)
              localStorage.setItem('bottomLeft', e.target.value)
            }}
          >
            {views.map((view) => (
              <option key={view}>{view}</option>
            ))}
          </select>
        </div>

        {/* Drop down menu to choose the view for bottom right quadrant */}
        <div>
          <label>Bottom Right</label>
          <select
            value={bottomRight}
            onChange={(e) => {
              setBottomRight(e.target.value)
              localStorage.setItem('bottomRight', e.target.value)
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