import React from 'react'

function Video() {

  return (
    <div> 
      <p align="center">
      <iframe
        width="640"
        height="480"
        src="https://www.youtube.com/embed/y7sXDpffzQQ?si=fLAVlojPQW0P6CE-"
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