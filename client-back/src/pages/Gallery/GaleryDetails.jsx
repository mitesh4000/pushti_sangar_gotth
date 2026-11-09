import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import Subscribe from "../../components/Subscribe";
import MidFooter from "../../components/MidFooter";
import Featured from "../../components/Featured";
import Header from "../../components/Header";
import GalleryImg from "./../../images/product-detail.jpg";
import "./Gallery.css";
import axios from "axios";
import MobileSidebar from "../../components/MobileSidebar";
import { storeGallery, storeGalleryCategory } from "../../state/action";
import Gallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';


const GalleryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const arrayOfGallery = useSelector((state) => state.galleryCategoryList);
  console.log(arrayOfGallery);
  const filteredArray = arrayOfGallery.filter(
    (item) => item.galleryCategory === id
  );
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [filterdPosts, setGalleryFilterdPosts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);





  const getAllGallerys = () => {
    if (arrayOfGallery) {
      axios
        .post(`${url}/gallerydetails/getallgalleries`)
        .then((res) => {
          const responseData = res.data.data;
          if (Array.isArray(responseData) && responseData.length === 0) {
            console.log("Received an empty array from the server.");
          } else {
            dispatch(storeGalleryCategory(responseData));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (arrayOfGallery.length === 0) {
        await getAllGallerys();
      }

      console.log(filteredArray);
      setGalleryFilterdPosts(filteredArray);
    };

    fetchData();
  }, [id]);

  const openSlider = (index) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
    console.log(index)
  };

  const closeSlider = () => {
    setIsOpen(false);
  };

  console.log(filterdPosts);



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
            <AiOutlineRight className="rightIcon" /> <span /> Gallery <span />{" "}
            <AiOutlineRight className="rightIcon" /> Gallery details
          </div>
        </div>
      </div>
      <section className="team-section sec-pad">
        <div className="container">
          <div className="sec-title mb_50 centred">
            <h2>Gallery Details</h2>
          </div>
          <div className="row clearfix">
            {filterdPosts.filter(item => item.active).map((item, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-12 team-block"
              >
                <Link>
                  <div className="galleryCard">
                    <div className="inner-box">
                      <Link>
                        <div
                          className="image-box"
                         
                        >
                          <figure className="image" >
                            <Link onClick={() => openSlider(index)}>
                            <img
                              src={`${url}/gallery-images/${item.imagePath}`}
                              onError={(e) => {
                                e.target.src =
                                  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
                              }}
                              alt=""
                            />
                            </Link>
                          </figure>
                          <h5 className="imageTitle">{item.imageTitle}</h5>
                        </div>
                      </Link>
                      <div className="lower-content">
                        <h3 className="titleLink">
                          <Link>
                            {item.gallaryCategoryTitle}
                          </Link>
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Subscribe />
      <Featured />
      <MidFooter />

      

      {isOpen && (
        <div className="overlay">
          <div className="slider-modal">
            <button className="close-button" onClick={closeSlider}>
              X
            </button>
            <Gallery
              items={filterdPosts.map(item => ({
                original: `${url}/gallery-images/${item.imagePath}`,
                thumbnail: `${url}/gallery-images/${item.imagePath}`,
                description: item.imageTitle,
              }))}
              startIndex={selectedImageIndex}
              showThumbnails={false}
              showFullscreenButton={false}
              showPlayButton={false}
              showBullets
              onClose={closeSlider}
              
            />
          </div>
        </div>
      )}
      
    </React.Fragment>
  );
};

export default GalleryDetails;
