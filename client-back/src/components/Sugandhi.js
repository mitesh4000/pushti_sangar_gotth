import React, { useContext, useEffect, useState } from "react";
import "./SeasonalProducts.css";
import Slider from "react-slick";
import S1 from "../images/s1.jpg";
import S2 from "../images/s2.jpg";
import S3 from "../images/s3.jpg";
import S4 from "../images/s4.jpg";
import "./Shringar.css";
import { Link } from "react-router-dom";
import SignContext from "../contextAPI/Context/SignContext";
import Swal from 'sweetalert2';

const Sugandhi = () => {
    const url = `${process.env.REACT_APP_BASE_URL}`;
    const id = "65083812f32a06ef841fa5da";
    // const navigate = useNavigate();
    const {
      GetProductsbyCategoryId,
      getCategories,
      getLoggedInCustomer,
      addToCart,
      OpenLoginModal,
    setOpenLoginModal
    } = useContext(SignContext);
    const [ProductData, setProductData] = useState([]);
    const [categoryNameMapping, setCategoryNameMapping] = useState({});
    const [CustomerInfo, setCustomerInfo] = useState({});
  const [categoryImage, setCategoryImage] = useState("");

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
          if (category._id === id) {
          
            setCategoryImage(category.image); 
          }
        });
        console.log(mapping);
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
        className="custom-arrow position-absolute top-0 end-0 popular-next-arrow"
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
        className="custom-arrow  position-absolute top-0 left-0 popular-prev-arrow  "
        onClick={onClick}
      >
        <button>
          <i className="bi bi-arrow-left "></i>
        </button>
      </div>
    );
  
    
  
    
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
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
        if (authToken) { 
          const customerId = CustomerInfo._id; 
          const cartInfo = {
            productId: id,
            quantity: 1,
          };
          const res = await addToCart(customerId, cartInfo);
    
          if (res.success) {
            // Cart updated successfully
            console.log("Cart updated successfully");
            Swal.fire({
              icon: 'success',
              title: 'Item Added to Cart',
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            // Handle the error
            console.error(res.msg);
          }
        } else {
          setOpenLoginModal(true);
        }
      } catch (error) {
    
        console.error("Unexpected error:", error);
      }
    };
  
    useEffect(() => {
      Getproduct(id);
      GetLoggedInCustomer(authToken);
    }, [id , authToken]);
  
    const products = ProductData;
  
    return (
      <div style={{ background: "rgb(251 248 240 / 74%)" }}>
        <div className="container mb-4">
          <div className="row text-start">
            <div className="col">
              <h1 className="fs-1 mt-4 mb-4">Sugandhi (Attar)</h1>
            </div>
            <div className="col text-end d-flex align-items-center justify-content-end">
              <Link to={`/product-list/${id}`} className="mb-2"><strong>view all</strong></Link>
            </div>
          </div>
  
          <div className="row ">
            <div class="col-lg-3 d-none d-lg-flex mb-4" style={{marginTop : "30px"}}>
              <div class="banner-img style-2 shringar">
              <img style={{borderRadius : "10px"}} src={`${url}/cagtegory/${categoryImage}`} alt="" />
                <div class="banner-text d-none">
                  <h2 class="mb-100">Bring Top Vastra into Your Home</h2>
                  <Link to="#" class="btn btn-xs">
                    Shop Now <i class="fi-rs-arrow-small-right"></i>
                  </Link>
                </div>
              </div>
            </div>
  
            <div className="col-lg-9 col-md-12 mb-4">
              <Slider {...settings}>
                {products?products.map((product) => (
                  <div key={product.id}>
                    <Link to={`/product-details/${product._id}`}>
                      <div
                        className="product-cart-wrap shringar-card slick-slide slick-current slick-active"
                        tabIndex={0}
                        style={{ width: 246 }}
                        data-slick-index={3}
                        aria-hidden="false"
                      >
                        <div className="product-img-action-wrap">
                          <div className="product-img product-img-zoom">
                            <Link
                              to={`/product-details/${product._id}`}
                              tabIndex={0}
                            >
                              <img
                                className="default-img img-fluid"
                                src={`${url}/products/${product.imageGallery[0]}`}
                                alt=""
                                onError={(e) => {
                                  e.target.src =
                                    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"; // Replace with the path to your alternate image
                                }}
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="product-content-wrap">
                          <div className="product-category">
                            <Link
                              to={`/product-details/${product._id}`}
                              tabIndex={0}
                            >
                              {categoryNameMapping[product.category]}
                            </Link>
                          </div>
                          <h2 className="vastra-title">
                            <Link
                              to={`/product-details/${product._id}`}
                              tabIndex={0}
                            >
                              {product.name}
                            </Link>
                          </h2>
                          <div className="product-price mt-10 mb-2">
                            <span>
                              ₹
                              {product.prices.discounted
                                ? product.prices.discounted
                                : product.prices.calculatedPrice}
                            </span>
                            {!product.calculationOnWeight && (
                              <span class="old-price">
                                ₹{product.prices ? product.prices.original : null}
                              </span>
                            )}
                          </div>
                          <Link
                            // to="/product-details"
                            className="btn w-100 hover-up"
                            tabIndex={0}
                            onClick={() => {
                              handleCartClick(product._id);
                            }}
                          >
                            <i className="fi-rs-shopping-cart bi bi-cart mr-5 me-1 " />
                            Add To Cart
                          </Link>
                        </div>
                      </div>
                    </Link>
                  </div>
                )):null}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default Sugandhi