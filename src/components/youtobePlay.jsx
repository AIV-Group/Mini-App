import React from "react";
import YouTube from "react-youtube";

const YoutobePlay = ({ videoId }) => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: false,
    },
  };
  return (
    <div>
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YoutobePlay;
