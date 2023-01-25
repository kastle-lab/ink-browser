import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ViewsSelect(layout) {

    // Destructuring the variables passed down from the parent component into their own variables
    const { setTopLeft, setTopRight, setBottomLeft, setBottomRight, topLeft, topRight, bottomLeft, bottomRight } = layout.layout;

    // Array of views that can be chosen from as drop down options
    const views = ['Type', 'Schema', 'Focus', 'Class Hierarchy', 'Statistics', 'Search', 'Map', 'Empty']
    
    // Array to map through for setting up the view select
    const quadrants = [
        { name: 'Top Left',
        id: 'top-left',
        value: topLeft,
        valueString: 'topLeft',
        set: setTopLeft}, 
        { name: 'Top Right',
        id: 'top-right',
        value: topRight,
        valueString: 'topRight',
        set: setTopRight}, 
        { name: 'Bottom Left',
        id: 'bottom-left',
        value: bottomLeft,
        valueString: 'bottomLeft',
        set: setBottomLeft }, 
        { name: 'Bottom Right',
        id: 'bottom-right',
        value: bottomRight,
        valueString: 'bottomRight',
        set: setBottomRight }
    ];

    // Initialize variables for state and function to control it
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };   

    return (
        <>

            {/* Menu to change views when screen gets too small */}
            <div className='views-menu'>

                {/* Button to open menu */}
                <Tooltip title="Change Views">
                    <IconButton
                        variant="contained"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                </Tooltip>

                {/* Menu component to hold the select elements */}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    {quadrants.map((quadrant) => (
                        
                        <FormControl sx={{ m: 1, minWidth: 100 }} size="small" key={quadrant.id}>
                            <InputLabel id={quadrant.id + "-label"}>{quadrant.name}</InputLabel>
                            <Select
                                className='view-select'
                                labelId={quadrant.id + "-label"}
                                id={quadrant.id}
                                value={quadrant.value}
                                label={quadrant.name}
                                autoWidth
                                onChange={(e) => {
                                    quadrant.set(e.target.value)
                                    localStorage.setItem(quadrant.valueString, e.target.value)
                                }}
                            >
                                {views.map((view) => (
                                    <MenuItem key={view} value={view}>{view}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ))}

                </Menu>

            </div>

            {/* View selectors that are visible when screen is wide enough */}
            <div className='visible-layout'>
                <div>
                    {quadrants.map((quadrant) => (
                        <FormControl sx={{ m: 1, minWidth: 100 }} size="small" key={quadrant.id}>
                            <InputLabel id={quadrant.id + "-label"}>{quadrant.name}</InputLabel>
                            <Select
                                className='view-select'
                                labelId={quadrant.id + "-label"}
                                id={quadrant.id}
                                value={quadrant.value}
                                label={quadrant.name}
                                autoWidth
                                onChange={(e) => {
                                    quadrant.set(e.target.value)
                                    localStorage.setItem(quadrant.valueString, e.target.value)
                                }}
                            >
                                {views.map((view) => (
                                    <MenuItem key={view} value={view}>{view}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ))}
                </div>
            </div>

        </>
    )
}

export default ViewsSelect