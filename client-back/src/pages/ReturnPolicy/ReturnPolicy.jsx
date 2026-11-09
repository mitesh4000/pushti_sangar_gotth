import React, { useContext, useEffect, useState } from 'react'
import MobileSidebar from '../../components/MobileSidebar'
import Header from '../../components/Header'
import Subscribe from '../../components/Subscribe'
import Featured from '../../components/Featured'
import MidFooter from '../../components/MidFooter'
import SignContext from '../../contextAPI/Context/SignContext'
import { AiOutlineHome, AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const ReturnPolicy = () => {
  const { GeReturnPolicy } = useContext(SignContext);
  const [ContentData, setContentData] = useState([]);

  const getaboutUsContent = async () => {
    const res = await GeReturnPolicy();
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
            <AiOutlineRight className="rightIcon" /> Return Policy
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

export default ReturnPolicy