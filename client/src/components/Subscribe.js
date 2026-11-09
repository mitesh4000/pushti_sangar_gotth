import React from "react";
import "./Subscribe.css";
// import footerBanner from "../images/footer-banner.jpg";

const Subscribe = () => {
  return (
    <div>
      <section
        className="newsletter mb-15 wow animate__ animate__fadeIn animated mt-4"
        style={{ visibility: "visible", animationName: "fadeIn" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="position-relative newsletter-inner">
                <div className="newsletter-content text-start ">
                  <h2 className="mb-20 s-main-txt">
                    Explore the finest Krishna Sringar online 
                    at Pushti Shangar being at home.
                  </h2>
                  <p className="mb-45" style={{ color: "#253D4E" }}>
                    Start Your Daily Shopping with{" "}
                    
                      PushtiShangar
                   
                  </p>
                  <p className="font-sm text-capitalize footer-text2 mt-2 text-dark fw-bold " >Up to 15% discount on your first subscribe</p>
                  <form className="form-subcriber d-flex mt-5">
                    <input type="email" placeholder="Your Email" />
                    <button className="shop-now-hover subscribe-btn btn mx-5" type="submit">
                      Subscribe
                    </button>
                  </form>
                </div>
                {/* <img src={footerBanner} alt="newsletter" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscribe;
