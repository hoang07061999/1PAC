import React from "react";

const Loading = ({ isShow }) => (
  <div className={`a-loader-circle${isShow ? "" : "-hide"}`}>
    <div className="loader-fading-circle">
      <span className="loader-circle1 loader-circle" />
      <span className="loader-circle2 loader-circle" />
      <span className="loader-circle3 loader-circle" />
      <span className="loader-circle4 loader-circle" />
      <span className="loader-circle5 loader-circle" />
      <span className="loader-circle6 loader-circle" />
      <span className="loader-circle7 loader-circle" />
      <span className="loader-circle8 loader-circle" />
      <span className="loader-circle9 loader-circle" />
      <span className="loader-circle10 loader-circle" />
      <span className="loader-circle11 loader-circle" />
      <span className="loader-circle12 loader-circle" />
    </div>
  </div>
);

export default Loading;
