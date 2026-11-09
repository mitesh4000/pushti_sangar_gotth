import React, { useContext, useEffect, useState } from 'react'
import MobileSidebar from '../../components/MobileSidebar'
import Header from '../../components/Header'
import Subscribe from '../../components/Subscribe'
import Featured from '../../components/Featured'
import MidFooter from '../../components/MidFooter'
import SignContext from '../../contextAPI/Context/SignContext'
import { AiOutlineHome, AiOutlineRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'


const ShippingPolicy = () => {
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
            <AiOutlineRight className="rightIcon" /> Shipping Policy
            <div>
      <h2>Shipping Policy</h2>
      <p>
        Thank you for choosing our products! Here is some information about our shipping policies:
      </p>

      <h3>1. Order Processing Time</h3>
      <p>
        We strive to process and ship orders within 1-2 business days. Please note that orders
        placed on weekends or holidays may require additional processing time.
      </p>

      <h3>2. Shipping Rates</h3>
      <p>
        Shipping rates are calculated based on the weight of your order and the destination. You can
        view the shipping cost during the checkout process before completing your purchase.
      </p>

      <h3>3. Shipping Methods</h3>
      <p>
        We offer several shipping methods, including standard and expedited options. The estimated
        delivery time will vary based on the shipping method selected and your location.
      </p>

      <h3>4. International Shipping</h3>
      <p>
        We do offer international shipping. International customers are responsible for any customs
        duties, taxes, or fees imposed by their country's customs regulations.
      </p>

      <h3>5. Order Tracking</h3>
      <p>
        Once your order has been shipped, you will receive a confirmation email with tracking
        information. You can track your order's progress through our website.
      </p>

      <h3>6. Shipping Delays</h3>
      <p>
        While we make every effort to ensure timely delivery, shipping delays may occur due to
        unforeseen circumstances, such as weather conditions or carrier issues. We appreciate your
        understanding in such situations.
      </p>

      <h3>7. Contact Us</h3>
      <p>
        If you have any questions about your order or our shipping policies, please contact our
        customer service team at support@example.com. We are here to assist you!
      </p>
    </div>
          </div>
        </div>
      </div>
      <div className="page-content pt-50">
        <div className="container">
          <div className="container">
           
          </div>
        </div>
      </div>
    <Subscribe />
      <Featured/>
      <MidFooter />
    </>

  )
}

export default ShippingPolicy