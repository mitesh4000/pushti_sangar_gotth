import React, { useContext, useEffect, useState } from "react";
import './MidFooter.css'
import logo1 from '../images/footer-logo.png'
import { MdLocationPin , MdCall , MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaFacebook,FaInstagram,FaPinterest,FaTwitter, FaYoutube } from 'react-icons/fa';
import SignContext from "../contextAPI/Context/SignContext";



const MidFooter = () => {
  const {
    getCategories,
    getLoggedInCustomer,
  } = useContext(SignContext);
  const [CategoryData, setCategoryData] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const [CustomerInfo, setCustomerInfo] = useState({});
  const openGoogleMaps = () => {
    window.open("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.326428163956!2d73.17078387533668!3d22.30349117968429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8aee6cfffff%3A0xc5da2624cf914dc5!2sPushtishangar!5e0!3m2!1sen!2sin!4v1704121065327!5m2!1sen!2si");
  };
  const email = 'pushtishangarsales@gmail.com';

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };
  const openInstagram = () => {
    window.open("https://www.instagram.com/pushtishangar/?igsh=MXNwZjFvMXkwNDA0dg%3D%3D");
  };
  const openPintrest = () => {
    window.open("https://www.pinterest.com/pushtishangar/?invite_code=79dd065f0f1144c284a9e615b38a7eef&sender=1101552527515708041");
  };
  const openYoutube = () => {
    window.open("https://www.youtube.com/@pushtishangarofficial");
  };
  



  const Getcategories = async () => {
    // Fetch CategoryData here
    const res = await getCategories();

    if (res !== undefined) {
      const transformedData = res.map((category, index) => ({
        ...category,
        id: index + 1,
      }));
      setCategoryData(transformedData);
  };
}

const GetLoggedInCustomer = async (token) => {
  const res = await getLoggedInCustomer(token);
  console.log(res);
  if (res.success) {
    setCustomerInfo(res.customer);
  } else {
    console.log(res.msg);
  }
};

const handleSignout = async () => {
  localStorage.removeItem("authToken");
  console.log("authToken Removed");
};


  useEffect(() => {
    Getcategories();
    GetLoggedInCustomer(authToken);
  }, []);


  return (
    <div>
      <section className="section-padding footer-mid bg-dark " >
        <div className="container pt-15 pb-20">
          <div className="row">
            <div className="col">
              <div className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0">
                <div className="logo mb-2">
                  <Link to="#" className="mb-15">
                    <img src={logo1} alt="logo" />
                  </Link>
                </div>
                <ul className="contact-infor list-unstyled text-start">
                  <li onClick={openGoogleMaps} style={{cursor:"pointer"}}>
                    <MdLocationPin className="react-icon "/>
                    <strong className=""> Address : </strong>{" "}
                    <span style={{fontWeight:'600',fontSize:'14px'}}>
103, VrajMadhurya Flats, Laxmi Colony 20, Behind Govardhannathji Haveli, Productivity road, Vadodara, Gujarat.390007
                    </span>
                  </li>
                  <li>
                   <MdCall className="react-icon" />
                    <strong className=""> Call Us :</strong>
                    <span style={{fontWeight:'600',fontSize:'14px'}}> (+91) 8980963151</span>
                  </li>
                  <li onClick={handleEmailClick} style={{cursor:"pointer"}}>
                    <MdEmail className="react-icon"/>
                    <strong className=""> Email :</strong>
                    <span style={{fontWeight:'600' ,fontSize:'14px'}}>pushtishangarsales@gmail.com</span>
                  </li>
                  <li className="text-start d-flex jusify-content-start">
                  <div className="mobile-social-icon ">
        <h6 className="fs-5 text-white">Follow Us</h6>
        {/* <Link to="#" className="text-dark"><FaFacebook/></Link> */}
        {/* <Link to="#" className="text-dark"><FaTwitter/></Link> */}
        <Link onClick={openInstagram} className="text-dark"><FaInstagram/></Link>
        <Link onClick={openPintrest} className="text-dark"><FaPinterest/></Link>
        <Link onClick={openYoutube} className="text-dark"><FaYoutube/></Link>
      </div>
                  </li>
                </ul>
              </div>
            </div>
              
            <div className="footer-link-widget col">
              <h4 className="widget-title footer-title text-start">Company</h4>
              <ul className="footer-list mb-sm-5 mb-md-0 text-start">
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="/disclaimer">Disclaimer</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
              
               
                
                <li>
                  <Link to="/shipping-policy">Shipping Policy</Link>
                </li>
              </ul>
            </div>
            <div className="footer-link-widget col">
              <h4 className="widget-title footer-title text-start">Category</h4>
              <ul className="footer-list mb-sm-5 mb-md-0 text-start">
              {CategoryData.map((category, index) => (
                          <li key={index}>
                            <Link to={`/product-list/${category._id}`}>
                              {" "}
                              {/* <img src={logo} alt /> */}
                              {category.name}
                            </Link>
                          </li>
                        ))}
              </ul>
            </div>
            <div className="footer-link-widget costomer-block col">
              <h4 className="widget-title footer-title text-start">Customer Service</h4>
              <ul className="footer-list mb-sm-5 mb-md-0 text-start">
               
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ's</Link>
                </li>
                <li>
                  <Link to="/return-policy">Return Policy</Link>
                </li>
                <li>
                  <Link to="/terms-condition">Terms &amp; Conditions</Link>
                </li>
              </ul>
            </div>
           
           { authToken &&<div className="footer-link-widget col">
              <h4 className="widget-title footer-title text-start">Account</h4>
              <ul className="footer-list mb-sm-5 mb-md-0 text-start">
                <li>
                  <Link onClick={handleSignout}>Sign Out</Link>
                </li>
                <li>
                  <Link to={`/cart/${CustomerInfo._id}`}>View Cart</Link>
                </li>
                <li>
                  <Link to={`/my-wishlist/${CustomerInfo._id}`}>My Wishlist</Link>
                </li>
                {/* <li>
                  <Link to="#">Shipping Details</Link>
                </li> */}
              </ul>
            </div>}
            

          </div>
        </div>
      </section>
      
<section style={{background: '#212529',padding: '20px 4px',borderTop:'1px solid #6d6969'}}>
     <div className="container  " >
  <div className="row ">
   
    <div className="d-flex justify-content-between lh-base mb-3 footer-text align-items-center">

      <div>
        <p className="font-sm mb-0 text-white text-start d-block">Copyright © 2023,<strong className=" fw-bold"> Pushti Shangar</strong> , All rights reserved</p>
      </div>
      <div>

      <p className="font-sm mb-0 text-start d-block text-white"> <span> Designed & Developed by <strong className="  fw-bold"><Link to='https://www.barodaweb.com'  target="_blank" className="bw-link">Barodaweb</Link></strong> -The E-Catalogue Designer</span></p>
      </div>
    </div>
    
   
  </div>
</div>
  </section>

    </div>
  );
};

export default MidFooter;
