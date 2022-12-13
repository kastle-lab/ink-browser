import { useState } from 'react';

import Layout from './components/Layout';
import Topbar from './components/Topbar';

function App() {

  const [topLeft, setTopLeft] = useState('Type');
  const [topRight, setTopRight] = useState('Schema');
  const [bottomLeft, setBottomLeft] = useState('Focus');
  const [bottomRight, setBottomRight] = useState('Empty');

  return (
    <div className="app">
      <Topbar 
      setTopLeft={setTopLeft} 
      setTopRight={setTopRight} 
      setBottomLeft={setBottomLeft} 
      setBottomRight={setBottomRight}
      topLeft={topLeft}
      topRight={topRight}
      bottomLeft={bottomLeft}
      bottomRight={bottomRight}
      ></Topbar>

      <Layout 
      topLeft={topLeft} 
      topRight={topRight} 
      bottomLeft={bottomLeft} 
      bottomRight={bottomRight}
      ></Layout>
    </div>
  );
}

export default App;
