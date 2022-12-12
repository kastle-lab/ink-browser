import React, { useState } from 'react';
import Schema from './Schema';
import Type from './Type';
import Focus from './Focus';

function Layout() {

  const [data, setData] = useState(null);
  console.log(data)

  return (
    <div className='gridlayout'>
      <div className='quadrant type topTwo'><Type data={data} setData={setData}></Type></div>
      <div className='quadrant schema topTwo'><Schema data={data} setData={setData}></Schema></div>
      <div className='quadrant focus bottomTwo'><Focus></Focus></div>
      <div className='quadrant bottomTwo'></div>
    </div>
  )
}

export default Layout