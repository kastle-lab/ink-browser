import React from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function MapZoom({zoomLevel, setZoomLevel}) {

    // Initialize an array with all the zoom level in it
    const zoomLevels = []
    for (let i = 1; i < 19; i++) {
        zoomLevels.push(<MenuItem value={i} key={i}>{i}</MenuItem>)
    }

    return (
        <>
        
            <p>Default Map zoom</p>
            
            <FormControl sx={{ minWidth: 80 }} size="small">
                <InputLabel id='zoom-level-label'>Zoom</InputLabel>
                <Select

                    labelId='zoom-level-label'
                    label="Zoom"
                    value={zoomLevel}
                    id='zoom-select'
                    onChange={(e) => {
                        setZoomLevel(e.target.value)
                        localStorage.setItem('zoomLevel', e.target.value)
                    }}
                >
                    {zoomLevels}
                </Select>
            </FormControl>
        
        </>
    )
}

export default MapZoom