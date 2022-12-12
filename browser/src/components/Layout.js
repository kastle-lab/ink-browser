import React, { useState } from 'react';
import Schema from './Schema';
import Type from './Type';
import Focus from './Focus';

function Layout() {

  const [data, setData] = useState(null);

  return (
    <div className='gridlayout'>
      <div className='quadrant'><Type data={data} setData={setData}></Type></div>
      <div className='quadrant'><Schema data={data} setData={setData}></Schema></div>
      <div className='quadrant'><Focus></Focus></div>
      <div className='quadrant'></div>
    </div>
  )
}

export default Layout