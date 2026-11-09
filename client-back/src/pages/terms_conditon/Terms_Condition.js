import React, { useContext, useEffect, useState } from "react";
import "./Terms_Condition.css";
import sideimage from "../../images/side-image.jpg";
import logo from "../../images/favIcon.png";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import MidFooter from "../../components/MidFooter";
import Featured from "../../components/Featured";
import Subscribe from "../../components/Subscribe";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import SignContext from "../../contextAPI/Context/SignContext";
const Terms_Condition = () => {

  const { GetTermsCondition } = useContext(SignContext);
  const [ContentData, setContentData] = useState([]);

  const getaboutUsContent = async () => {
    const res = await GetTermsCondition();
    console.log(res);

    if (res.success) {
      setContentData(res.content);
    }
  };

  useEffect(() => {
    getaboutUsContent();
  }, []);


  return (
    <div>
        <Header/>
        <div class="page-header breadcrumb-wrap">
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
      
      <Subscribe/>
      <Featured/>
      <MidFooter/>
    </div>
  );
};

export default Terms_Condition;
