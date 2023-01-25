import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function ColorMode() {

    // Initailize variable and state for color mode
    const [colorMode, setColorMode] = useState("Light");

    return (
        <>
        
            <p>Color Mode</p>
            
            <ToggleButtonGroup
                value={colorMode}
                exclusive
                onChange={(e) => {
                    setColorMode(e.target.value)
                }}
            >
                <ToggleButton value="Light">Light</ToggleButton>
                <ToggleButton value="Dark">Dark</ToggleButton>
            </ToggleButtonGroup>
        
        </>
    )
}

export default ColorMode