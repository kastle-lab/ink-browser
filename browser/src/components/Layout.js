import React from 'react';
import Schema from './Schema';
import Type from './Type';
import Focus from './Focus';

function Layout() {
  return (
    <div className='grid'>
        <div className='quadrant type'><Type></Type></div>
        <div className='quadrant schema'><Schema></Schema></div>
        <div className='quadrant focus'><Focus></Focus></div>
        <div className='quadrant'></div>
    </div>
  )
}

export default Layout