import React from 'react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Topbar(layout) {

  // Destructuring the variables passed down from the parent component into their own variables
  const { setTopLeft, setTopRight, setBottomLeft, setBottomRight, topLeft, topRight, bottomLeft, bottomRight } = layout;

  // Array of views that can be chosen from as drop down options
  const views = ['Type', 'Schema', 'Focus', 'Class Hierarchy', 'Client', 'Statistics', 'Search', 'Empty']

  return (
    <div className='topbar'>

      {/* Div for the left section of the top bar */}
      <div className="topbar-left">

        <h1>ink-browser</h1>
        
      </div>

      {/* Div for the right section of the top bar */}
      <div className='topbar-right'>

        {/* Drop down menu to choose the view for top left quadrant */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <InputLabel id="top-left-label">Top Left</InputLabel>
            <Select
              labelId="top-left-label"
              id="top-left"
              value={topLeft}
              label="Top Left"
              autoWidth
              onChange={(e) => {
                setTopLeft(e.target.value)
                localStorage.setItem('topLeft', e.target.value)
              }}
            >
              {views.map((view) => (
                <MenuItem key={view} value={view}>{view}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Drop down menu to choose the view for top right quadrant */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <InputLabel id="top-right-label">Top Right</InputLabel>
            <Select
              labelId="top-right-label"
              id="top-right"
              value={topRight}
              label="Top Right"
              autoWidth
              onChange={(e) => {
                setTopRight(e.target.value)
                localStorage.setItem('topRight', e.target.value)
              }}
            >
              {views.map((view) => (
                <MenuItem key={view} value={view}>{view}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Drop down menu to choose the view for bottom left quadrant */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <InputLabel id="bottom-left-label">Bottom Left</InputLabel>
            <Select
              labelId="bottom-left-label"
              id="bottom-left"
              value={bottomLeft}
              label="Bottom Left"
              autoWidth
              onChange={(e) => {
                setBottomLeft(e.target.value)
                localStorage.setItem('bottomLeft', e.target.value)
              }}
            >
              {views.map((view) => (
                <MenuItem key={view} value={view}>{view}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Drop down menu to choose the view for bottom right quadrant */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 100}} size="small">
            <InputLabel id="bottom-right-label">Bottom Right</InputLabel>
            <Select
              labelId="bottom-right-label"
              id="bottom-right"
              value={bottomRight}
              label="Bottom Right"
              autoWidth
              onChange={(e) => {
                setBottomRight(e.target.value)
                localStorage.setItem('bottomRight', e.target.value)
              }}
            >
              {views.map((view) => (
                <MenuItem key={view} value={view}>{view}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        
      </div>
    </div>
  )
}

export default Topbar