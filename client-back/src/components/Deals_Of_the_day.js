import React, { useEffect, useState } from "react";
import "./Deals_Of_the_day.css";
import moment from "moment";
import { Link } from "react-router-dom";
import image1 from "../images/cdown.jpg";
import image2 from "../images/cdown2.jpg";
import image3 from "../images/cdown3.jpg";
import image4 from "../images/cdown4.jpg";
import image5 from "../images/cdown5.jpg";
import image6 from "../images/cdown6.jpg";
const dealsData = [
  {
    id: 1,
    imageSrc: image1,
    title: "Tranding Motihar with Exclusive Prize",
    price: "32.85",
    oldPrice: "33.8",
    countdownDate: "2025/03/25 00:00:00",
  },
  {
    id: 2,
    imageSrc: image2,
    title: "Our Latest Product with Deal of The Day",
    price: "24.85",
    oldPrice: "26.8",
    countdownDate: "2026/04/25 00:00:00",
  },
  {
    id: 3,
    imageSrc: image6,
    title: "Very Popular Har in Sangar Products ",
    price: "12.85",
    oldPrice: "13.8",
    countdownDate: "2027/03/25 00:00:00",
  },
  {
    id: 4,
    imageSrc: image4,
    title: "Colourful Har with Various Styles",
    price: "15.85",
    oldPrice: "16.8",
    countdownDate: "2025/02/25 00:00:00",
  },
];

const Deals_Of_the_day = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showSemicolon, setShowSemicolon] = useState(false);

  useEffect(() => {
    setInterval(() => {
      const now = moment();
      const then = moment("2020-10-15 12:12:12", "YYYY-MM-DD hh:mm:ss");
      const countdown = moment(then - now);
      setDays(countdown.format("DD"));
      setHours(countdown.format("HH"));
      setMinutes(countdown.format("mm"));
      setSeconds(countdown.format("ss"));
    }, 1000);
  }, []);
  return (
    <div>
      <section className="section-padding pb-5">
        <div className="container">
          <div
            className="section-title wow animate__ animate__fadeIn animated"
            data-wow-delay={0}
            style={{ visibility: "visible", animationName: "fadeIn" }}
          >
            <h3 className="fs-1">Deals Of The Day</h3>
            {/* <Link className="show-all" to="#">
              All Deals
              <i className="fi-rs-angle-right" />
            </Link> */}
          </div>
          <div className="row">
            {dealsData.map((deal) => (
              <div key={deal.id} className="col-xl-3 col-lg-4 col-md-6">
                <div
                  className="product-cart-wrap deal-card style-2 wow animate__ animate__fadeInUp animated mb-4"
                  data-wow-delay={0}
                  style={{
                    visibility: "visible",
                    animationName: "fadeInUp",
                  }}
                >
                  <div className="product-img-action-wrap">
                    <div className="product-img">
                      <Link to="#">
                        <img src={deal.imageSrc} alt={deal.title} />
                      </Link>
                    </div>
                  </div>
                  <div className="product-content-wrap deal-product-content">
                    
                    <div className="timer-container">
                      <div className="timer">
                        {days}
                        <span>Days</span>
                      </div>
                      {showSemicolon ? (
                        <div className="semicolon">:</div>
                      ) : null}
                      <div className="timer">
                        {hours}
                        <span>Hours</span>
                      </div>
                      {showSemicolon ? (
                        <div className="semicolon">:</div>
                      ) : null}
                      <div className="timer">
                        {minutes}
                        <span>Mins</span>
                      </div>
                      {showSemicolon ? (
                        <div className="semicolon">:</div>
                      ) : null}
                      <div className="timer">
                        {seconds}
                        <span>Sec</span>
                      </div>
                    </div>
                    <div className="deals-content">
                      <h2 className="deal-title">
                        <Link to="#">{deal.title}</Link>
                      </h2>
                      <div className="product-card-bottom">
                        <div className="product-price">
                          <span className="deal-new-price">₹{deal.price}</span>
                          <span className="old-price deal-old-price">₹{deal.oldPrice}</span>
                        </div>
                        <div className="add-cart">
                          <Link className="add deal-cart" to="#">
                            <i className="fi-rs-shopping-cart mr-5" />
                            Add
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Deals_Of_the_day;
