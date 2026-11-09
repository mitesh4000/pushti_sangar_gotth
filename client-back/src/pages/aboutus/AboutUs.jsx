import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

import AboutImg from "./../../images/Countdown.jpg";
import "./aboutUs.css";
import Subscribe from "../../components/Subscribe";
import MidFooter from "../../components/MidFooter";
import Featured from "../../components/Featured";
import Header from "../../components/Header";
import MobileSidebar from "../../components/MobileSidebar";
import SignContext from "../../contextAPI/Context/SignContext";

const AboutUs = () => {
  const { GetAboutUsContent } = useContext(SignContext);
  const [ContentData, setContentData] = useState([]);

  const getaboutUsContent = async () => {
    const res = await GetAboutUsContent();
    console.log(res);

    if (res.success) {
      setContentData(res.content);
    }
  };

  useEffect(() => {
    getaboutUsContent();
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
            <AiOutlineRight className="rightIcon" /> About us
          </div>
        </div>
      </div>
      <div className="page-content pt-50">
        <div className="container">
          <div className="container">
            <div
            dangerouslySetInnerHTML=
            {{
              __html: ContentData?ContentData.content:null,
            }}
            >

            </div>
          </div>
        </div>
      </div>
      <Subscribe />
      <Featured />
      <MidFooter />
    </React.Fragment>
  );
};

export default AboutUs;
