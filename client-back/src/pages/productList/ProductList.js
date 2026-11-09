// ProductList.js
import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import MidFooter from "../../components/MidFooter";
import "./ProductList.css";

import Subscribe from "../../components/Subscribe";

import "../../components/SeasonalProducts.css";
import "../../components/TopProducts.css";
import S1 from "../../images/s1.jpg";
import S2 from "../../images/s2.jpg";
import S3 from "../../images/s3.jpg";
// import S4 from "../../images/s4.jpg";
// import S5 from "../../images/s5.jpg";
// import S6 from "../../images/s6.jpg";
// import S7 from "../../images/s7.jpg";
// import S8 from "../../images/s8.jpg";
// import S9 from "../../images/s9.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import MobileSidebar from "../../components/MobileSidebar";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import SignContext from "../../contextAPI/Context/SignContext";
import Swal from 'sweetalert2';
import axios from "axios";





const ProductList = () => {
  const originalData = useRef(null);
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    GetProductsbyCategoryId,
    getCategories,
    getLoggedInCustomer,
    getColors,
    getMaterials,
    getSeasons,
    addToCart,
  } = useContext(SignContext);
  const [ProductData, setProductData] = useState([]);
  const [ColorData, setColorData] = useState([]);
  const [MaterialData, setMaterialData] = useState([]);
  const [SeasonData, setSeasonData] = useState([]);
  const [categoryNameMapping, setCategoryNameMapping] = useState({});
  const [CustomerInfo, setCustomerInfo] = useState({});
  const authToken = localStorage.getItem("authToken");
  const [QueryParams, setQueryParams] = useState({});


  const Getproduct = async (id) => {
    const res = await GetProductsbyCategoryId(id);
    console.log(res);

    const categoryRes = await getCategories();
    console.log(categoryRes);
    if (categoryRes) {
      const mapping = {};
      categoryRes.forEach((category) => {
        mapping[category._id] = category.name;
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

  const changeQueryparams = (parameter, value) => {
    const updatedQueryParams = { ...QueryParams };
    updatedQueryParams[parameter] = value;

    setQueryParams(updatedQueryParams);
  };

  const getFilteredItems = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/product/getallproducts`;

    const queryString = Object.keys(QueryParams)
      .map((key) => `${key}=${QueryParams[key]}`)
      .join("&");

    const fullUrl = queryString ? `${url}?${queryString}` : url;

    console.log(fullUrl);

    try {
      const response = await axios.post(fullUrl);
      console.log(response.data);
      if (response.data.success) setProductData(response.data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const GetColors = async () => {
    const res = await getColors();
    console.log(res);
    setColorData(res.colors);
  };

  const GetMaterials = async () => {
    const res = await getMaterials();
    console.log(res);
    setMaterialData(res.material);
  };

  const GetSeasons = async () => {
    const res = await getSeasons();
    console.log(res);
    setSeasonData(res.season);
  };

  const GetLoggedInCustomer = async (token) => {
    const res = await getLoggedInCustomer(token);
    console.log(res);
    if (res.success) {
      setCustomerInfo(res.customer);
    } else {
      console.log(res.msg);
    }
  };

  // Define state variables for filters
  const [showFilters, setShowFilters] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState([]);
  const [selectedShopBy, setSelectedShopBy] = useState([]);
  const [price, setPrice] = useState(40);
  const [productsToShow, setProductsToShow] = useState(5);

  const resetFilters = () => {
    setSelectedColors([]); 
    setSelectedPriceRange(null); 
    setSelectedCategory("All Categories"); 
    setSelectedShopBy([]); 
    setShowFilters(false);
    Getproduct();
  };

  const handleInput = (e) => {
    setPrice(e.target.value);
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Define functions to handle filter changes
  const handleColorChange = (selectedColor) => {
    const updatedColors = selectedColors.includes(selectedColor)
      ? selectedColors.filter((color) => color !== selectedColor)
      : [...selectedColors, selectedColor];

    // Update the selected colors state
    setSelectedColors(updatedColors);

    // Update the query parameters with the selected colors
    changeQueryparams("color", updatedColors.join(",")); // Join selected colors with commas
  };

  const handleSeasonChange = (selectedseason) => {
    const updatedColors = selectedSeason.includes(selectedseason)
      ? selectedSeason.filter((color) => color !== selectedseason)
      : [...selectedSeason, selectedseason];

    // Update the selected colors state
    setSelectedSeason(updatedColors);

    
    changeQueryparams("season", updatedColors.join(",")); 
  };

  const handlePriceChange = (range) => {
    const [min, max] = range.match(/\d+/g);

    // console.log(range , [min , max])
    changeQueryparams("minPrice", min);
    changeQueryparams("maxPrice", max);

    setSelectedPriceRange(range);
  };

  const handleCategoryChange = (selectedCategory) => {
    // console.log(selectedCategory)
    changeQueryparams("category", selectedCategory);
    setSelectedCategory(selectedCategory);
  };
  const handleMaterialChange = (selectedmaterial) => {
    // console.log(selectedCategory)
    changeQueryparams("material", selectedmaterial);
    setSelectedMaterial(selectedmaterial);
  };
  const handleShopByChange = (shopItem) => {
    // Toggle the selected shop item
    if (selectedShopBy.includes(shopItem)) {
      setSelectedShopBy(selectedShopBy.filter((item) => item !== shopItem));
    } else {
      setSelectedShopBy([...selectedShopBy, shopItem]);
    }
  };

  // const handleSortByChange = (value) => {
  //   setSelectedSortBy(value);

    
  //   const sortedData = [...ProductData];

  //   if (value === "newIn") {
  //     sortedData.reverse();
  //   } else if (value === "priceLowestFirst") {
  //     sortedData.sort((a, b) => {
  //       const priceA = a.prices.discounted || a.prices.calculatedPrice;
  //       const priceB = b.prices.discounted || b.prices.calculatedPrice;
  //       return priceA - priceB;
  //     });
  //   } else if (value === "priceHighestFirst") {
  //     sortedData.sort((a, b) => {
  //       const priceA = a.prices.discounted || a.prices.calculatedPrice;
  //       const priceB = b.prices.discounted || b.prices.calculatedPrice;
  //       return priceB - priceA;
  //     });
  //   }else if (value === "") {
  //     console.log("clicked")
  //   }
  //   setProductData(sortedData);
  // };


  const handleSortByChange = (value) => {
    // If original data is not set, store the current order as the original order
    if (!originalData.current) {
      originalData.current = [...ProductData];
    }
  
    setSelectedSortBy(value);
  
    // Sort the product data based on the selected option
    const sortedData = [...originalData.current];
  
    if (value === "newIn") {
      sortedData.reverse();
    } else if (value === "priceLowestFirst") {
      sortedData.sort((a, b) => {
        const priceA = a.prices.discounted || a.prices.calculatedPrice;
        const priceB = b.prices.discounted || b.prices.calculatedPrice;
        return priceA - priceB;
      });
    } else if (value === "priceHighestFirst") {
      sortedData.sort((a, b) => {
        const priceA = a.prices.discounted || a.prices.calculatedPrice;
        const priceB = b.prices.discounted || b.prices.calculatedPrice;
        return priceB - priceA;
      });
    } else if (value === "") {
      console.log("clicked");
    }
  
    setProductData(sortedData);
  };
  

  const handleShowMore = () => {
    setProductsToShow(ProductData?ProductData.length:null);
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
        Swal.fire({
          icon: 'warning', 
          title: 'Please Login First',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
  
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    Getproduct(id);
    GetLoggedInCustomer(authToken);
    GetMaterials();
    GetSeasons();
    GetColors();
  }, [id , authToken]);

  useEffect(() => {
    getFilteredItems();
  }, [selectedCategory, QueryParams, selectedColors]);

  return (
    <div>
      <Header />
      <MobileSidebar />
      <div class="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <Link className="homeLink" to="/" rel="nofollow">
              <i className="fi-rs-home ">
                <AiOutlineHome />
              </i>
              Home{" "}
            </Link>
            <AiOutlineRight className="rightIcon" /> <span /> Product List{" "}
            <span />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
        <div className="col-lg-9">
            <Link className="shop-filter-toogle" to="#" onClick={toggleFilters}>
              <span className="fi-rs-filter bi bi-funnel" />
              Filters
              {showFilters ? (
                <i className="fi-rs-angle-small-up angle-up bi bi-chevron-up" />
              ) : (
                <i className="fi-rs-angle-small-down angle-down bi bi-chevron-down" />
              )}
            </Link>
          </div>
          <div
            className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-5 mb-sm-5 "
            style={{ float: "right" }}
          >
            <div className="reset">
              <button className="btn btn-reset" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          </div>
          <div className="col-lg-12">
            {showFilters && (
              <div className="shop-product-fillter-header">
                <div className="row">
                  {/* Color Filter */}
                  <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-2 mb-sm-2">
                    <div className="card">
                      <h5 className="mb-30 text-start fw-bold fs-5">Colors</h5>
                      <div className="d-flex text-start flex-wrap">
                        {ColorData.map((color) => (
                          <div key={color} className="custome-checkbox mr-80">
                            <input
                              className="form-check-input mb-2 me-2"
                              type="checkbox"
                              name="checkbox"
                              id={`color-${color}`}
                              value={color.name}
                              checked={selectedColors.includes(color.name)}
                              onChange={() => handleColorChange(color.name)}
                            />
                            <label
                              className="form-check-label mb-1"
                              htmlFor={`color-${color}`}
                            >
                              <span>{color.name}</span>
                            </label>
                            <br />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-2 mb-sm-2">
                    <div className="card">
                      <h5 className="mb-30 price-btm fw-bold fs-5 text-start">
                        By Price
                      </h5>
                      <div className="custome-radio text-start">
                        {[
                          "₹0 - ₹1000",
                          "₹1000 - ₹5000",
                          "₹5000 - ₹10000",
                          "Over ₹10000",
                        ].map((range) => (
                          <div
                            key={range}
                            className="d-flex align-items-center"
                            style={{ paddingLeft: "12px" }}
                          >
                            <input
                              type="radio"
                              name="priceRange"
                              id={`price-${range}`}
                              value={range}
                              checked={selectedPriceRange === range}
                              onChange={() => handlePriceChange(range)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`price-${range}`}
                            >
                              <span>{range}</span>
                            </label>
                            <br />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Shop By Filter */}
                  <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-2 mb-sm-2">
                    <div className="card">
                      <h5 className="mb-30 fw-bold fs-5 text-start">
                        By Materials
                      </h5>
                      <div
                        className="categories-dropdown-wrap font-heading"
                        style={{ paddingLeft: "12px" }}
                      >
                        <select
                          className="form-select"
                          value={selectedMaterial}
                          onChange={(e) => handleMaterialChange(e.target.value)}
                        >
                          <option value="">All Materials</option>
                          {MaterialData.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* By Season */}
                  <div className="col-xl-3 col-lg-6 col-md-6 mb-lg-0 mb-md-2 mb-sm-2">
                    <div className="card">
                      <h5 className="mb-30 text-start fw-bold fs-5">Seasons</h5>
                      <div className="d-flex text-start flex-wrap">
                        {SeasonData.map((color) => (
                          <div key={color} className="custome-checkbox mr-80">
                            <input
                              className="form-check-input mb-2 me-2"
                              type="checkbox"
                              name="checkbox"
                              id={`color-${color}`}
                              value={color._id}
                              checked={selectedSeason.includes(color._id)}
                              onChange={() => handleSeasonChange(color._id)}
                            />
                            <label
                              className="form-check-label mb-1"
                              htmlFor={`color-${color}`}
                            >
                              <span>{color.name}</span>
                            </label>
                            <br />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="row">
          <div class="shop-product-fillter ">
            <div class="totall-product">
              <p></p>
            </div>
            <div className="d-flex ">
              {/* <div className="d-flex  page-show">
                <div>
                  <label>Page:</label>
                </div>
                <select value={selectedValue} onChange={handleChange}>
                  <option value="10">50</option>
                  <option value="20">100</option>
                  <option value="30">150</option>
                  <option value="40">200</option>
                </select>
              </div> */}
              <div className="d-flex  page-show">
                <div>
                  <label>Sortby:</label>
                </div>
                <select
                  value={selectedSortBy}
                  onChange={(e) => handleSortByChange(e.target.value)}
                >

                  <option value="">Select</option>
                  <option value="newIn">New In</option>
                  <option value="priceLowestFirst">Price (lowest)</option>
                  <option value="priceHighestFirst">
                    Price (highest)
                  </option>
                </select>
              </div>
            </div>
          </div>
          {ProductData
            ? ProductData.slice(0, productsToShow).map((product) => (
                <div
                  className=" col-lg-3 col-md-4 col-sm-6 col-6 mb-4"
                  key={product.id}
                >
                  <div className="product-cart-wrap popular-card filter-card" tabIndex={0}>
                    <div className="product-img-action-wrap">
                      <div className="product-img product-img-zoom">
                        <Link
                          to={`/product-details/${product._id}`}
                          tabIndex={0}
                        >
                          <img
                            className="default-img"
                            src={`${url}/products/${product.imageGallery[0]}`}
                            alt=""
                            onError={(e) => {
                              e.target.src =
                                "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"; // Replace with the path to your alternate image
                            }}
                          />
                          <img
                            className="hover-img"
                            src={product.hoverImageUrl}
                            alt=""
                          />
                        </Link>
                      </div>
                    </div>
                    <div class="product-content-wrap">
                      <div class="product-category">
                        <Link to={`/product-details/${product._id}`}>
                          {categoryNameMapping[product.category]}
                        </Link>
                      </div>
                      <h2>
                        <Link to={`/product-details/${product._id}`}>
                          {product.name}
                        </Link>
                      </h2>

                      <div class="product-card-bottom">
                        <div class="product-price popular-card-price">
                          <span id="f-c-p">
                            ₹
                            {product.prices.discounted
                              ? product.prices.discounted
                              : product.prices.calculatedPrice}
                          </span>
                          {!product.calculationOnWeight && (
                            <span class="old-price" id="f-c-o-p">
                              ₹{product.prices ? product.prices.original : null}
                            </span>
                          )}
                        </div>
                        <div class="add-cart popular-card-cart">
                          <Link
                            class="add add-cart-btn"
                            id="shop-cart"
                            onClick={() => {
                              handleCartClick(product._id);
                            }}
                          >
                            <i class="fi-rs-shopping-cart mr-5 bi bi-cart me-2"></i>
                            Add{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div>
        {productsToShow < (ProductData?.length || 0) ? (
  <div className="btn" onClick={handleShowMore}>
    Show More
  </div>
) : null}
        </div>
      </div>
      <Subscribe />
      <MidFooter />
    </div>
  );
};

export default ProductList;
