import React from 'react';
import Schema from './Schema';
import Type from './Type';
import Focus from './Focus';

function Layout() {
  return (
    <div className='gridlayout'>
      <div className='quadrant type topTwo'><Type></Type></div>
      <div className='quadrant schema topTwo'><Schema></Schema></div>
      <div className='quadrant focus bottomTwo'><Focus></Focus></div>
      <div className='quadrant bottomTwo'></div>
    </div>
  )
}

export default Layout