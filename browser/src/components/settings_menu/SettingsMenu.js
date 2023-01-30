import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import DataEndpoint from './DataEndpoint';
import MapZoom from './MapZoom';
import ColorMode from './ColorMode';

function SettingsMenu({zoomLevel, setZoomLevel, endpoint, setEndpoint, theme, setTheme}) {

    // Initialize variable and state for settings menu to open
    const [DrawerOpen, setDrawerOpen] = useState(false);

    // Function to set the open state of the menu
    const openDrawer = (open) => {
        setDrawerOpen(true)
    }
    const closeDrawer = (open) => {
        setDrawerOpen(false)
    }

    return (
        <div className='setting-menu'>

            {/* Icon button to open the Menu */}
            <Tooltip title="Settings">
                <IconButton
                    onClick={openDrawer}
                >
                    <SettingsOutlinedIcon />
                </IconButton>
            </Tooltip>

            {/* Settings Menu Drawer */}
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

                    {/* Heading inside the menu */}
                    <div className='close-drawer-btn'>
                        <h4>Settings</h4>
                        <IconButton 
                        onClick={closeDrawer}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>

                    {/* Components inside the settings menu */}
                    <DataEndpoint endpoint={endpoint} setEndpoint={setEndpoint}/>
                    <MapZoom zoomLevel={zoomLevel} setZoomLevel={setZoomLevel}/>
                    <ColorMode theme={theme} setTheme={setTheme}/>
                    
                </div>
            </Drawer>

        </div>
    )
}

export default SettingsMenu