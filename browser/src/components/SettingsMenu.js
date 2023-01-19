import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function SettingsMenu() {

    const [DrawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = (open) => {
        setDrawerOpen(true)
    }

    const closeDrawer = (open) => {
        setDrawerOpen(false)
    }

    const [zoom, setZoom] = useState(8);

    const zoomLevels = []

    for (let i=1; i<19 ; i++) {
        zoomLevels.push(<MenuItem value={i} key={i}>{i}</MenuItem>)
    }

    const [colorMode, setColorMode] = useState("Light");

    return (
      <div className='setting-menu'>

        <Tooltip title="Settings">
            <IconButton
                onClick={openDrawer}
            >
                <SettingsOutlinedIcon />
            </IconButton>
        </Tooltip>
        <Drawer
            PaperProps={{
            sx: {
                width: 300,
                height: '100vh',
                borderRadius: '15px 0 0 15px',
            }
            }}
            anchor="right"
            open={DrawerOpen}
            onClose={closeDrawer}
        >
            <div className='settings-menu'>
                <div className='close-drawer-btn'>
                    <h4>Settings</h4>
                    <IconButton 
                    onClick={closeDrawer}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>

                <p>Data Endpoint</p>
                <TextField 
                    size='small'
                    id="URL" 
                    label="URL" 
                    variant="outlined" 
                    required
                />

                <p>Default Map zoom</p>
                <FormControl sx={{minWidth: 80 }} size="small">
                    <InputLabel id='zoom-level-label'>Zoom</InputLabel>
                    <Select
                        
                        labelId='zoom-level-label'
                        label="Zoom"
                        value={zoom}
                        id='zoom-select'
                        onChange={(e) => {
                            setZoom(e.target.value)
                        }}
                    >
                        {zoomLevels}
                    </Select>
                </FormControl>
                
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
            </div>
        </Drawer>

    </div>
  )
}

export default SettingsMenu