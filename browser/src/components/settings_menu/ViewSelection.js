import React from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function viewSelection({viewSelect, setViewSelect}) {
    return (

        <>

            <p>View selection</p>

            <ToggleButtonGroup
                value={viewSelect}
                exclusive
                onChange={(e) => {
                    setViewSelect(e.target.value)
                    localStorage.setItem('showViewSelect', e.target.value)
                }}
            >
                <ToggleButton value="Show">Show</ToggleButton>
                <ToggleButton value="Hide">Hide</ToggleButton>
            </ToggleButtonGroup>

        </>
        
    )
}

export default viewSelection