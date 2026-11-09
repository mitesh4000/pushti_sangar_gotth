import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import offer1 from "../images/p-1.png"
import offer2 from "../images/p-2.png"
import offer3 from "../images/p-3.png"
import SignContext from "../contextAPI/Context/SignContext";

const OfferPart = () => {
  const { GetMidBanner,GetMidBannertwo,GetMidBannerthree } = useContext(SignContext);
  const [ContentData, setContentData] = useState([]);
  const [Content2Data, setContent2Data] = useState([]);
  const [Content3Data, setContent3Data] = useState([]);

  const getaboutUsContent = async () => {
    const res = await GetMidBanner();
    console.log(res);

    if (res.success) {
      setContentData(res.content);
    }
  };
  const getaboutUsContent2 = async () => {
    const res = await GetMidBannertwo();
    console.log(res);

    if (res.success) {
      setContent2Data(res.content);
    }
  };
  const getaboutUsContent3 = async () => {
    const res = await GetMidBannerthree();
    console.log(res);

    if (res.success) {
      setContent3Data(res.content);
    }
  };


  useEffect(() => {
    getaboutUsContent();
    getaboutUsContent2();
    getaboutUsContent3();
  }, []);



  return (
    <div>
      <section className="banners mb-25 mt-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="banner-img">
                <img src={offer1} alt />
                <div className="banner-text">
                <div
            dangerouslySetInnerHTML=
            {{
              __html: ContentData?ContentData.content:null,
            }}
            >

            </div>
                  <Link to="/shop" className="shop-now-hover btn btn-xs mt-5">
                    <span>Shop Now</span> <i className="fi-rs-arrow-small-right bi bi-arrow-right ms-2" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="banner-img">
                <img src={offer2} alt />
                <div className="banner-text">
                <div
            dangerouslySetInnerHTML=
            {{
              __html: Content2Data?Content2Data.content:null,
            }}
            >

            </div>
                  <Link to="/shop" className="shop-now-hover shop-now-hover-2 btn btn-xs mt-5">
                  Shop Now <i className="fi-rs-arrow-small-right bi bi-arrow-right ms-2 " />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-md-none d-lg-flex">
              <div className="banner-img mb-sm-0">
                <img src={offer3} alt />
                <div className="banner-text">
                <div
            dangerouslySetInnerHTML=
            {{
              __html: Content3Data?Content3Data.content:null,
            }}
            >

            </div>
                  <Link to="/blogcategories" className="shop-now-hover btn btn-xs mt-5">
                    Read More <i className="fi-rs-arrow-small-right bi bi-arrow-right ms-2" />
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

export default OfferPart;
