import React, { useState, useEffect, useContext } from "react";
import "./HomeSlider.css";
import "./Header.css";
// import Banner from "../images/banner-1.jpg";
// import Banner2 from "../images/banner-2.jpg";
// import Banner3 from "../images/banner-3.jpg";
// import Banner4 from "../images/banner-4.jpg";
import { Link } from "react-router-dom";
import SignContext from "../contextAPI/Context/SignContext";

const HomeSlider = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;

  const { getAllBanner } = useContext(SignContext);
  const [BannerData, setBannerData] = useState([]);

  const GetBanners = async () => {
    const res = await getAllBanner();
    console.log(res);
    if(res.data){

      const filteredData = res.data.filter((banner) => banner.bannerType === "carousel" && banner.isActive === true);
      setBannerData(filteredData);
    }

  };

  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to handle slide changes
  const handleSlideChange = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  // UseEffect to handle automatic slide change every 3 seconds
  useEffect(() => {
    GetBanners();
    const intervalId = setInterval(() => {
      const newSlide = (currentSlide + 1) % 4; // Assuming you have 4 slides
      handleSlideChange(newSlide);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <section className="home-slider style-2 position-relative mb-50">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-12">
              <div className="home-slide-cover">
                <div
                  id="carouselExampleCaptions"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators">
                    {BannerData.map((banner, index) => (
                      <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={index}
                        className={` ${currentSlide === index ? "active" : ""}`}
                        aria-label={`Slide ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                  <div className="carousel-inner">
                    
                    {BannerData.map(
                      (banner, index) =>
                        (
                          <div
                            key={index}
                            className={`carousel-item ${
                              currentSlide === index ? "active" : ""
                            }`}
                          >
                            <Link to="/shop">
                            <img
                              src={`${url}/banner/${banner.image}`} // Assuming you have an 'image' property in BannerData
                              className="d-block w-100"
                              alt={`Slide ${index + 1}`}
                            />
                            </Link>
                            <div className="carousel-caption d-none d-md-block">
                              {/* <h5>{banner.title}</h5> */}
                              {/* <p>{banner.description}</p> */}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-none d-xl-block">
                    <div
                      className="banner-img style-3 animated animated"
                    >
                      <div
                        className="banner-text"
                        style={{ marginTop: "8rem" }}
                      >
                        <p
                          className="cutom-color mb-50 d-flex flex-column"
                          style={{ fontSize: "36px" }}
                        >
                          <span>Delivered to</span>
                          <span className="mt-3 ms-4">your home</span>
                        </p>
                        {/* <img
                          src={banner.image}
                          alt=""
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "15px",
                            overflow: "hidden",
                          }}
                        /> */}
                        <Link to="/shop" className="shop-now-hover btn btn">
                          Shop Now <i className="fi-rs-arrow-small-right" />
                        </Link>
                      </div>
                    </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSlider;
