import { useState } from 'react';
import Bottombar from './components/Bottombar';
import Layout from './components/Layout';
import Topbar from './components/Topbar';

function App() {

  // Variables and setters for which view is in which quadrant
  const [topLeft, setTopLeft] = useState(localStorage.getItem('topLeft') != null ? localStorage.getItem('topLeft') : 'Type');
  const [topRight, setTopRight] = useState(localStorage.getItem('topRight') != null ? localStorage.getItem('topRight') : 'Schema');
  const [bottomLeft, setBottomLeft] = useState(localStorage.getItem('bottomLeft') != null ? localStorage.getItem('bottomLeft') : 'Focus');
  const [bottomRight, setBottomRight] = useState(localStorage.getItem('bottomRight') != null ? localStorage.getItem('bottomRight') : 'Empty');

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

      {/* <Bottombar></Bottombar> */}

    </div>
  );
}

export default App;
