import React, { useState } from 'react';
import Schema from './Schema';
import Type from './Type';
import Focus from './Focus';

function Layout(layout) {

  const [data, setData] = useState(null);

  const {topLeft, topRight, bottomLeft, bottomRight} = layout;

  return (
    <div className='gridlayout'>

      {topLeft == 'Type' && <div className='quadrant'><Type data={data} setData={setData}></Type></div>}
      {topLeft == 'Schema' && <div className='quadrant'><Schema data={data} setData={setData}></Schema></div>}
      {topLeft == 'Focus' && <div className='quadrant'><Focus></Focus></div>}
      {topLeft == 'Empty' && <div className='quadrant'></div>}

      {topRight == 'Schema' && <div className='quadrant'><Schema data={data} setData={setData}></Schema></div>}
      {topRight == 'Type' && <div className='quadrant'><Type data={data} setData={setData}></Type></div>}
      {topRight == 'Focus' && <div className='quadrant'><Focus></Focus></div>}
      {topRight == 'Empty' && <div className='quadrant'></div>}

      {bottomLeft == 'Focus' && <div className='quadrant'><Focus></Focus></div>}
      {bottomLeft == 'Type' && <div className='quadrant'><Type data={data} setData={setData}></Type></div>}
      {bottomLeft == 'Schema' && <div className='quadrant'><Schema data={data} setData={setData}></Schema></div>}
      {bottomLeft == 'Empty' && <div className='quadrant'></div>}

      {bottomRight == 'Empty' && <div className='quadrant'></div>}
      {bottomRight == 'Type' && <div className='quadrant'><Type data={data} setData={setData}></Type></div>}
      {bottomRight == 'Schema' && <div className='quadrant'><Schema data={data} setData={setData}></Schema></div>}
      {bottomRight == 'Focus' && <div className='quadrant'><Focus></Focus></div>}

    </div>
  )
}

export default Layout