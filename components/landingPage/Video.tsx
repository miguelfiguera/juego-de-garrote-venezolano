import React from "react";

function Video() {
  return (
    <div className="container-fluid bg-black p-5">
      <div className="container d-flex justify-content-center ">
        <iframe
          width="600"
          height="400"
          className="rounded-3"
          src="https://www.youtube.com/embed/dUlRw8VlL1g?si=kUF4u1g3fExvOQPO"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
}

export default Video;
