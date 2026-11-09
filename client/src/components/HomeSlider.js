import React, { useState, useEffect } from "react";
import "./HomeSlider.css";
import "./Header.css";
import Banner from '../images/banner-1.jpg'
import Banner2 from '../images/banner-2.jpg'
import Banner3 from '../images/banner-3.jpg'
import Banner4 from '../images/banner-4.jpg'
import { Link } from "react-router-dom";

const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to handle slide changes
  const handleSlideChange = (newSlide) => {
    setCurrentSlide(newSlide);
  };

  // UseEffect to handle automatic slide change every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newSlide = (currentSlide + 1) % 4; // Assuming you have 4 slides
      handleSlideChange(newSlide);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentSlide]);

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
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="0"
                      className={` ${currentSlide === 0 ? "active" : ""}`}
                      aria-label="Slide 1"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="1"
                      className={` ${currentSlide === 1 ? "active" : ""}`}
                      aria-label="Slide 2"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="2" // Corrected to 2
                      className={` ${currentSlide === 2 ? "active" : ""}`}
                      aria-label="Slide 3"
                    ></button>
                    <button
                      type="button"
                      data-bs-target="#carouselExampleCaptions"
                      data-bs-slide-to="3" // Corrected to 3
                      className={` ${currentSlide === 3 ? "active" : ""}`}
                      aria-label="Slide 4"
                    ></button>
                  </div>
                  <div className="carousel-inner">
                    <div className={`carousel-item ${currentSlide === 0 ? "active" : ""}`}>
                      <img src={Banner} className="d-block w-100" alt="Slide 1" />
                      <div className="carousel-caption d-none d-md-block ">
                        <h5 className="d-none">Pure Coffee <br/> Big Discount</h5>
                        <p className="d-none">
                          Save up to 50% off on your first order
                        </p>
                      </div>
                    </div>
                    <div className={`carousel-item ${currentSlide === 1 ? "active" : ""}`}>
                      <img src={Banner3} className="d-block w-100" alt="Slide 2" />
                      <div className="carousel-caption d-none d-md-block ">
                        <h5 className="d-none">Pure Coffee <br/> Big Discount</h5>
                        <p className="d-none">
                          Save up to 50% off on your first order
                        </p>
                      </div>
                    </div>
                    <div className={`carousel-item ${currentSlide === 2 ? "active" : ""}`}>
                      <img src={Banner4} className="d-block w-100" alt="Slide 3" />
                      <div className="carousel-caption d-none d-md-block ">
                        <h5 className="d-none">Pure Coffee <br/> Big Discount</h5>
                        <p className="d-none">
                          Save up to 50% off on your first order
                        </p>
                      </div>
                    </div>
                    <div className={`carousel-item ${currentSlide === 3 ? "active" : ""}`}>
                      <img src={Banner2} className="d-block w-100" alt="Slide 4" />
                      <div className="carousel-caption d-none d-md-block">
                        <h5 className="d-none">Snacks Box <br/> Daily Save</h5>
                        <p className="d-none">
                          SignUp for the daily newsletter
                        </p>
                      </div>
                    </div>
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
              <div className="banner-img style-3 animated animated">
                <div className="banner-text" style={{ marginTop: "8rem" }}>
                  <p className="cutom-color mb-50 d-flex flex-column" style={{ fontSize: "36px" }}>
                    <span>Delivered to</span><span className="mt-3 ms-4">your home
                    </span>
                  </p>
                  <Link to='/' className="shop-now-hover btn btn">
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
