import React from "react";

const Preloader = () => {
  return (
    <div className="preloader-container">
      <div className="preloader">
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-grow text-info" role="status"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
