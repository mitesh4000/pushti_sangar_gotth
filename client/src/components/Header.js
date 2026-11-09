import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import Select from "react-select";

import logo2 from "../images/logo1.png";
import logo from "../images/favIcon.png";
import smallImage from "../images/small-image-2.jpg";
import smallsangar from "../images/smallsanagr.jpg";
import { Link, useParams } from "react-router-dom";
import { BsPerson, BsCart } from "react-icons/bs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SignContext from "../contextAPI/Context/SignContext";
const options = [
  { value: "Shringar", label: "Shringar" },
  { value: "Vastra", label: "Vastra" },
  { value: "Silver Vassels", label: "Silver Vassels" },
  { value: "Sugandhi(Attar)", label: "Sugandhi(Attar)" },
  { value: "Pichwai And Wall Art", label: "Pichwai And Wall Art" },
  { value: "Fibre Items", label: "Baking material" },
  { value: "Seasonal Products", label: "Seasonal Products" },
];

const Header = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [CartData, setCartData] = useState([]);
  const {
    createCustomer,
    loginCustomer,
    getLoggedInCustomer,
    GetLoggedInCartItems,
    removeItemFromCart,
    forgotCustomerPassword,
    // GetSpecificCustomer,
    // UpdateCustomer,
    // deleteCustomer,
  } = useContext(SignContext);
  const authToken = localStorage.getItem("authToken");
  // console.log(authToken);
  const [isCartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [CustomerInfo, setCustomerInfo] = useState({});
  const [Error, setError] = useState("");
  const [errorBanner, setErrorBanner] = useState("");
  // const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const [isVenderDropdownOpen, setVenderDropdownOpen] = useState(false);
  const [isMegaMenuDropdownOpen, setMegaMenuDropdownOpen] = useState(false);

  const [isPagesDropDownOpen, setPagesDropDownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [buttonText, setButtonText] = useState("Show More...");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setButtonText(isVisible ? "Show More..." : "Show Less...");
  };
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const GetLoggedInCustomer = async (token) => {
    const res = await getLoggedInCustomer(token);
    // console.log(res);
    if (res.success) {
      setCustomerInfo(res.customer);
    } else {
      console.log(res.msg);
    }
  };

  const getLoggedinCustomerCart = async (CustomerId) => {
    const res = await GetLoggedInCartItems(CustomerId);
    // console.log("get cart", res);
    if (res.success) {
      setCartData(res.cartItems);
    }
  };

  const handleRemoveItemFromCart = async (productId) => {
    try {
      const customerId = CustomerInfo._id; // Replace with the actual customer ID
      const res = await removeItemFromCart(customerId, productId);

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

  const handleSignout = async () => {
    localStorage.removeItem("authToken");
    console.log("authToken Removed");
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
  };
  const handleLoginClick = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
    setShowForgotPasswordModal(false);
  };

  const handleSignupModalClose = () => {
    setShowSignupModal(false);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

  const handleForgotPasswordModalClose = () => {
    setShowForgotPasswordModal(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handlePageHover = () => {
    setPagesDropDownOpen(true);
  };
  const handlePageLeave = () => {
    setPagesDropDownOpen(false);
  };

  const handleMegaMenuHover = () => {
    setMegaMenuDropdownOpen(true);
  };
  const handleMegaMenuLeave = () => {
    setMegaMenuDropdownOpen(false);
  };

  const handleVenderHover = () => {
    setVenderDropdownOpen(true);
  };
  const handleVenderLeave = () => {
    setVenderDropdownOpen(false);
  };

  const handleCategoryHover = () => {
    setCategoryDropdownOpen(true);
  };
  const handleCategoryLeave = () => {
    setCategoryDropdownOpen(false);
  };

  const handleCartHover = () => {
    setCartDropdownOpen(true);
    getLoggedinCustomerCart(CustomerInfo._id);
  };

  const handleCartLeave = () => {
    setCartDropdownOpen(false);
  };

  const handleAccountHover = () => {
    setAccountDropdownOpen(true);
  };

  const handleAccountLeave = () => {
    setAccountDropdownOpen(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Initial values for the forms
  // const initialValuesLogin = {
  //   email: "",
  //   password: "",
  // };

  // const initialValuesForgotPassword = {
  //   email: "",
  // };

  // const initialValuesSignup = {
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   phone: "",
  // };

  // Validation schemas
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const signupSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string().required("Mobile Number is required"),
  });

  const handleLogin = async (Values) => {
    const res = await loginCustomer(Values);
    // console.log(res);
    if (res.success) {
      window.localStorage.setItem("loggedIn", true);
      window.localStorage.setItem("authToken", res.token);
      handleModalClose();
    } else {
      setErrorBanner(res.msg);
      setTimeout(() => {
        setErrorBanner("");
      }, 2000);
    }
  };

  const handleForgotPasswordSubmit = async (Values) => {
    const res = await forgotCustomerPassword(Values);
    console.log(res)
    if (res.success) {
      setSuccess(res.msg);
    } else {
      setError(res.msg);
      setTimeout(() => {
        setError("");
      }, 1000);
    }
    
  };

  const handleSignupSubmit = async (Values) => {
    const res = await createCustomer(Values);
    // console.log(res);
    if (res.success) {
      handleLoginClick();
    }
  };

  const totalPrice = CartData.reduce((acc, item) => {
    // Ensure that item.quantity and item.discountedPrice are valid numbers
    const quantity = parseFloat(item.quantity);
    const discountedPrice = parseFloat(
      item.product.prices.discounted ? item.product.prices.discounted : item.product.prices.calculatedPrice
    );

    // Check for NaN or invalid values
    if (isNaN(quantity) || isNaN(discountedPrice)) {
      return acc; // Skip this item if it has invalid data
    }

    return acc + quantity * discountedPrice;
  }, 0);

  useEffect(() => {
    GetLoggedInCustomer(authToken);
    getLoggedinCustomerCart(CustomerInfo._id);
  }, [CustomerInfo._id]);

  return (
    <header className="header-area header-style-1 header-height-2">
      <div className="header-top header-top-ptb-1  d-lg-block">
        <div className="container">
          <div className="row align-items-center d-flex justify-content-around">
            <div className="col-xl-6 col-lg-6  mt-2 d-none">
              <div className="header-info">
                <ul className="d-flex justify-content-start list-unstyled">
                  {/* <li className="me-4 mt-1 mb-3">
                    <Link className="text-decoration-none" to='#'>
                      About Us
                    </Link>
                  </li> */}
                  <li className="me-4 mt-1">
                    <Link className="text-decoration-none" to="#">
                      My Account
                    </Link>
                  </li>
                  <li className="mt-1">
                    <Link className="text-decoration-none" to="#">
                      Help & Support
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 mb-3 mt-2 d-none">
              <div className="header-info header-info-right">
                <ul className="list-unstyled d-flex justify-content-end ">
                  <li className="mt-1 d-flex align-items-center me-3">
                    Need help? Call Us:{" "}
                    <strong className="text-brand"> + 1800 900</strong>
                  </li>

                  <li>
                    {/* {false ? (
                      <p>Welcome, User! You are logged in.</p>
                    ) : (
                      <button className="btn" onClick={handleLoginClick}>
                        Login/SignUp
                      </button>
                    )} */}
                  </li>
                </ul>
              </div>
            </div>

            {showLoginModal && (
              <div
                className="modal fade show"
                id="LoginRegister"
                style={{ display: "block" }}
                aria-modal="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    {/* Modal body */}
                    <div className="modal-body">
                      <div className="login-part" style={{ display: "block" }}>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          onClick={handleModalClose}
                        >
                          ×
                        </button>
                        <div className="row m-0">
                          <div className="col-md-12 col-lg-8">
                            <div className="lr-details">
                              <h5>Sign in to PushtiShangar</h5>
                              {errorBanner &&<div className="alert alert-danger" role="alert">
                                {errorBanner}
                              </div>}
                              <Formik
                                initialValues={{
                                  email: "",
                                  password: "",
                                }}
                                validationSchema={loginSchema}
                                onSubmit={async (values, { resetForm }) => {
                                  await handleLogin(values);
                                  resetForm();
                                  // togglemodal();
                                  // toast.success("User Added Successfully", { autoClose: 3000 });
                                }}
                              >
                                {({
                                  isSubmitting,
                                  handleChange,
                                  handleSubmit,
                                  errors,
                                  touched,
                                  values,
                                  handleBlur,
                                  setFieldValue,
                                }) => (
                                  <Form onSubmit={handleSubmit}>
                                    <div className="billing-details mt-4">
                                      <div className="form-group">
                                        <Field
                                          type="text"
                                          name="email"
                                          className="form-control login-input"
                                          placeholder="Email Address *"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.email}
                                        />
                                        <p className="error text-danger">
                                          {errors.email &&
                                            touched.email &&
                                            errors.email}
                                        </p>
                                        <span>
                                          <i className="bx bx-user-circle bi bi-person-circle" />
                                        </span>
                                      </div>
                                      <div className="form-group">
                                        <Field
                                          type="password"
                                          name="password"
                                          className="form-control login-input"
                                          placeholder="Password *"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.password}
                                        />
                                        <span>
                                          <i className="bx bxs-lock bi bi-lock-fill" />
                                        </span>
                                        <p className="error text-danger">
                                          {errors.password &&
                                            touched.password &&
                                            errors.password}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="forogotlink text-start">
                                      <Link
                                        className="forgotlinking forgot_password"
                                        onClick={handleForgotPasswordClick}
                                        to="#"
                                      >
                                        Forgot Password ?
                                      </Link>
                                    </div>
                                    <div className="text-center mt-3">
                                      <button
                                        type="submit"
                                        className="default-btn w-50"
                                        disabled={isSubmitting}
                                      >
                                        Sign In
                                        <span />
                                      </button>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4 flex-col img-part">
                            <div className="login-white-container">
                              <h1>Hello, friend!</h1>
                              <p>
                                Enjoy your personal details and start your
                                journey with us.
                              </p>
                              <div className="register">
                                <Link
                                  className="createlinking register_button"
                                  to="#"
                                  onClick={handleSignupClick}
                                  id
                                >
                                  Sign Up
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showForgotPasswordModal && (
              <div
                className="modal fade show"
                id="LoginRegister"
                style={{ display: "block", paddingRight: 17 }}
                aria-modal="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    {/* Modal body */}
                    <div className="modal-body">
                      <div className="forgot-password-part" style={{}}>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          onClick={handleForgotPasswordModalClose}
                        >
                          ×
                        </button>
                        <div className="row m-0">
                          <div className="col-md-12 col-lg-8">
                            <div className="lr-details">
                              <h5>Forgot Password</h5>
                              <Formik
                                initialValues={{
                                  email: "",
                                }}
                                validationSchema={forgotPasswordSchema}
                                onSubmit={async (values, { resetForm }) => {
                                  await handleForgotPasswordSubmit(values);
                                  resetForm();
                                  // togglemodal();
                                  // toast.success("User Added Successfully", { autoClose: 3000 });
                                }}
                              >
                                {({
                                  isSubmitting,
                                  handleChange,
                                  handleSubmit,
                                  errors,
                                  touched,
                                  values,
                                  handleBlur,
                                  setFieldValue,
                                }) => (
                                  <Form onSubmit={handleSubmit}>
                                    <div className="billing-details mt-4">
                                      <div className="form-group">
                                        <h6 className="mb-2">
                                          I want to Reset Password using
                                        </h6>
                                        <Field
                                          type="text"
                                          name="email"
                                          className="form-control"
                                          placeholder="Email Address *"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.email}
                                        />
                                        <p className="error text-danger">
                                          {errors.email &&
                                            touched.email &&
                                            errors.email}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-center mt-3">
                                      <button
                                        type="submit"
                                        className="default-btn w-50"
                                        disabled={isSubmitting}
                                      >
                                        Send Email
                                        <span
                                          style={{
                                            top: "-1px",
                                            left: "87.7px",
                                          }}
                                        />
                                      </button>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4 flex-col img-part">
                            <div className="login-white-container">
                              <h1>Hello, friend!</h1>
                              <p>
                                Enjoy your personal details and start your
                                journey with us.
                              </p>
                              <div className="register">
                                <Link
                                  className="createlinking register_button"
                                  to="#"
                                  onClick={handleSignupClick}
                                  id
                                >
                                  Sign Up
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showSignupModal && (
              <div
                className="modal fade show"
                id="LoginRegister"
                style={{ display: "block", paddingRight: 17 }}
                aria-modal="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    {/* Modal body */}
                    <div className="modal-body">
                      <div className="register-part" style={{}}>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          onClick={handleSignupModalClose}
                          style={{ right: 10, left: "auto" }}
                        >
                          ×
                        </button>
                        <div className="row m-0">
                          <div className="col-md-12 col-lg-4 flex-col img-part">
                            <div className="login-white-container">
                              <h1>Welcome Back !</h1>
                              <p>
                                To be connected with us please login with your
                                personal info.
                              </p>
                              <div className="register">
                                <Link
                                  className="createlinking login_button"
                                  onClick={handleLoginClick}
                                  to="#"
                                  id
                                >
                                  Sign In
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-8">
                            <div className="lr-details">
                              <h5>Create Account</h5>
                              <Formik
                                initialValues={{
                                  username: "",
                                  email: "",
                                  password: "",
                                  confirmPassword: "",
                                  phone: "",
                                }}
                                validationSchema={signupSchema}
                                onSubmit={async (values, { resetForm }) => {
                                  await handleSignupSubmit(values);
                                  resetForm();
                                  // togglemodal();
                                  // toast.success("User Added Successfully", { autoClose: 3000 });
                                }}
                              >
                                {({
                                  isSubmitting,
                                  handleChange,
                                  handleSubmit,
                                  errors,
                                  touched,
                                  values,
                                  handleBlur,
                                  setFieldValue,
                                }) => (
                                  <Form onSubmit={handleSubmit}>
                                    <div className="billing-details mt-4">
                                      <div className="row">
                                        <div className="form-group col-md-12">
                                          <Field
                                            type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder="First Name *"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                          />
                                          <p classname="error text-danger">
                                            {errors.username &&
                                              touched.username &&
                                              errors.username}
                                          </p>
                                        </div>

                                        <div className="form-group col-md-12">
                                          <Field
                                            type="text"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email Address *"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                          />
                                          <p classname="error text-danger">
                                            {errors.email &&
                                              touched.email &&
                                              errors.email}
                                          </p>
                                        </div>
                                        <div className="form-group col-md-6">
                                          <Field
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Password *"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                          />
                                          <p classname="error text-danger">
                                            {errors.password &&
                                              touched.password &&
                                              errors.password}
                                          </p>
                                        </div>
                                        <div className="form-group col-md-6">
                                          <Field
                                            type="password"
                                            name="confirmPassword"
                                            className="form-control"
                                            placeholder="Confirm Password *"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPassword}
                                          />
                                          <p classname="error text-danger">
                                            {errors.confirmPassword &&
                                              touched.confirmPassword &&
                                              errors.confirmPassword}
                                          </p>
                                        </div>
                                        <div className="form-group col-md-12">
                                          <Field
                                            type="text"
                                            name="phone"
                                            className="form-control"
                                            placeholder="Mobile Number *"
                                          />
                                          <p classname="error text-danger">
                                            {errors.phone &&
                                              touched.phone &&
                                              errors.phone}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-center mt-3">
                                      <button
                                        type="submit"
                                        className="default-btn w-50"
                                        disabled={isSubmitting}
                                      >
                                        Submit Here
                                        <span />
                                      </button>
                                    </div>
                                  </Form>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="header-middle header-middle-ptb-1  d-lg-block">
        <div className="container">
          <div className="header-wrap">
            <div className="logo logo-width-1">
              <Link to="/">
                <img src={logo2} alt="logo" />
              </Link>
            </div>
            <div className="header-right">
              <div className="search-style-2">
                <form action="#">
                  <div style={{ width: "300px" }}>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder="Search Category"
                    />
                  </div>

                  <input type="text" placeholder="Search for items..." />
                </form>
              </div>
              {authToken ? (
                <div className="header-action-right">
                  <div className="header-action-2">
                    <div
                      className="header-action-icon-2"
                      onMouseEnter={handleCartHover}
                      onMouseLeave={handleCartLeave}
                    >
                      <Link className="mini-cart-icon" to="#">
                        <BsCart />
                        <span className="pro-count blue">
                          {CartData.length}
                        </span>
                      </Link>
                      <Link to="#">
                        <span className="lable">Cart</span>
                      </Link>
                      {isCartDropdownOpen && (
                        <div className="cart-dropdown-wrap cart-dropdown-hm2">
                          <ul>
                            {CartData.map((item) => (
                              <li>
                                <div className="shopping-cart-img">
                                  <Link to="#">
                                    <img
                                      alt="cart"
                                      src={`${url}/products/${item.product.imageGallery[0]}`}
                                    />
                                  </Link>
                                </div>
                                <div className="shopping-cart-title">
                                  <h4>
                                    <Link to="#">{item.product.name}</Link>
                                  </h4>
                                  <h3>
                                    <span>{item.quantity}× </span>
                                    {item.product.prices.discounted
                                      ? item.product.prices.discounted
                                      : item.product.prices.calculatedPrice}
                                  </h3>
                                </div>
                                <div className="shopping-cart-delete">
                                  <Link
                                    onClick={() => {
                                      handleRemoveItemFromCart(
                                        item.product._id
                                      );
                                    }}
                                  >
                                    <i className="fi-rs-cross-small bi bi-x" />
                                  </Link>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <div className="shopping-cart-footer">
                            {/* <div className="shopping-cart-total">
                              <h4 className="d-flex justify-content-between">
                                <span>Total</span> <span>{totalPrice}</span>
                              </h4>
                            </div> */}
                            <div className="shopping-cart-button">
                              <Link to={`/cart/${CustomerInfo._id}`}>
                                View cart
                              </Link>
                              <Link to={`/checkout/${CustomerInfo._id}`}>Checkout</Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className="header-action-icon-2"
                      onMouseEnter={handleAccountHover}
                      onMouseLeave={handleAccountLeave}
                    >
                      <Link to="#">
                        <BsPerson />
                      </Link>
                      <Link to="#">
                        <span className="lable ml-0">Account</span>
                      </Link>
                      {isAccountDropdownOpen && (
                        <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                          <ul className="">
                            <li>
                              <Link to="/my-account">
                                <i className="fi fi-rs-user mr-10" />
                                My Account
                              </Link>
                            </li>

                            <li>
                              <Link to={`/my-wishlist/${CustomerInfo._id}`}>
                                <i className="fi fi-rs-heart mr-10" />
                                My Wishlist
                              </Link>
                            </li>

                            <li>
                              <Link onClick={handleSignout}>
                                <i className="fi fi-rs-sign-out mr-10" />
                                Sign out
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <button className="btn" onClick={handleLoginClick}>
                  Login/SignUp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="header-bottom header-bottom-bg-color sticky-bar ">
        <div className="container">
          <div className="header-wrap header-space-between position-relative">
            <div className="logo logo-width-1 d-block d-lg-none">
              <Link to="#">
                <img src="assets/imgs/theme/logo.svg" alt="logo" />
              </Link>
            </div>
            <div className="header-nav d-none d-lg-flex">
              <div
                className="main-categori-wrap d-none d-lg-block"
                onMouseEnter={handleCategoryHover}
                onMouseLeave={handleCategoryLeave}
              >
                <Link
                  className="categories-button-active"
                  to="#"
                  onClick={toggleDropdown}
                >
                  <span className="fi-rs-apps bi bi-grid me-1 " />{" "}
                  <span className="et " onClick={toggleDropdown}>
                    Browse All Categories
                  </span>
                  <i className="fi-rs-angle-down bi bi-chevron-down " />
                </Link>
                {isOpen && (
                  <div className="categories-dropdown-wrap categories-dropdown-active-large font-heading">
                    <div className="d-flex categori-dropdown-inner">
                      <ul>
                        <li>
                          <Link to="#">
                            {" "}
                            <img src={logo} alt="Pushti Shangar" />
                            Vastra
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            {" "}
                            <img src={logo} alt="Pushti Shangar" />
                            Shangar
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            {" "}
                            <img src={logo} alt="Pushti Shangar" />
                            Shringar
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            {" "}
                            <img src={logo} alt="Pushti Shangar" />
                            ShriMastak
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            {" "}
                            <img src={logo} alt="Pushti Shangar" />
                            ShriKarna
                          </Link>
                        </li>
                      </ul>
                      <ul className="end">
                        <li>
                          <Link to="#">
                            {" "}
                            <img src={logo} alt="Pushti Shangar" />
                            Makhravind
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            {" "}
                            <img src={logo} alt="Pushti Shangar" />
                            Karnaful
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            {" "}
                            <img src={logo} alt="Pushti Shangar" />
                            Netra
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            {" "}
                            <img src={logo} alt="Pushti Shangar" />
                            Chibuk
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            {" "}
                            <img src={logo} alt="Pushti Shangar" />
                            Shri Ang
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="more_slide_open">
                      {isVisible && (
                        <div className="d-flex categori-dropdown-inner">
                          <ul>
                            <li>
                              <Link to="#">
                                {" "}
                                <img src={logo} alt="Pushti Shangar" />
                                ShriHast
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                {" "}
                                <img src={logo} alt="Pushti Shangar" />
                                Nakveshvar
                              </Link>
                            </li>
                          </ul>
                          <ul className="end">
                            <li>
                              <Link to="#">
                                {" "}
                                <img src={logo} alt="Pushti Shangar" />
                                Shishful
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                {" "}
                                <img src={logo} alt="Pushti Shangar" />
                                Tipara
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="more_categories" onClick={toggleVisibility}>
                      <span></span>{" "}
                      <span className="heading-sm-1">{buttonText}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block font-heading">
                <nav>
                  <ul>
                    <li>
                      <Link className="" to="/">
                        Home{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us">About</Link>
                    </li>

                    {/* <li
                      onMouseEnter={handleVenderHover}
                      onMouseLeave={handleVenderLeave}
                    >
                      <Link to="#">
                        Shringar{" "}
                        <i className="fi-rs-angle-down bi bi-chevron-down" />
                      </Link>
                      {isVenderDropdownOpen && (
                        <ul
                          className="sub-menu"
                          onMouseLeave={handleVenderLeave}
                        >
                          <li>
                            <Link to="#">Shri Mastak</Link>
                          </li>
                          <li>
                            <Link to="#">Shri Karna</Link>
                          </li>
                          <li>
                            <Link to="#">Mukharvind</Link>
                          </li>
                          <li>
                            <Link to="#">Shri Ang</Link>
                          </li>
                          <li>
                            <Link to="#">Shri Hast</Link>
                          </li>
                          <li>
                            <Link to="#">Shri Charan</Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li
                      className="position-static"
                      onMouseEnter={handleMegaMenuHover}
                      onMouseLeave={handleMegaMenuLeave}
                    >
                      <Link to="#">
                        Categories{" "}
                        <i className="fi-rs-angle-down bi bi-chevron-down" />
                      </Link>
                      {isMegaMenuDropdownOpen && (
                        <ul className="mega-menu">
                          <li className="sub-mega-menu sub-mega-menu-width-22">
                            <Link className="menu-title" to="#">
                              Silver Vessels
                            </Link>
                            <ul>
                              <li>
                                <Link to="#">Jhariji</Link>
                              </li>
                              <li>
                                <Link to="#">Katori (Bowl)</Link>
                              </li>
                              <li>
                                <Link to="#">Dabra</Link>
                              </li>
                              <li>
                                <Link to="#">Thali (Plate)</Link>
                              </li>
                              <li>
                                <Link>Spoon</Link>
                              </li>
                              <li>
                                <Link>Mohra Patti</Link>
                              </li>
                              <li>
                                <Link>Khilona</Link>
                              </li>
                              <li>
                                <Link>Palna</Link>
                              </li>
                              <li>
                                <Link>Hindola</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="sub-mega-menu sub-mega-menu-width-22">
                            <Link className="menu-title" to="#">
                              Sugandhi (Attar)
                            </Link>
                            <ul>
                              <li>
                                <Link>All Year Round</Link>
                              </li>
                              <li>
                                <Link>Varshakal (Monsoon)</Link>
                              </li>
                              <li>
                                <Link>Sheetkal (Winter)</Link>
                              </li>
                              <li>
                                <Link>Ushnakal (Summer)</Link>
                              </li>
                              <li>
                                <Link>Vasant (Spring)</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="sub-mega-menu sub-mega-menu-width-22">
                            <Link className="menu-title" to="#">
                              Seasonal Products
                            </Link>
                            <ul>
                              <li>
                                <Link>Varshakal (Monsoon)</Link>
                              </li>
                              <li>
                                <Link>Sheetkal (Winter)</Link>
                              </li>
                              <li>
                                <Link>Vasant (Spring)</Link>
                              </li>
                              <li>
                                <Link>Ushnakal (Summer) </Link>
                              </li>
                            </ul>
                          </li>
                          <li className="sub-mega-menu sub-mega-menu-width-22">
                            <Link className="menu-title" to="#">
                              Pichwai and Wall Art
                            </Link>
                            <ul>
                              <li>
                                <Link>Digital Printed Pichwai</Link>
                              </li>
                              <li>
                                <Link>Hand Painted Pichwai</Link>
                              </li>
                              <li>
                                <Link>Wall Plates</Link>
                              </li>
                              <li>
                                <Link>Photo Frames</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="sub-mega-menu sub-mega-menu-width-22">
                            <Link className="menu-title" to="#">
                              Fibre Items
                            </Link>
                            <ul>
                              <li>
                                <Link>Gop-Gopi</Link>
                              </li>
                              <li>
                                <Link>Animal Swarups</Link>
                              </li>
                            </ul>
                          </li>
                          <li className="sub-mega-menu sub-mega-menu-width-34">
                            <div className="menu-banner-wrap">
                              <Link>
                                <img src={smallImage} alt="" />
                              </Link>
                              <div className="menu-banner-content">
                                <h4>Hot deals</h4>
                                <h3>
                                  Don't miss
                                  <br />
                                  Trending
                                </h3>
                                <div className="menu-banner-price">
                                  <span className="new-price text-success">
                                    Save to 50%
                                  </span>
                                </div>
                                <div className="menu-banner-btn">
                                  <Link>Shop now</Link>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      )}
                    </li>

                    <li
                      onMouseEnter={handlePageHover}
                      onMouseLeave={handlePageLeave}
                    >
                      <Link to="#">
                        Vastra{" "}
                        <i className="fi-rs-angle-down bi bi-chevron-down" />
                      </Link>
                      {isPagesDropDownOpen && (
                        <ul
                          className="sub-menu"
                          onMouseLeave={handlePageLeave}
                          style={{ minWidth: "120px " }}
                        >
                          <li>
                            <Link to="#">Cotton</Link>
                          </li>
                          <li>
                            <Link to="#">Satin</Link>
                          </li>
                          <li>
                            <Link to="#">Zari</Link>
                          </li>
                        </ul>
                      )}
                    </li> */}

                    <li>
                      <Link className="" to="/blog">
                        Blog{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/gallery">Gallery</Link>
                    </li>
                    <li>
                      <Link to="/contact-us">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="hotline d-none d-lg-flex">
              <div className="me-3 mt-1">
                {/* {authToken ? ( */}
                <p>Welcome</p>
                {/* ) : ( */}
                {/* <button className="btn" onClick={handleLoginClick}>
                    Login/SignUp
                  </button> */}
                {/* )} */}
              </div>
            </div>
            <div className="header-action-icon-2 d-block d-lg-none">
              <div className="burger-icon burger-icon-white">
                <span className="burger-icon-top" />
                <span className="burger-icon-mid" />
                <span className="burger-icon-bottom" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
