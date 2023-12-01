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
  const [zoomLevel, setZoomLevel] = useState(localStorage.getItem('zoomLevel') != null ? localStorage.getItem('zoomLevel') : 8);
  const [endpoint, setEndpoint] = useState(localStorage.getItem('endpoint') != null ? localStorage.getItem('endpoint') : 'http://localhost:3030/agent-role/');
  const [theme, setTheme] = useState(localStorage.getItem('theme') != null ? localStorage.getItem('theme') : 'Light');
  const [viewSelect, setViewSelect] = useState(localStorage.getItem('showViewSelect') != null ? localStorage.getItem('showViewSelect') : 'Show');

  return (

    <div className={`app ${theme}`}>

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
      zoomLevel={zoomLevel}
      setZoomLevel={setZoomLevel}
      endpoint={endpoint}
      setEndpoint={setEndpoint}
      theme={theme}
      setTheme={setTheme}
      viewSelect={viewSelect}
      setViewSelect={setViewSelect}
      ></Topbar>

      {/* The quadrants and everything inside is rendere here */}
      <Layout 
      topLeft={topLeft} 
      topRight={topRight} 
      bottomLeft={bottomLeft} 
      bottomRight={bottomRight}
      zoomLevel={zoomLevel}
      endpoint={endpoint}
      theme={theme}
      ></Layout>

      <Bottombar theme={theme}></Bottombar>

    </div>

  );
}

export default App;
