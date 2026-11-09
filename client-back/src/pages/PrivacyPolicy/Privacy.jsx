import React, { useContext, useEffect, useState } from 'react'
import MobileSidebar from '../../components/MobileSidebar'
import Header from '../../components/Header'
import Subscribe from '../../components/Subscribe'
import Featured from '../../components/Featured'
import MidFooter from '../../components/MidFooter'
import SignContext from '../../contextAPI/Context/SignContext'
import { Link } from 'react-router-dom'
import { AiOutlineHome, AiOutlineRight } from 'react-icons/ai'

const Privacy = () => {
  const { GetPrivacyPolicy } = useContext(SignContext);
  const [ContentData, setContentData] = useState([]);

  const getaboutUsContent = async () => {
    const res = await GetPrivacyPolicy();
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
            <AiOutlineRight className="rightIcon" /> Privacy Policy
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

export default Privacy