import { useState } from 'react';
import Layout from './components/Layout';
import Topbar from './components/Topbar';

function App() {

  // Variables and setters for which view is in which quadrant
  const [topLeft, setTopLeft] = useState('Type');
  const [topRight, setTopRight] = useState('Schema');
  const [bottomLeft, setBottomLeft] = useState('Focus');
  const [bottomRight, setBottomRight] = useState('Empty');

  return (
    <div className="app">

      {/* Everything above the quadrants is rendered here  */}
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

      {/* The quadrants and everything inside is rendere here */}
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
