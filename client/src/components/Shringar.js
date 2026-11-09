import React, { useContext, useEffect, useState } from "react";
import "./SeasonalProducts.css";
import Slider from "react-slick";
import S1 from '../images/s1.jpg'
import S2 from '../images/s2.jpg'
import S3 from '../images/s3.jpg'
import S4 from '../images/s4.jpg'
import './Shringar.css'
import { Link } from "react-router-dom";
import SignContext from "../contextAPI/Context/SignContext";

const Shringar = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const  id  = "650837d4f32a06ef841fa5d6";
  // const navigate = useNavigate();
  const {
    GetProductsbyCategoryId,
    getCategories,
    getLoggedInCustomer,
    addToCart,
  } = useContext(SignContext);
  const [ProductData, setProductData] = useState([]);
  const [categoryNameMapping, setCategoryNameMapping] = useState({});
  const [CustomerInfo, setCustomerInfo] = useState({});
  const authToken = localStorage.getItem("authToken");

  const Getproduct = async (id) => {
    const res = await GetProductsbyCategoryId(id);
    // console.log(res);

    const categoryRes = await getCategories();
    // console.log(categoryRes);
    if (categoryRes) {
      const mapping = {};
      categoryRes.forEach((category) => {
        mapping[category._id] = category.name;
      });
      // console.log(mapping);
      setCategoryNameMapping(mapping);
    }

    // const transformedData = res.products.map((product, index) => ({
    //   ...product,
    //   id: index + 1,
    // }));
    setProductData(res.products);
  };

  const GetLoggedInCustomer = async (token) => {
    const res = await getLoggedInCustomer(token);
    // console.log(res);
    if (res.success) {
      setCustomerInfo(res.customer);
    } else {
      console.log(res.msg);
    }
  };

  //  Next/Previous Button Configuration
  const NextArrow = ({ onClick }) => (
    <div
      className="custom-arrow next-arrow position-absolute top-0 end-0"
      onClick={onClick}
    >
      <button>
        {" "}
        <i className="bi bi-arrow-right"></i>
      </button>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="custom-arrow prev-arrow position-absolute top-0 end-0 "
      onClick={onClick}
    >
      <button>
        <i className="bi bi-arrow-left"></i>
      </button>
    </div>
  );

  // Slider Configuration
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,  // Display 4 products in one row
    slidesToScroll: 4,  // Scroll 4 products at a time
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,  // Adjust the number of products based on your design
          slidesToScroll: 2,  // Adjust the number of products based on your design
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleCartClick = async (id) => {
    try {
      const customerId = CustomerInfo._id; // Replace with the actual customer ID
      const cartInfo = {
        productId: id,
        quantity: 1,
      };
      const res = await addToCart(customerId, cartInfo);

      if (res.success) {
        // Cart updated successfully
        console.log("Cart updated successfully");
        // navigate(`/cart/${customerId}`);
      } else {
        // Handle the error
        console.error(res.msg);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    Getproduct(id);
    GetLoggedInCustomer(authToken);
  }, [id]);

  const products = ProductData;

  return (
    <div style={{ background: "rgb(251 248 240 / 74%)" }}>
      <div className="container mb-4">
        <div className=" row text-start">
          {" "}
          <h1 className="fs-1 mt-4 mb-4">Shringar Products</h1>
        </div>
        <div className="row ">
          <div className="col-lg-3 d-none d-lg-flex mb-4">
            <div className="banner-img style-2 vastra">
              <div className="banner-text d-none">
                <h2 className="mb-100">Bring Top Vastra into Your Home</h2>
                <Link to="#" className="btn btn-xs">
                  Shop Now <i className="fi-rs-arrow-small-right"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-12 mb-4">
            <Slider {...settings}>
              {products.slice(0,5).map((product) => (
                <div key={product._id || product.id}>
                  <div
                    className="product-cart-wrap shringar-card slick-slide slick-current slick-active"
                    tabIndex={0}
                    style={{ width: 246 }}
                    data-slick-index={3}
                    aria-hidden="false"
                  >
                    <div className="product-img-action-wrap">
                      <div className="product-img product-img-zoom">
                        <Link to={`/product-details/${product._id}`} tabIndex={0}>
                          <img
                            className="default-img"
                            src={`${url}/products/${product.imageGallery[0]}`}
                            alt={product.name || "Product"}
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="product-content-wrap">
                      <div className="product-category">
                        <Link to={`/product-details/${product._id}`} tabIndex={0}>
                          {categoryNameMapping[product.category]}
                        </Link>
                      </div>
                      <h2 className="vastra-title">
                        <Link to={`/product-details/${product._id}`} tabIndex={0}>
                          {product.name}
                        </Link>
                      </h2>
                      <div className="product-price mt-10 mb-2">
                        <span>₹{product.prices.discounted?product.prices.discounted:product.prices.calculatedPrice}</span>
                        {!product.calculationOnWeight && (
                        <span className="old-price">
                          ₹{product.prices?product.prices.original:null}
                        </span>
                          )}
                      </div>
                      <Link
                        to="/product-details"
                        className="btn w-100 hover-up"
                        tabIndex={0}
                        onClick={()=>{handleCartClick(product._id)}}
                      >
                        <i className="fi-rs-shopping-cart bi bi-cart mr-5 me-1 " />
                        Add To Cart
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shringar;
