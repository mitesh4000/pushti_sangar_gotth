import React from "react";
import "./Terms_Condition.css";
import sideimage from "../../images/side-image.jpg";
import logo from "../../images/favIcon.png";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import MidFooter from "../../components/MidFooter";
import Featured from "../../components/Featured";
import Subscribe from "../../components/Subscribe";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
const Terms_Condition = () => {
  return (
    <div>
        <Header/>
        <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <Link className="homeLink" to="/" rel="nofollow">
              <i className="fi-rs-home ">
                <AiOutlineHome />
              </i>
              Home
            </Link>
            <AiOutlineRight className="rightIcon" /> <span /> Terms & Conditions <span />
            
          </div>
        </div>
      </div>

      <div className="page-content pt-50" style={{ transform: "none" }}>
        <div className="container" style={{ transform: "none" }}>
          <div className="row" style={{ transform: "none" }}>
            <div
              className="col-xl-10 col-lg-12 m-auto"
              style={{ transform: "none" }}
            >
              <div className="row" style={{ transform: "none" }}>
                <div className="col-lg-9">
                  <div className="single-page pr-30 mb-lg-0 mb-sm-5">
                    <div className="single-header style-2">
                      <h2>Terms & Conditions</h2>
                      <div className="entry-meta meta-1 meta-3 font-xs mt-15 mb-15">
                        <span className="post-by">
                          By <a href="#">Manish</a>
                        </span>
                        <span className="post-on has-dot">9 April 2020</span>
                        <span className="time-reading has-dot">
                          8 mins read
                        </span>
                        <span className="hit-count has-dot">29k Views</span>
                      </div>
                    </div>
                    <div className="single-content mb-50">
                      <p>
                        Please read these Terms of Service (“Terms”, “Terms of
                        Service”) carefully before using the https:pustisangar.com
                        website (the “Service”) operated by Barodaweb (“us”, “we”,
                        or “our”).
                      </p>
                      <p>
                        Your access to and use of the Service is conditioned on
                        your acceptance of and compliance with these Terms.
                        These Terms apply to all visitors, users and others who
                        access or use the Service.
                      </p>
                      <p>
                        By accessing or using the Service you agree to be bound
                        by these Terms. If you disagree with any part of the
                        terms then you may not access the Service.
                      </p>
                      <h4>Rights &amp; restrictions</h4>
                      <ol>
                        <li>Members must be at least 18 years of age.</li>
                        <li>
                          Members are granted a time-limited, non-exclusive,
                          revocable, nontransferable, and non-sublicensable
                          right to access that portion of the online course
                          corresponding to the purchase.
                        </li>
                        <li>
                          The portion of the online course corresponding to the
                          purchase will be available to the Member as long as
                          the course is maintained by the Company, which will be
                          a minimum of one year after Member’s purchase.
                        </li>
                        <li>
                          The videos in the course are provided as a video
                          stream and are not downloadable.
                        </li>
                        <li>
                          By agreeing to grant such access, the Company does not
                          obligate itself to maintain the course, or to maintain
                          it in its present form.
                        </li>
                      </ol>
                      <h4>Links To Other Web Sites</h4>
                      <p>
                        Our Service may contain links to third-party web sites
                        or services that are not owned or controlled by Evara.
                      </p>
                      <p>
                        Evara has no control over, and assumes no responsibility
                        for, the content, privacy policies, or practices of any
                        third party web sites or services. You further
                        acknowledge and agree that Evara shall not be
                        responsible or liable, directly or indirectly, for any
                        damage or loss caused or alleged to be caused by or in
                        connection with use of or reliance on any such content,
                        goods or services available on or through any such web
                        sites or services.
                      </p>
                      <p>
                        We strongly advise you to read the terms and conditions
                        and privacy policies of any third-party web sites or
                        services that you visit.
                      </p>
                      <h4>Termination</h4>
                      <p>
                        We may terminate or suspend access to our Service
                        immediately, without prior notice or liability, for any
                        reason whatsoever, including without limitation if you
                        breach the Terms.
                      </p>
                      <p>
                        All provisions of the Terms which by their nature should
                        survive termination shall survive termination,
                        including, without limitation, ownership provisions,
                        warranty disclaimers, indemnity and limitations of
                        liability.
                      </p>
                      <h4>Governing Law</h4>
                      <p>
                        These Terms shall be governed and construed in
                        accordance with the laws of Viet Nam, without regard to
                        its conflict of law provisions.
                      </p>
                      <p>
                        Our failure to enforce any right or provision of these
                        Terms will not be considered a waiver of those rights.
                        If any provision of these Terms is held to be invalid or
                        unenforceable by a court, the remaining provisions of
                        these Terms will remain in effect. These Terms
                        constitute the entire agreement between us regarding our
                        Service, and supersede and replace any prior agreements
                        we might have between us regarding the Service.
                      </p>
                      <h4>Changes</h4>
                      <p>
                        We reserve the right, at our sole discretion, to modify
                        or replace these Terms at any time. If a revision is
                        material we will try to provide at least 30 days notice
                        prior to any new terms taking effect. What constitutes a
                        material change will be determined at our sole
                        discretion.
                      </p>
                      <p>
                        By continuing to access or use our Service after those
                        revisions become effective, you agree to be bound by the
                        revised terms. If you do not agree to the new terms,
                        please stop using the Service.
                      </p>
                      <h4>Contact Us</h4>
                      <p>
                        If you have any questions about these Terms, please{" "}
                        <a href="page-contact.html">contact us</a>.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 primary-sidebar sticky-sidebar pt-50">
                  <div className="theiaStickySidebar">
                    <div className="widget-area">
                      <div className="sidebar-widget widget-category-2 mb-50">
                        <h5 className="section-title style-1 mb-30">
                          Category
                        </h5>
                        <ul>
                          <li>
                            <Link to="#">
                              {" "}
                              <img src={logo} alt="logo" />
                              Vastra
                            </Link>
                            
                          </li>
                          <li>
                            <Link to="#">
                              {" "}
                              <img src={logo} alt="logo" />
                              Shringar
                            </Link>
                            
                          </li>
                          <li>
                            <Link to="#">
                              {" "}
                              <img src={logo} alt="logo" />
                              Karnaful{" "}
                            </Link>
                            
                          </li>
                          <li>
                            <Link to="#">
                              {" "}
                              <img src={logo} alt="logo" />
                              Mukhravind
                            </Link>
                            
                          </li>
                          <li>
                            <Link to="#">
                              {" "}
                              <img src={logo} alt="logo" />
                              Netra
                            </Link>
                            
                          </li>
                        </ul>
                      </div>

                      <div
                        className="banner-img wow fadeIn mb-0 animated d-lg-block d-none animated"
                        style={{ visibility: "visible", minHeight: "300px" }}
                      >
                        <img src={sideimage} alt="Hot deals" />
                        <div className="baner-text">
                          <span>HOT DEALS</span>
                          <h4 className="fs-6 mt-4">
                            Don't Miss <br />
                            Trending
                            <br />
                            Save to 50%
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Featured/>
      <Subscribe/>
      <MidFooter/>
    </div>
  );
};

export default Terms_Condition;
