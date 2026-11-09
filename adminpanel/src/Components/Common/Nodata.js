import React from "react";
import FeatherIcon from "feather-icons-react";

const Nodata = () => {
  return (
    <div id="elmLoader" className="py-4 mt-4 text-center">
    <div className="d-flex flex-column align-items-center">
      <i
        className="las la-exclamation-triangle"
        style={{ fontSize: "48px" }}
      ></i>

      <h5 className="mt-4">Sorry No data to display</h5>
    </div>
  </div>
  );
};

export default Nodata;
