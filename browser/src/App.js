import { useEffect, useState } from 'react';

import Layout from './components/Layout';
import Topbar from './components/Topbar';
import Schema from './components/Schema';
import Type from './components/Type';
import Focus from './components/Focus';

function App() {
  const [data, setData] = useState(null);
  const [layout, setLayout] = useState([<Type data={data} setData={setData}></Type>, <Schema data={data} setData={setData}></Schema>, <Focus></Focus>, null ])
  const [topLeft, setTopLeft] = useState(<Type data={data} setData={setData}></Type>);
  const [topRight, setTopRight] = useState(<Schema data={data} setData={setData}></Schema>);
  const [bottomLeft, setBottomLeft] = useState(<Focus></Focus>);
  const [bottomRight, setBottomRight] = useState(null);

  return (
    <div className="app">
      <Topbar></Topbar>
      <Layout layout={layout}></Layout>
    </div>
  );
}

export default App;
