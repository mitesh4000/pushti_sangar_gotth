import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Subscribe from "../../components/Subscribe";
import MidFooter from "../../components/MidFooter";
import Featured from "../../components/Featured";
import Header from "../../components/Header";
import GalleryImg from "./../../images/product-detail.jpg";
import "./Gallery.css";
import axios from "axios";
import MobileSidebar from "../../components/MobileSidebar";
import { storeGallery } from "../../state/action";

const Gallery = () => {
  const dispatch = useDispatch();
  const arrayOfGallery = useSelector((state) => state.gallery);
  const url = `${process.env.REACT_APP_BASE_URL}`;

  const [filterdPosts, setGalleryFilterdPosts] = useState([]);

  const getAllGallerys = () => {
    if (arrayOfGallery) {
      axios
        .post(`${url}/gallery/getgallerycat`)
        .then((res) => {
          const responseData = res.data.GalleryCat;
          const isEmptyArray =
            Array.isArray(responseData) && responseData.length === 0;

          // Use a ternary operator to conditionally dispatch or log a message
          isEmptyArray
            ? console.log("Received an empty array from the server.")
            : dispatch(storeGallery(responseData));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (arrayOfGallery ? arrayOfGallery.length === 0 : null) {
      getAllGallerys();
    }
    setGalleryFilterdPosts(arrayOfGallery);
    console.log(arrayOfGallery);
  }, []);

  return (
    <React.Fragment>
      <Header />
      <MobileSidebar />
      <div class="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <Link className="homeLink" to="/" rel="nofollow">
              <i className="fi-rs-home ">
                <AiOutlineHome />
              </i>
              Home
            </Link>
            <AiOutlineRight className="rightIcon" /> Gallery
          </div>
        </div>
      </div>
      <section className="team-section sec-pad">
        <div className="container">
          <div className="sec-title mb_50 centred">
            <h2>Gallery</h2>
          </div>
          <div className="row clearfix">
            {arrayOfGallery
              ? arrayOfGallery
                  .filter((item) => item.active)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="col-lg-3 col-md-6 col-sm-12 team-block"
                    >
                      <Link to={`/gallery-details/${item._id}`}>
                        <div className="galleryCard">
                          <div className="inner-box">
                            <Link to={`/gallery-details/${item._id}`}>
                              <div className="image-box">
                                <figure className="image">
                                  <img
                                    src={`${url}/gallery-images/${item.imagePath}`}
                                    onError={(e) => {
                                      e.target.src =
                                        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
                                    }}
                                    alt=""
                                  />
                                </figure>
                              </div>
                            </Link>
                            <div className="lower-content">
                              <h3 className="titleLink">
                                <Link to={`/gallery-details/${item._id}`}>
                                  {item.gallaryCategoryTitle}
                                </Link>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
              : null}
          </div>
        </div>
      </section>

      <Subscribe />
      <Featured />
      <MidFooter />
    </React.Fragment>
  );
};

export default Gallery;
