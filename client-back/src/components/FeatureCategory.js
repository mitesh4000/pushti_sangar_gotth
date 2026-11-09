import React from "react";
import Slider from "react-slick";
import './FeatureCategory.css'

export default function FeatureCategory() {
    const NextArrow = ({ onClick }) => (
        <div className="custom-arrow next-arrow position-absolute top-0 end-0" onClick={onClick}>
      <button>   <i className="bi bi-arrow-right"></i></button>
        </div>
      );
      
      const PrevArrow = ({ onClick }) => (
        <div className="custom-arrow prev-arrow position-absolute top-0 end-0 " onClick={onClick}>
          <button><i className="bi bi-arrow-left"></i></button>
        </div>
      );
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
     responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };
  return (
    <div className="container">
        <div className="f-title">
            <h1 className="text-start mt-4 mb-4 fs-1">Featured Categories</h1>
        </div>
    
        <Slider {...settings}>
      <div>
        <div>
          <div className="card" style={{ width: '120px' }}>
           
            

            <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-12.png" className="card-img-top" alt="..." />
          
            <div className="card-body">
              <p className="card-text">
              <span className="fw-bold"> Organic kiwi </span><br/> 29 Items
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="card" style={{ width: '120px' }}>
            <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-11.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
              <span className="fw-bold">Peach</span><br/>29 Items
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="card" style={{ width: '120px' }}>
            <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-9.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
              <span className="fw-bold"> Red Apple </span><br/> 29 Items
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="card" style={{ width: '120px' }}>
            <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-3.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
              <span className="fw-bold">Snack</span><br/> 29 Items
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="card" style={{ width: '120px' }}>
            <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-1.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
                <span className="fw-bold">Vagetables</span><br/> 29 Items
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="card" style={{ width: '120px' }}>
            <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-2.png" alt="..." />
            <div className="card-body">
              <p className="card-text">
                <span className="fw-bold">StrawBerry</span><br/> 29 Items
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="card" style={{ width: '120px' }}>
            <img src='https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-4.png' className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
               <span className="fw-bold"> Black Plum</span> <br/> 30 Items
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="card" style={{ width: '120px' }}>
            <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-5.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <p
               className="card-text">
               <span className="fw-bold">Custord Apple</span> <br/>44Items
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="card" style={{ width: '120px' }}>
            <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-14.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
              <span className="fw-bold">Coffee&Tea</span> <br/>40 Items
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="card" style={{ width: '120px' }}>
            <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-15.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
              <span className="fw-bold">HeadPhones</span> <br/>87 Items
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="card" style={{ width: '120px' }}>
            <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/cat-13.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
              <span className="fw-bold">Cake&Milk</span> <br/>80 Items
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </Slider>
    </div>

  );
}
