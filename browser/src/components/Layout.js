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
  const [data, setData] = useState();
  const [bindings, setBindings] = useState();
  const [typeIsPending, setTypeIsPending] = useState(false);

  // Set view components equal to a variable
  const type = <div className='quadrant'><Type data={data} bindings={bindings} typeIsPending={typeIsPending}></Type></div>;
  const schema = <div className='schema'><Schema bindings={bindings} data={data} setData={setData} setTypeIsPending={setTypeIsPending}></Schema></div>;
  const focus = <div className='quadrant'><Focus></Focus></div>;
  const classHierarchy = <div className='quadrant'><ClassHierarchy></ClassHierarchy></div>;
  const client = <div className='quadrant'><Client></Client></div>
  const statistics = <div className='quadrant'><Statistics></Statistics></div>;
  const search = <div className='quadrant'><Search bindings={bindings} setBindings={setBindings}></Search></div>;
  const empty = <div className='quadrant'></div>;

  return (
    <div className='gridlayout'>

      {/* Logic for which view to render in the top left qudrant */}
      {topLeft === 'Type' && type}
      {topLeft === 'Schema' && schema}
      {topLeft === 'Focus' && focus}
      {topLeft === 'Class Hierarchy' && classHierarchy}
      {topLeft === 'Client' && client}
      {topLeft === 'Statistics' && statistics}
      {topLeft === 'Search' && search}
      {topLeft === 'Empty' && empty}



      {/* Logic for which view to render in the top right qudrant */}
      {topRight === 'Type' && type}
      {topRight === 'Schema' && schema}
      {topRight === 'Focus' && focus}
      {topRight === 'Class Hierarchy' && classHierarchy}
      {topRight === 'Client' && client}
      {topRight === 'Statistics' && statistics}
      {topRight === 'Search' && search}
      {topRight === 'Empty' && empty}

      {/* Logic for which view to render in the bottom left qudrant */}
      {bottomLeft === 'Type' && type}
      {bottomLeft === 'Schema' && schema}
      {bottomLeft === 'Focus' && focus}
      {bottomLeft === 'Class Hierarchy' && classHierarchy}
      {bottomLeft === 'Client' && client}
      {bottomLeft === 'Statistics' && statistics}
      {bottomLeft === 'Search' && search}
      {bottomLeft === 'Empty' && empty}

      {/* Logic for which view to render in the bottom right qudrant */}
      {bottomRight === 'Type' && type}
      {bottomRight === 'Schema' && schema}
      {bottomRight === 'Focus' && focus}
      {bottomRight === 'Class Hierarchy' && classHierarchy}
      {bottomRight === 'Client' && client}
      {bottomRight === 'Statistics' && statistics}
      {bottomRight === 'Search' && search}
      {bottomRight === 'Empty' && empty}

    </div>
  )
}

export default Layout