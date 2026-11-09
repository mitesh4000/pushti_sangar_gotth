import React, { useContext, useEffect, useState } from "react";

import "./SeasonalProducts.css";
import "./TopProducts.css";
import S1 from "../images/s1.jpg";
import S2 from "../images/s2.jpg";
import S3 from "../images/s3.jpg";
import S4 from "../images/s4.jpg";
import S5 from "../images/s5.jpg";
import S6 from "../images/s6.jpg";
import S7 from "../images/s7.jpg";
import S8 from "../images/s8.jpg";
import S9 from "../images/s9.jpg";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import SignContext from "../contextAPI/Context/SignContext";

const TopProducts = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { getProducts, getCategories , getLoggedInCustomer , addToCart } = useContext(SignContext);
  const [ProductData, setProductData] = useState([]);
  const [categoryNameMapping, setCategoryNameMapping] = useState({});
  const [CustomerInfo, setCustomerInfo] = useState({});
  const authToken = localStorage.getItem("authToken");

  const Getproduct = async () => {
    const res = await getProducts();
    // console.log(res);

    const categoryRes = await getCategories();
    // console.log(categoryRes)
    if (categoryRes) {
      const mapping = {};
      categoryRes.forEach((category) => {
        mapping[category._id] = category.name;
      });
      // console.log(mapping)
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
      // console.log(res.msg);
    }
  };

  // const products = [
  //   {
  //     id: 1,
  //     imageUrl: S1,
     
  //     category: "Shangar",
  //     name: "God Shanagar By Pushtimarg ",
  //     price: 238.85,
  //     oldPrice: 245.8,
  //     color: "#67bcee",
  //   },
  //   {
  //     id: 1,
  //     imageUrl: S2,
     
  //     category: "Sughandhi",
  //     name: "Sughandhi Attar Different fragrances",
  //     price: 238.85,
  //     oldPrice: 245.8,
  //     color: "#3BB77Es",
  //   },
  //   {
  //     id: 1,
  //     imageUrl: S3,
     
  //     category: "Shringar",
  //     name: "Moti product with category of Shringar",
  //     price: 238.85,
  //     oldPrice: 245.8,
  //     color: "#f74b81",
  //   },
  //   {
  //     id: 1,
  //     imageUrl: S4,
     
  //     category: "Shringar",
  //     name: "Popular Product on Shringar Products",
  //     price: 238.85,
  //     oldPrice: 245.8,
  //   },
  //   {
  //     id: 1,
  //     imageUrl: S5,
     
  //     category: "Vastra",
  //     name: "Best Zari in Vastra Category",
  //     price: 238.85,
  //     oldPrice: 245.8,
  //   },
  //   // {
  //   //   id: 1,
  //   //   imageUrl: S6,
  //   //   hoverImageUrl:
  //   //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
  //   //   category: "Vastra",
  //   //   name: "Second Most Popular Zari in Vastra",
  //   //   price: 238.85,
  //   //   oldPrice: 245.8,
  //   // },
  //   // {
  //   //   id: 1,
  //   //   imageUrl: S7,
  //   //   hoverImageUrl:
  //   //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
  //   //   category: "Vastra",
  //   //   name: "Zari with different types of vastra",
  //   //   price: 238.85,
  //   //   oldPrice: 245.8,
  //   //   color: "#f74b81",
  //   // },
  //   // {
  //   //   id: 1,
  //   //   imageUrl: S8,
  //   //   hoverImageUrl:
  //   //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
  //   //   category: "Vastra",
  //   //   name: "Different color zari products",
  //   //   price: 238.85,
  //   //   oldPrice: 245.8,
  //   // },
  //   // {
  //   //   id: 1,
  //   //   imageUrl: S9,
  //   //   hoverImageUrl:
  //   //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
  //   //   category: "Vastra",
  //   //   name: "Colourful Zari in vastra category",
  //   //   price: 238.85,
  //   //   oldPrice: 245.8,
  //   // },
  //   // {
  //   //   id: 1,
  //   //   imageUrl: S1,
  //   //   hoverImageUrl:
  //   //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
  //   //   category: "Shangar",
  //   //   name: "God Shanagar with best modification",
  //   //   price: 238.85,
  //   //   oldPrice: 245.8,
  //   // },
  //   // {
  //   //   id: 1,
  //   //   imageUrl: S5,
  //   //   hoverImageUrl:
  //   //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
  //   //   category: "Vastra",
  //   //   name: "Vastra Zari By Pushtimarg Web Aplication",
  //   //   price: 238.85,
  //   //   oldPrice: 245.8,
  //   // },
  //   // {
  //   //   id: 1,
  //   //   imageUrl: S6,
  //   //   hoverImageUrl:
  //   //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
  //   //   category: "Vastra",
  //   //   name: "Vastra Zari By Pushtimarg Web Aplication",
  //   //   price: 238.85,
  //   //   oldPrice: 245.8,
  //   // },

  //   // Add more product objects here
  // ];
  const NextArrow = ({ onClick }) => (
    <div className="custom-arrow  position-absolute top-0 end-0 popular-next-arrow" onClick={onClick}>
  <button>   <i className="bi bi-arrow-right"></i></button>
    </div>
  );
  
  const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow  position-absolute top-0 left-0 popular-prev-arrow  " onClick={onClick}>
      <button><i className="bi bi-arrow-left "></i></button>
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
      breakpoint: 1600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
       
        
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
       
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

const handleCartClick = async (id) => {
  try {
    const customerId = CustomerInfo._id ; // Replace with the actual customer ID
    const cartInfo = {
      productId: id,
      quantity: 1,
    }
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
  Getproduct();
  GetLoggedInCustomer(authToken);
}, []);

  return (
    <div style={{background:'rgba(251, 248, 240, 0.74)'}}>
      <div className="container" style={{marginTop:'55px'}}>
        <div className="row popular-row">
          <h1 className="text-start fs-1 mt-4 mb-4">Popular Products</h1>
        </div>
        <div className="row">
          <Slider {...settings}>
            
       
          {ProductData.filter(product => product.isProductPopular).map((product) => (
            <div className=" col-lg-3 col-md-4 col-sm-6 mb-4 popular-card" key={product._id || product.id}>
              <div
                className="product-cart-wrap popular-card"
                tabIndex={0}
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
                    <Link to={`/product-details/${product._id}`}>{categoryNameMapping[product.category]}</Link>
                  </div>
                  <h2 className="new-product-name">
                    <Link to={`/product-details/${product._id}`}>
                      {product.name}
                    </Link>
                  </h2>
                 
                  <div className="product-card-bottom new-arrival-card-bottom">
                    <div className="product-price popular-card-price new-arrival-price">
                      <span>₹{product.prices.discounted?product.prices.discounted:product.prices.calculatedPrice}</span>
                      {!product.calculationOnWeight && (
                          <span className="old-price">
                            ₹{product.prices?product.prices.original:null}
                          </span>
                            )}
                    </div>
                    <div className="add-cart popular-card-cart">
                      <Link className="add" onClick={()=>{handleCartClick(product._id)}}>
                        <i className="fi-rs-shopping-cart mr-5 bi bi-cart me-2"></i>Add{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
             </Slider>
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
