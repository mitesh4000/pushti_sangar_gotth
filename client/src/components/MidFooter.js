import React from "react";
import './MidFooter.css'
import logo1 from '../images/footer-logo.png'
import { MdLocationPin , MdCall , MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaFacebook,FaInstagram,FaPinterest,FaTwitter, FaYoutube } from 'react-icons/fa';



const MidFooter = () => {

  return (
    <div >
      <section className="section-padding footer-mid bg-dark " >
        <div className="container pt-15 pb-20">
          <div className="row">
            <div className="col">
              <div className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0">
                <div className="logo mb-2">
                  <a href="#" className="mb-15">
                    <img src={logo1} alt="logo" />
                  </a>
                </div>
                <ul className="contact-infor list-unstyled text-start">
                  <li>
                    <MdLocationPin className="react-icon "/>
                    <strong className=""> Address : </strong>{" "}
                    <span style={{fontWeight:'600',fontSize:'14px'}}>
                      Vadodara,Gujarat
                    </span>
                  </li>
                  <li>
                   <MdCall className="react-icon" />
                    <strong className=""> Call Us :</strong>
                    <span style={{fontWeight:'600',fontSize:'14px'}}> (+91) - 540-025-124553</span>
                  </li>
                  <li>
                    <MdEmail className="react-icon"/>
                    <strong className=""> Email :</strong>
                    <span style={{fontWeight:'600' ,fontSize:'14px'}}> pushtishangar@gmail.com</span>
                  </li>
                  <li className="text-start d-flex jusify-content-start">
                  <div className="mobile-social-icon ">
        <h6 className="fs-5 text-white">Follow Us</h6>
        <Link to="#" className="text-dark"><FaFacebook/></Link>
        <Link to="#" className="text-dark"><FaTwitter/></Link>
        <Link to="#" className="text-dark"><FaInstagram/></Link>
        <Link to="#" className="text-dark"><FaPinterest/></Link>
        <Link to="#" className="text-dark"><FaYoutube/></Link>
      </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-link-widget col">
              <h4 className="widget-title footer-title text-start">Company</h4>
              <ul className="footer-list mb-sm-5 mb-md-0 text-start">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Delivery Information</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="terms-condition">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="footer-link-widget col">
              <h4 className="widget-title footer-title text-start">Popular</h4>
              <ul className="footer-list mb-sm-5 mb-md-0 text-start">
                <li>
                  <a href="#">Product - 01</a>
                </li>
                <li>
                  <a href="#">Product -02</a>
                </li>
                <li>
                  <a href="#">Product -03</a>
                </li>
                <li>
                  <a href="#">Product -04</a>
                </li>
                <li>
                  <a href="#">Product -05</a>
                </li>
              </ul>
            </div>
            <div className="footer-link-widget costomer-block col">
              <h4 className="widget-title footer-title text-start">Customer Service</h4>
              <ul className="footer-list mb-sm-5 mb-md-0 text-start">
                <li>
                  <a href="#">Site Map</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Payments</a>
                </li>
              </ul>
            </div>
           
            <div className="footer-link-widget col">
              <h4 className="widget-title footer-title text-start">Account</h4>
              <ul className="footer-list mb-sm-5 mb-md-0 text-start">
                <li>
                  <a href="#">Sign In</a>
                </li>
                <li>
                  <a href="#">View Cart</a>
                </li>
                <li>
                  <a href="#">My Wishlist</a>
                </li>
                <li>
                  <a href="#">Shipping Details</a>
                </li>
              </ul>
            </div>
            

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
