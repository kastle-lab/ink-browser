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

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className='topbar'>

      {/* Div for the upper section of the top bar */}
      <div className="top">

        {/* Elements on the left side of the screen */}
        <div className='left'>
          <h1>ink-browser</h1>
        </div>
        
      </div>

      {/* Div for the right section of the top bar */}
      <div className='bottoms'>

        {/* Drop down menu to choose the view for top left quadrant */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
            <InputLabel id="top-left">Top Left</InputLabel>
            <Select
              labelId="top-left"
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
            <InputLabel id="top-right">Top Right</InputLabel>
            <Select
              labelId="top-right"
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
            <InputLabel id="bottom-left">Bottom Left</InputLabel>
            <Select
              labelId="bottom-left"
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
            <InputLabel id="bottom-right">Bottom Right</InputLabel>
            <Select
              labelId="bottom-right"
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