import React, { useState } from 'react';
import Schema from './Schema';
import Type from './Type';
import Focus from './Focus';
import Search from './Search';
import Statistics from './Statistics';
import ClassHierarchy from './ClassHierarchy';
import Client from './Client'

function Layout(layout) {

  // Destructuring the variables passed down from the parent component into their own variables
  const {topLeft, topRight, bottomLeft, bottomRight} = layout;

  // Variable that is used to transfer data between different quadrants
  const [data, setData] = useState(null);

  return (
    <div className='gridlayout'>

      {/* Logic for which view to render in the top left qudrant */}
      {topLeft === 'Type' && <div className='quadrant'><Type data={data} setData={setData}></Type></div>}
      {topLeft === 'Schema' && <div className='quadrant'><Schema data={data} setData={setData}></Schema></div>}
      {topLeft === 'Focus' && <div className='quadrant'><Focus></Focus></div>}
      {topLeft === 'Class Hierarchy' && <div className='quadrant'><ClassHierarchy></ClassHierarchy></div>}
      {topLeft === 'Client' && <div className='quadrant'><Client></Client></div>}
      {topLeft === 'Statistics' && <div className='quadrant'><Statistics></Statistics></div>}
      {topLeft === 'Search' && <div className='quadrant'><Search></Search></div>}
      {topLeft === 'Empty' && <div className='quadrant'></div>}

      {/* Logic for which view to render in the top right qudrant */}
      {topRight === 'Schema' && <div className='quadrant'><Schema data={data} setData={setData}></Schema></div>}
      {topRight === 'Type' && <div className='quadrant'><Type data={data} setData={setData}></Type></div>}
      {topRight === 'Focus' && <div className='quadrant'><Focus></Focus></div>}
      {topRight === 'Class Hierarchy' && <div className='quadrant'><ClassHierarchy></ClassHierarchy></div>}
      {topRight === 'Client' && <div className='quadrant'><Client></Client></div>}
      {topRight === 'Statistics' && <div className='quadrant'><Statistics></Statistics></div>}
      {topRight === 'Search' && <div className='quadrant'><Search></Search></div>}
      {topRight === 'Empty' && <div className='quadrant'></div>}

      {/* Logic for which view to render in the bottom left qudrant */}
      {bottomLeft === 'Focus' && <div className='quadrant'><Focus></Focus></div>}
      {bottomLeft === 'Type' && <div className='quadrant'><Type data={data} setData={setData}></Type></div>}
      {bottomLeft === 'Schema' && <div className='quadrant'><Schema data={data} setData={setData}></Schema></div>}
      {bottomLeft === 'Class Hierarchy' && <div className='quadrant'><ClassHierarchy></ClassHierarchy></div>}
      {bottomLeft === 'Client' && <div className='quadrant'><Client></Client></div>}
      {bottomLeft === 'Statistics' && <div className='quadrant'><Statistics></Statistics></div>}
      {bottomLeft === 'Search' && <div className='quadrant'><Search></Search></div>}
      {bottomLeft === 'Empty' && <div className='quadrant'></div>}

      {/* Logic for which view to render in the bottom right qudrant */}
      {bottomRight === 'Empty' && <div className='quadrant'></div>}
      {bottomRight === 'Type' && <div className='quadrant'><Type data={data} setData={setData}></Type></div>}
      {bottomRight === 'Schema' && <div className='quadrant'><Schema data={data} setData={setData}></Schema></div>}
      {bottomRight === 'Class Hierarchy' && <div className='quadrant'><ClassHierarchy></ClassHierarchy></div>}
      {bottomRight === 'Client' && <div className='quadrant'><Client></Client></div>}
      {bottomRight === 'Statistics' && <div className='quadrant'><Statistics></Statistics></div>}
      {bottomRight === 'Search' && <div className='quadrant'><Search></Search></div>}
      {bottomRight === 'Focus' && <div className='quadrant'><Focus></Focus></div>}

    </div>
  )
}

export default Layout