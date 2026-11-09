import React from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import './Category.css'

const ShowMoreCategory = ({ onClick }) => {
  return (
    <div className="col-12  col-md-6 col-lg-3  category col-lg-1-5">
      <div className="card">
        <div className="card-body text-center">
          <p className="card-text mt-2 d-block">
            <span className="fw-bold d-flex flex-column align-items-center" onClick={onClick}>
               <span className="show-more-category-icon" > <AiOutlineAppstore/></span>
             <span className="text-center "> View All</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowMoreCategory;
