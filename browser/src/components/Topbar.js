import React, { useState } from 'react'
import SettingsMenu from './SettingsMenu';
import ViewsSelect from './ViewsSelect';

function Topbar(layout) {

  return (
    <div className='topbar'>

      {/* Div for the left section of the top bar */}
      <div className="topbar-left">

        <h1>ink-browser</h1>
        
      </div>

      {/* Div for the right section of the top bar */}
      <div className='topbar-right'>

        <ViewsSelect layout={layout} />

        <SettingsMenu />
        
      </div>
    </div>
  )
}

export default Topbar