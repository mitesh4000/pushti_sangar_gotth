import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
import Header from "../../components/Header";
import MidFooter from "../../components/MidFooter";

// import cover1 from "../../images/s1.jpg";
// import cover2 from "../../images/s4.jpg";
// import cover3 from "../../images/s3.jpg";

import "../../components/SeasonalProducts.css";
import "../../components/TopProducts.css";
import Category from "../../components/Category";
import S1 from "../../images/s1.jpg";
import S2 from "../../images/s2.jpg";
import S3 from "../../images/s3.jpg";
import S4 from "../../images/s4.jpg";
import S5 from "../../images/s5.jpg";
// import S6 from "../../images/s6.jpg";
// import S7 from "../../images/s7.jpg";
// import S8 from "../../images/s8.jpg";
// import S9 from "../../images/s9.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import Preloader from "../../components/Loader";
import MobileSidebar from "../../components/MobileSidebar";
import SignContext from "../../contextAPI/Context/SignContext";

const ProductDetails = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { id } = useParams();
  const {
    getSpecificProduct,
    getCategories,
    getSpecificSubcategories,
    getLoggedInCustomer,
    addToCart,
    addToWishlist,
  } = useContext(SignContext);
  const [ProductData, setProductData] = useState([]);
  const [DailyPrice, setDailyPrice] = useState([]);
  const [Quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(""); // Default selected image
  const [selectedColors, setSelectedColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [specificSubcategories, setSpecificSubcategories] = useState([]);
  const [categoryNameMapping, setCategoryNameMapping] = useState({});
  const [CustomerInfo, setCustomerInfo] = useState({});
  const navigate = useNavigate();

  // const Image1 = ProductData.imageGallery?ProductData.imageGallery[0]:null;
  // console.log(Image1);
  // const Image2 = ProductData.imageGallery[1];
  // const Image3 = ProductData.imageGallery[2];

  const getspecificProduct = async (ProductId) => {
    const res = await getSpecificProduct(ProductId);
    console.log(res);

    if (res.success) {
      const product = res.product;

      // Prices are available, set them directly
      setProductData(res.product);

      if (product.category) {
        getSpecificSubcategories(product.category);
      }
    }

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
  };

  const getspecificSubcategories = async (categoryId) => {
    const res = await getSpecificSubcategories(categoryId);
    console.log(res);
    if (res.success) {
      setSpecificSubcategories(res.subCategories);
    }
  };

  const handleCartClick = async () => {
    try {
      const customerId = CustomerInfo._id; // Replace with the actual customer ID
      const cartInfo = {
        productId: ProductData._id,
        quantity: Quantity,
      };
      const res = await addToCart(customerId, cartInfo);

      if (res.success) {
        // Cart updated successfully
        console.log("Cart updated successfully");
        navigate(`/cart/${customerId}`);
      } else {
        // Handle the error
        console.error(res.msg);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Unexpected error:", error);
    }
  };

  const handleWishlistClick = async () => {
    try {
      const customerId = CustomerInfo._id; // Replace with the actual customer ID
      const cartInfo = {
        productId: ProductData._id,
      };
      const res = await addToWishlist(customerId, cartInfo);
      console.log(res);
      if (res.success) {
        // Cart updated successfully
        console.log("Added in Wishlist successfully");
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

  const handleIncrement = () => {
    setQuantity(Quantity + 1);
  };
  const handleDecrement = () => {
    if (Quantity > 1) {
      setQuantity(Quantity - 1);
    }
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

  useEffect(
    () => {
      getspecificProduct(id);
      getCategories();
      if (ProductData.category) {
        getspecificSubcategories(ProductData.category);
      }
      const authToken = window.localStorage.getItem("authToken");
      GetLoggedInCustomer(authToken);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      window.scrollTo(0, 0);
    },
    [id],
    [Quantity]
  );

  const handleThumbClick = (imageURL) => {
    setSelectedImage(imageURL);
  };

  const handleColorChange = (color) => {
    // Toggle the selected color
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const products = [
    {
      id: 1,
      imageUrl: S1,
      hoverImageUrl:
        "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
      category: "Shangar",
      name: "God Shanagar By Pushtimarg ",
      price: 238.85,
      oldPrice: 245.8,
      color: "#67bcee",
    },
    {
      id: 1,
      imageUrl: S2,
      hoverImageUrl:
        "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
      category: "Sughandhi",
      name: "Sughandhi Attar Different fragrances",
      price: 238.85,
      oldPrice: 245.8,
      color: "#3BB77Es",
    },
    {
      id: 1,
      imageUrl: S3,
      hoverImageUrl:
        "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
      category: "Shringar",
      name: "Moti product with category of Shringar",
      price: 238.85,
      oldPrice: 245.8,
      color: "#f74b81",
    },
    {
      id: 1,
      imageUrl: S4,
      hoverImageUrl:
        "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
      category: "Shringar",
      name: "Popular Product on Shringar Products",
      price: 238.85,
      oldPrice: 245.8,
    },
    {
      id: 1,
      imageUrl: S5,
      hoverImageUrl:
        "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
      category: "Vastra",
      name: "Best Zari in Vastra Category",
      price: 238.85,
      oldPrice: 245.8,
    },
    // {
    //   id: 1,
    //   imageUrl: S6,
    //   hoverImageUrl:
    //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
    //   category: "Vastra",
    //   name: "Second Most Popular Zari in Vastra",
    //   price: 238.85,
    //   oldPrice: 245.8,
    // },
    // {
    //   id: 1,
    //   imageUrl: S7,
    //   hoverImageUrl:
    //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
    //   category: "Vastra",
    //   name: "Zari with different types of vastra",
    //   price: 238.85,
    //   oldPrice: 245.8,
    //   color: "#f74b81",
    // },
    // {
    //   id: 1,
    //   imageUrl: S8,
    //   hoverImageUrl:
    //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
    //   category: "Vastra",
    //   name: "Different color zari products",
    //   price: 238.85,
    //   oldPrice: 245.8,
    // },
    // {
    //   id: 1,
    //   imageUrl: S9,
    //   hoverImageUrl:
    //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
    //   category: "Vastra",
    //   name: "Colourful Zari in vastra category",
    //   price: 238.85,
    //   oldPrice: 245.8,
    // },
    // {
    //   id: 1,
    //   imageUrl: S1,
    //   hoverImageUrl:
    //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
    //   category: "Shangar",
    //   name: "God Shanagar with best modification",
    //   price: 238.85,
    //   oldPrice: 245.8,
    // },
    // {
    //   id: 1,
    //   imageUrl: S5,
    //   hoverImageUrl:
    //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
    //   category: "Vastra",
    //   name: "Vastra Zari By Pushtimarg Web Aplication",
    //   price: 238.85,
    //   oldPrice: 245.8,
    // },
    // {
    //   id: 1,
    //   imageUrl: S6,
    //   hoverImageUrl:
    //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
    //   category: "Vastra",
    //   name: "Vastra Zari By Pushtimarg Web Aplication",
    //   price: 238.85,
    //   oldPrice: 245.8,
    // },
    // {
    //   id: 1,
    //   imageUrl: S4,
    //   hoverImageUrl:
    //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
    //   category: "Shringar",
    //   name: "Popular Product on Shringar Products",
    //   price: 238.85,
    //   oldPrice: 245.8,
    // },
    // {
    //   id: 1,
    //   imageUrl: S5,
    //   hoverImageUrl:
    //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
    //   category: "Vastra",
    //   name: "Best Zari in Vastra Category",
    //   price: 238.85,
    //   oldPrice: 245.8,
    // },
    // {
    //   id: 1,
    //   imageUrl: S6,
    //   hoverImageUrl:
    //     "https://wp.alithemes.com/html/nest/demo/assets/imgs/shop/product-3-2.jpg",
    //   category: "Vastra",
    //   name: "Second Most Popular Zari in Vastra",
    //   price: 238.85,
    //   oldPrice: 245.8,
    // },

    // Add more product objects here
  ];

  if (isLoading) {
    return <Preloader />; // Show the preloader while loading
  }

  return (
    <div>
      <Header />
      <MobileSidebar />
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/" rel="nofollow">
              <i className="fi-rs-home mr-5"></i>Home
            </Link>
            <span></span> <Link to="#">Shringar</Link> <span></span>
          </div>
        </div>
      </div>
      <div className="container mb-30">
        <div className="row">
          <div className="col-xl-10 col-lg-12 m-auto">
            <div className="product-detail accordion-detail">
              <div className="row mb-3 mt-30">
                <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                  <div className="detail-gallery">
                    <span className="zoom-icon">
                      <i className="fi-rs-search bi bi-search"></i>
                    </span>
                    <div className="wrapper_preview_img" id="preview_img">
                      <img
                        src={`${url}/products/${
                          selectedImage || ProductData?.imageGallery?.[0] || ""
                        }`}
                        alt="Preview"
                      />
                    </div>
                    <div className="wrapper_thumb p-2" id="wrapper-thumb">
                      {ProductData.imageGallery?.map((image, index) => (
                        <div
                          key={index}
                          className={`thumb p-2 ${
                            selectedImage === image ? "active" : ""
                          }`}
                          onClick={() => handleThumbClick(image)}
                        >
                          <img
                            src={`${url}/products/${image}`}
                            alt={`Thumbnail ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* End Gallery */}
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12">
                  <div className="detail-info pr-30 pl-30 text-start">
                    <span className="stock-status out-stock">
                      {" "}
                      {categoryNameMapping[ProductData.category]}{" "}
                    </span>
                    <h2 className="title-detail mb-4">{ProductData.name}</h2>
                    <span className="mb-5 mt-3">
                      SKU: <Link to="#">{ProductData.sku}</Link>
                    </span>
                    <div className="clearfix product-price-cover mt-3">
                      <div className="product-price primary-color float-left">
                        <span className="current-price text-brand fs-1">
                          ₹
                          {ProductData.prices &&
                            (ProductData.prices.discounted
                              ? ProductData.prices.discounted
                              : ProductData.prices.calculatedPrice)}
                        </span>

                        <span>
                          {/* <span className="save-price font-md color3 ml-15">
                            26% Off
                          </span> */}
                          {!ProductData.calculationOnWeight && (
                            <span className="old-price font-md ml-15 fs-5">
                              ₹
                              {ProductData.prices &&
                              ProductData.prices.calculatedPrice
                                ? ProductData.prices.calculatedPrice
                                : "NA"}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="short-desc mb-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: ProductData.description,
                        }}
                      />
                    </div>
                    <div className="attr-detail attr-size mb-30 d-none">
                      <strong className="mr-10 fs-5">Color: </strong>
                      <ul className="list-filter size-filter font-small">
                        <li>
                          {" "}
                          <input
                            className="me-2"
                            type="checkbox"
                            style={{ minWidth: "20px" }}
                          />{" "}
                          <span className="me-2">Red</span>
                        </li>
                        <li className="active">
                          <input
                            className="me-2"
                            type="checkbox"
                            style={{ minWidth: "20px" }}
                          />
                          <span className="me-2">Green</span>
                        </li>
                        <li>
                          <input
                            className="me-2"
                            type="checkbox"
                            style={{ minWidth: "20px" }}
                          />
                          <span className="me-2">Grey</span>
                        </li>
                        <li>
                          <input
                            className="me-2"
                            type="checkbox"
                            style={{ minWidth: "20px" }}
                          />
                          <span className="me-2">Pink</span>
                        </li>
                        <li>
                          <input
                            className="me-2"
                            type="checkbox"
                            style={{ minWidth: "20px" }}
                          />
                          <span className="me-2">Black</span>
                        </li>
                      </ul>
                    </div>
                    <div className="detail-extralink   ">
                      <div className="detail-qty border radius">
                        <Link
                          to="#"
                          onClick={handleIncrement}
                          className="qty-down"
                        >
                          <i className="fi-rs-angle-small-down bi bi-chevron-down" />
                        </Link>
                        <input
                          type="text"
                          name="Quantity"
                          className="qty-val"
                          value={Quantity}
                          min={1}
                          readOnly
                        />
                        <Link
                          to="#"
                          onClick={handleDecrement}
                          className="qty-up"
                        >
                          <i className="fi-rs-angle-small-up bi bi-chevron-up" />
                        </Link>
                      </div>
                      <div
                        className="product-extra-link2 "
                        style={{ marginLeft: "12px" }}
                      >
                        <button
                          type="submit"
                          className="button button-add-to-cart"
                          onClick={handleCartClick}
                        >
                          <i className="fi-rs-shopping-cart" />
                          Add to cart
                        </button>
                        <Link
                          aria-label="Add To Wishlist"
                          className="action-btn hover-up"
                          style={{ marginLeft: "12px" }}
                          onClick={handleWishlistClick}
                        >
                          <i className="fi-rs-heart bi bi-heart" />
                        </Link>
                      </div>
                    </div>
                    <div className="font-xs d-none">
                      <ul className="mr-50 float-start">
                        <li className="mb-5">
                          Type: <span className="text-brand">Organic</span>
                        </li>
                        <li className="mb-5">
                          MFG:<span className="text-brand"> Jun 4.2022</span>
                        </li>
                        <li>
                          LIFE: <span className="text-brand">70 days</span>
                        </li>
                      </ul>
                      <ul className="float-start">
                        <li className="mb-5">
                          SKU: <Link to="#">FWM15VKT</Link>
                        </li>
                        <li className="mb-5">
                          Tags:{" "}
                          <Link to="#" rel="tag">
                            Snack
                          </Link>
                          ,{" "}
                          <Link to="#" rel="tag">
                            Organic
                          </Link>
                          ,{" "}
                          <Link to="#" rel="tag">
                            Brown
                          </Link>
                        </li>
                        <li>
                          Stock:
                          <span className="in-stock text-brand ml-5">
                            {/* {ProductData.stock.quantity} Items In Stock */}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Detail Info */}
                </div>
              </div>
              <div className="product-info">
                <div className="tab-style3">
                  <ul className="nav nav-tabs text-uppercase">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        id="Description-tab"
                        data-bs-toggle="tab"
                        to="#"
                      >
                        Description
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                <Link className="nav-link" id="Additional-info-tab" data-bs-toggle="tab" to='#'>Additional info</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" id="Vendor-info-tab" data-bs-toggle="tab" to='#'>Vendor</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" id="Reviews-tab" data-bs-toggle="tab" to='#'>Reviews (3)</Link>
              </li> */}
                  </ul>
                  <div className="tab-content shop_info_tab entry-main-content">
                    <div className="tab-pane fade show active" id="Description">
                      <div className>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: ProductData.description,
                          }}
                        />
                        <p>
                          From the moment you slip into our clothing, you'll
                          notice the difference. The softness of the fabric, the
                          attention to detail in the stitching, and the
                          flattering cuts all combine to offer you a heavenly
                          experience. Our designs are thoughtfully crafted to
                          complement your individuality, making you feel like a
                          deity of fashion. Our commitment to quality is
                          unwavering. We source the finest materials and employ
                          skilled artisans to create each piece, ensuring that
                          every God Clothes garment is a masterpiece in its own
                          right. We take pride in delivering fashion that stands
                          the test of time, both in terms of durability and
                          style.
                        </p>
                        {/* <ul className="product-more-infor mt-30">
                    <li><span>Type Of Packing</span> Bottle</li>
                    <li><span>Color</span> Green, Pink, Powder Blue, Purple</li>
                    <li><span>Quantity Per Case</span> 100ml</li>
                    <li><span>Ethyl Alcohol</span> 70%</li>
                    <li><span>Piece In One</span> Carton</li>
                  </ul> */}
                        <hr className="wp-block-separator is-style-dots" />
                        {/* <p>Laconic overheard dear woodchuck wow this outrageously taut beaver hey hello far meadowlark imitatively egregiously hugged that yikes minimally unanimous pouted flirtatiously as beaver beheld above forward energetic across this jeepers beneficently cockily less a the raucously that magic upheld far so the this where crud then below after jeez enchanting drunkenly more much wow callously irrespective limpet.</p> */}
                        <h4 className="mt-30">Packaging &amp; Delivery</h4>
                        <hr className="wp-block-separator is-style-wide" />
                        <p>
                          Discover a range that encompasses a spectrum of
                          choices, from casual wear that keeps you comfortable
                          during your everyday adventures to exquisite ensembles
                          that make you the center of attention at special
                          events. Whether you're seeking timeless classics or
                          the latest fashion trends with a divine twist, we have
                          it all. At God Clothes, we believe that fashion should
                          inspire confidence and empower self-expression. Each
                          piece in our collection is an invitation to embrace
                          your uniqueness and let your inner divinity shine.
                          Experience fashion that transcends earthly confines
                          and reaches new heights of elegance and grace. Explore
                          God Clothes today and elevate your style to a
                          celestial level.
                        </p>
                        {/* <p>Scallop or far crud plain remarkably far by thus far iguana lewd precociously and and less rattlesnake contrary caustic wow this near alas and next and pled the yikes articulate about as less cackled dalmatian in much less well jeering for the thanks blindly sentimental whimpered less across objectively fanciful grimaced wildly some wow and rose jeepers outgrew lugubrious luridly irrationally attractively dachshund.</p> */}
                      </div>
                    </div>
                    <div className="tab-pane fade" id="Additional-info d-none">
                      <table className="font-md">
                        <tbody>
                          <tr className="stand-up">
                            <th>Stand Up</th>
                            <td>
                              <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                            </td>
                          </tr>
                          <tr className="folded-wo-wheels">
                            <th>Folded (w/o wheels)</th>
                            <td>
                              <p>32.5″L x 18.5″W x 16.5″H</p>
                            </td>
                          </tr>
                          <tr className="folded-w-wheels">
                            <th>Folded (w/ wheels)</th>
                            <td>
                              <p>32.5″L x 24″W x 18.5″H</p>
                            </td>
                          </tr>
                          <tr className="door-pass-through">
                            <th>Door Pass Through</th>
                            <td>
                              <p>24</p>
                            </td>
                          </tr>
                          <tr className="frame">
                            <th>Frame</th>
                            <td>
                              <p>Aluminum</p>
                            </td>
                          </tr>
                          <tr className="weight-wo-wheels">
                            <th>Weight (w/o wheels)</th>
                            <td>
                              <p>20 LBS</p>
                            </td>
                          </tr>
                          <tr className="weight-capacity">
                            <th>Weight Capacity</th>
                            <td>
                              <p>60 LBS</p>
                            </td>
                          </tr>
                          <tr className="width">
                            <th>Width</th>
                            <td>
                              <p>24″</p>
                            </td>
                          </tr>
                          <tr className="handle-height-ground-to-handle">
                            <th>Handle height (ground to handle)</th>
                            <td>
                              <p>37-45″</p>
                            </td>
                          </tr>
                          <tr className="wheels">
                            <th>Wheels</th>
                            <td>
                              <p>12″ air / wide track slick tread</p>
                            </td>
                          </tr>
                          <tr className="seat-back-height">
                            <th>Seat back height</th>
                            <td>
                              <p>21.5″</p>
                            </td>
                          </tr>
                          <tr className="head-room-inside-canopy">
                            <th>Head room (inside canopy)</th>
                            <td>
                              <p>25″</p>
                            </td>
                          </tr>
                          <tr className="pa_color">
                            <th>Color</th>
                            <td>
                              <p>Black, Blue, Red, White</p>
                            </td>
                          </tr>
                          <tr className="pa_size">
                            <th>Size</th>
                            <td>
                              <p>M, S</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="tab-pane fade d-none" id="Vendor-info">
                      <div className="vendor-logo d-flex mb-30">
                        <img src="assets/imgs/vendor/vendor-18.svg" alt="" />
                        <div className="vendor-name ml-15">
                          <h6>
                            <Link to="#">Noodles Co.</Link>
                          </h6>
                          <div className="product-rate-cover text-end">
                            <div className="product-rate d-inline-block">
                              <div
                                className="product-rating"
                                style={{ width: "90%" }}
                              />
                            </div>
                            <span className="font-small ml-5 text-muted">
                              {" "}
                              (32 reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      <ul className="contact-infor mb-50">
                        <li>
                          <img
                            src="assets/imgs/theme/icons/icon-location.svg"
                            alt=""
                          />
                          <strong>Address: </strong>{" "}
                          <span>
                            5171 W Campbell Ave undefined Kent, Utah 53127
                            United States
                          </span>
                        </li>
                        <li>
                          <img
                            src="assets/imgs/theme/icons/icon-contact.svg"
                            alt=""
                          />
                          <strong>Contact Seller:</strong>
                          <span>(+91) - 540-025-553</span>
                        </li>
                      </ul>
                      <div className="d-flex mb-55">
                        <div className="mr-30">
                          <p className="text-brand font-xs">Rating</p>
                          <h4 className="mb-0">92%</h4>
                        </div>
                        <div className="mr-30">
                          <p className="text-brand font-xs">Ship on time</p>
                          <h4 className="mb-0">100%</h4>
                        </div>
                        <div>
                          <p className="text-brand font-xs">Chat response</p>
                          <h4 className="mb-0">89%</h4>
                        </div>
                      </div>
                      <p>
                        Noodles &amp; Company is an American fast-casual
                        restaurant that offers international and American noodle
                        dishes and pasta in addition to soups and salads.
                        Noodles &amp; Company was founded in 1995 by Aaron
                        Kennedy and is headquartered in Broomfield, Colorado.
                        The company went public in 2013 and recorded a $457
                        million revenue in 2017.In late 2018, there were 460
                        Noodles &amp; Company locations across 29 states and
                        Washington, D.C.
                      </p>
                    </div>
                    <div className="tab-pane fade d-none" id="Reviews">
                      {/*Comments*/}
                      <div className="comments-area">
                        <div className="row">
                          <div className="col-lg-8">
                            <h4 className="mb-30">
                              Customer questions &amp; answers
                            </h4>
                            <div className="comment-list">
                              <div className="single-comment justify-content-between d-flex mb-30">
                                <div className="user justify-content-between d-flex">
                                  <div className="thumb text-center">
                                    <img
                                      src="assets/imgs/blog/author-2.png"
                                      alt=""
                                    />
                                    <Link
                                      to="#"
                                      className="font-heading text-brand"
                                    >
                                      Sienna
                                    </Link>
                                  </div>
                                  <div className="desc">
                                    <div className="d-flex justify-content-between mb-10">
                                      <div className="d-flex align-items-center">
                                        <span className="font-xs text-muted">
                                          December 4, 2022 at 3:12 pm{" "}
                                        </span>
                                      </div>
                                      <div className="product-rate d-inline-block">
                                        <div
                                          className="product-rating"
                                          style={{ width: "100%" }}
                                        />
                                      </div>
                                    </div>
                                    <p className="mb-10">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Delectus, suscipit
                                      exercitationem accusantium obcaecati quos
                                      voluptate nesciunt facilis itaque modi
                                      commodi dignissimos sequi repudiandae
                                      minus ab deleniti totam officia id
                                      incidunt?{" "}
                                      <Link to="#" className="reply">
                                        Reply
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="single-comment justify-content-between d-flex mb-30 ml-30">
                                <div className="user justify-content-between d-flex">
                                  <div className="thumb text-center">
                                    <img
                                      src="assets/imgs/blog/author-3.png"
                                      alt=""
                                    />
                                    <Link
                                      to="#"
                                      className="font-heading text-brand"
                                    >
                                      Brenna
                                    </Link>
                                  </div>
                                  <div className="desc">
                                    <div className="d-flex justify-content-between mb-10">
                                      <div className="d-flex align-items-center">
                                        <span className="font-xs text-muted">
                                          December 4, 2022 at 3:12 pm{" "}
                                        </span>
                                      </div>
                                      <div className="product-rate d-inline-block">
                                        <div
                                          className="product-rating"
                                          style={{ width: "80%" }}
                                        />
                                      </div>
                                    </div>
                                    <p className="mb-10">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Delectus, suscipit
                                      exercitationem accusantium obcaecati quos
                                      voluptate nesciunt facilis itaque modi
                                      commodi dignissimos sequi repudiandae
                                      minus ab deleniti totam officia id
                                      incidunt?{" "}
                                      <Link to="#" className="reply">
                                        Reply
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="single-comment justify-content-between d-flex">
                                <div className="user justify-content-between d-flex">
                                  <div className="thumb text-center">
                                    <img
                                      src="assets/imgs/blog/author-4.png"
                                      alt=""
                                    />
                                    <Link
                                      to="#"
                                      className="font-heading text-brand"
                                    >
                                      Gemma
                                    </Link>
                                  </div>
                                  <div className="desc">
                                    <div className="d-flex justify-content-between mb-10">
                                      <div className="d-flex align-items-center">
                                        <span className="font-xs text-muted">
                                          December 4, 2022 at 3:12 pm{" "}
                                        </span>
                                      </div>
                                      <div className="product-rate d-inline-block">
                                        <div
                                          className="product-rating"
                                          style={{ width: "80%" }}
                                        />
                                      </div>
                                    </div>
                                    <p className="mb-10">
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipisicing elit. Delectus, suscipit
                                      exercitationem accusantium obcaecati quos
                                      voluptate nesciunt facilis itaque modi
                                      commodi dignissimos sequi repudiandae
                                      minus ab deleniti totam officia id
                                      incidunt?{" "}
                                      <Link to="#" className="reply">
                                        Reply
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <h4 className="mb-30">Customer reviews</h4>
                            <div className="d-flex mb-30">
                              <div className="product-rate d-inline-block mr-15">
                                <div
                                  className="product-rating"
                                  style={{ width: "90%" }}
                                />
                              </div>
                              <h6>4.8 out of 5</h6>
                            </div>
                            <div className="progress">
                              <span>5 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "50%" }}
                                aria-valuenow={50}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                50%
                              </div>
                            </div>
                            <div className="progress">
                              <span>4 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "25%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                25%
                              </div>
                            </div>
                            <div className="progress">
                              <span>3 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "45%" }}
                                aria-valuenow={45}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                45%
                              </div>
                            </div>
                            <div className="progress">
                              <span>2 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "65%" }}
                                aria-valuenow={65}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                65%
                              </div>
                            </div>
                            <div className="progress mb-30">
                              <span>1 star</span>
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "85%" }}
                                aria-valuenow={85}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              >
                                85%
                              </div>
                            </div>
                            <Link to="#" className="font-xs text-muted">
                              How are ratings calculated?
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/*comment form*/}
                      <div className="comment-form">
                        <h4 className="mb-15">Add a review</h4>
                        <div className="product-rate d-inline-block mb-30" />
                        <div className="row">
                          <div className="col-lg-8 col-md-12">
                            <form
                              className="form-contact comment_form"
                              action="#"
                              id="commentForm"
                            >
                              <div className="row">
                                <div className="col-12">
                                  <div className="form-group">
                                    <textarea
                                      className="form-control w-100"
                                      name="comment"
                                      id="comment"
                                      cols={30}
                                      rows={9}
                                      placeholder="Write Comment"
                                      defaultValue={""}
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      name="name"
                                      id="name"
                                      type="text"
                                      placeholder="Name"
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      name="email"
                                      id="email"
                                      type="email"
                                      placeholder="Email"
                                    />
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="form-group">
                                    <input
                                      className="form-control"
                                      name="website"
                                      id="website"
                                      type="text"
                                      placeholder="Website"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="form-group">
                                <button
                                  type="submit"
                                  className="button button-contactForm"
                                >
                                  Submit Review
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-4">
        <div className="row popular-row">
          <h1 className="text-start fs-1 mt-4 mb-4">Related Products</h1>
        </div>
        <div className="row">
          {products.map((product) => (
            <div className=" col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <div className="product-cart-wrap popular-card" tabIndex={0}>
                <div className="product-img-action-wrap">
                  <div className="product-img product-img-zoom">
                    <Link to="#" tabIndex={0}>
                      <img
                        className="default-img"
                        src={product.imageUrl}
                        alt=""
                      />
                      <img
                        className="hover-img"
                        src={product.hoverImageUrl}
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
                <div className="product-content-wrap">
                  <div className="product-category">
                    <Link to="#">{product.category}</Link>
                  </div>
                  <h2>
                    <Link to="#">{product.name}</Link>
                  </h2>

                  <div className="product-card-bottom">
                    <div className="product-price popular-card-price">
                      <span>₹{product.price.toFixed(2)}</span>
                      <span className="old-price">
                        ₹{product.oldPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="add-cart popular-card-cart">
                      <Link className="add add-cart-btn" to="#">
                        <i className="fi-rs-shopping-cart mr-5 bi bi-cart me-2"></i>
                        Add{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Category background="#fff" />
      <MidFooter />
    </div>
  );
};

export default ProductDetails;
