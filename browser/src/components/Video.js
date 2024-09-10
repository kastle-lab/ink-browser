import React from "react";

function Video({ videoUrl }) {
  return (
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/y7sXDpffzQQ?si=fLAVlojPQW0P6CE-"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}

export default Video;
