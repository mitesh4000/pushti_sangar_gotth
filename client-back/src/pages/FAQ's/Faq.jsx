import React, { useContext, useEffect, useState } from 'react'
import SignContext from '../../contextAPI/Context/SignContext';
import MidFooter from '../../components/MidFooter';
import Featured from '../../components/Featured';
import Subscribe from '../../components/Subscribe';
import { AiOutlineHome, AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import MobileSidebar from '../../components/MobileSidebar';
import Header from '../../components/Header';

const Faq = () => {
    const { GetFAQs } = useContext(SignContext);
  const [ContentData, setContentData] = useState([]);

  const getaboutUsContent = async () => {
    const res = await GetFAQs();
    console.log(res);

    if (res.success) {
      setContentData(res.content);
    }
  };

  useEffect(() => {
    getaboutUsContent();
  }, []);

  return (
    <>
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
            <AiOutlineRight className="rightIcon" /> FAQ's
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
      <Featured/>
      <MidFooter />
    </>
    
  )
}

export default Faq