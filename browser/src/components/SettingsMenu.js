import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

function SettingsMenu() {

    const [DrawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = (open) => {
        setDrawerOpen(true)
    }

    const closeDrawer = (open) => {
        setDrawerOpen(false)
    }

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
            sx={{
                width: 500,
                flexShrink: 0,
            }}
            anchor="right"
            open={DrawerOpen}
            onClose={closeDrawer}
        >
            <div className='settings-drawer'>
                <h2>Drawer</h2>
            </div>
        </Drawer>

    </div>
  )
}

export default SettingsMenu