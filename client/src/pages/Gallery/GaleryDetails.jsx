import React from "react";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Subscribe from "../../components/Subscribe";
import MidFooter from "../../components/MidFooter";
import Featured from "../../components/Featured";
import Header from "../../components/Header";
import GalleryImg from "./../../images/product-detail.jpg";
import "./Gallery.css";
import MobileSidebar from "../../components/MobileSidebar";

const GalleryDetails = () => {
  return (
    <React.Fragment>
      <Header />
      <MobileSidebar/>
      <div className="page-header breadcrumb-wrap">
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
            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
              <Link to="/gallery-details">
                <div className="galleryCard">
                  <Link to="/gallery-details" />
                  <div className="inner-box">
                    <a href="/gallery-details">
                      <div className="image-box">
                        <figure className="image">
                          <img src={GalleryImg} />
                        </figure>
                      </div>
                    </a>
                    <div className="lower-content">
                      <a href="/gallery-details" />
                      <h3 className="titleLink">
                        <Link to="/gallery-details">Ttitle</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
              <Link to="/gallery-details">
                <div className="galleryCard">
                  <Link to="/gallery-details" />
                  <div className="inner-box">
                    <a href="/gallery-details">
                      <div className="image-box">
                        <figure className="image">
                          <img src={GalleryImg} />
                        </figure>
                      </div>
                    </a>
                    <div className="lower-content">
                      <a href="/gallery-details" />
                      <h3 className="titleLink">
                        <Link to="/gallery-details">Ttitle</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
              <Link to="/gallery-details">
                <div className="galleryCard">
                  <Link to="/gallery-details" />
                  <div className="inner-box">
                    <a href="/gallery-details">
                      <div className="image-box">
                        <figure className="image">
                          <img src={GalleryImg} />
                        </figure>
                      </div>
                    </a>
                    <div className="lower-content">
                      <a href="/gallery-details" />
                      <h3 className="titleLink">
                        <Link to="/gallery-details">Ttitle</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
              <Link to="/gallery-details">
                <div className="galleryCard">
                  <Link to="/gallery-details" />
                  <div className="inner-box">
                    <a href="/gallery-details">
                      <div className="image-box">
                        <figure className="image">
                          <img src={GalleryImg} />
                        </figure>
                      </div>
                    </a>
                    <div className="lower-content">
                      <a href="/gallery-details" />
                      <h3 className="titleLink">
                        <Link to="/gallery-details">Ttitle</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
              <Link to="/gallery-details">
                <div className="galleryCard">
                  <Link to="/gallery-details" />
                  <div className="inner-box">
                    <a href="/gallery-details">
                      <div className="image-box">
                        <figure className="image">
                          <img src={GalleryImg} />
                        </figure>
                      </div>
                    </a>
                    <div className="lower-content">
                      <a href="/gallery-details" />
                      <h3 className="titleLink">
                        <Link to="/gallery-details">Ttitle</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
              <Link to="/gallery-details">
                <div className="galleryCard">
                  <Link to="/gallery-details" />
                  <div className="inner-box">
                    <a href="/gallery-details">
                      <div className="image-box">
                        <figure className="image">
                          <img src={GalleryImg} />
                        </figure>
                      </div>
                    </a>
                    <div className="lower-content">
                      <a href="/gallery-details" />
                      <h3 className="titleLink">
                        <Link to="/gallery-details">Ttitle</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
              <Link to="/gallery-details">
                <div className="galleryCard">
                  <Link to="/gallery-details" />
                  <div className="inner-box">
                    <a href="/gallery-details">
                      <div className="image-box">
                        <figure className="image">
                          <img src={GalleryImg} />
                        </figure>
                      </div>
                    </a>
                    <div className="lower-content">
                      <a href="/gallery-details" />
                      <h3 className="titleLink">
                        <Link to="/gallery-details">Ttitle</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
              <Link to="/gallery-details">
                <div className="galleryCard">
                  <Link to="/gallery-details" />
                  <div className="inner-box">
                    <a href="/gallery-details">
                      <div className="image-box">
                        <figure className="image">
                          <img src={GalleryImg} />
                        </figure>
                      </div>
                    </a>
                    <div className="lower-content">
                      <a href="/gallery-details" />
                      <h3 className="titleLink">
                        <Link to="/gallery-details">Ttitle</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Subscribe />
      <Featured />
      <MidFooter />
    </React.Fragment>
  );
};

export default GalleryDetails;
