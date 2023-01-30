import React from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function ColorMode({theme, setTheme}) {

    // Initailize variable and state for color mode

    return (
        <>
        
            <p>Color Mode</p>
            
            <ToggleButtonGroup
                value={theme}
                exclusive
                onChange={(e) => {
                    setTheme(e.target.value)
                    localStorage.setItem('theme', e.target.value)
                }}
            >
                <ToggleButton value="Light">Light</ToggleButton>
                <ToggleButton value="Dark">Dark</ToggleButton>
            </ToggleButtonGroup>
        
        </>
    )
}

export default ColorMode