import React, { useState } from 'react'

function Video() {

  // URL input State 
  const [url, setUrl] = useState('');

  // Default URL
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/y7sXDpffzQQ?si=fLAVlojPQW0P6CE-')

  // Udate URL during typing
  const handleChange = (event) => {setUrl(event.target.value)};

  // Handle key presses
  const handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      const embedUrl = convertUrl(String(url));
      setVideoUrl(embedUrl);
      event.preventDefault();
    }
  }

  // Function takes in default YouTube URL and converts it to an embedded video
  function convertUrl(url) {
    if (String(url).includes('watch?v=')) {
      return url.replace(/watch\?v=/, 'embed/')
    }
    return url 
  }

  return (
    <div> 
      <input 
        type="text"
        value = {url}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder='Enter YouTube URL here and press Enter'
        style = {{width:'100%', padding: '10px'}}
      />
      <p align="center">
      <iframe
        width="640"
        height="480"
        src={videoUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      </p>
    </div>
  )
  
}

export default Video