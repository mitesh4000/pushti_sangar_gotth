import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import Select from "react-select";
import axios from "axios";
import logo2 from "../images/logo1.png";
import logo from "../images/favIcon.png";
// import smallImage from "../images/small-image-2.jpg";
// import smallsangar from "../images/smallsanagr.jpg";
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
  { value: "Fibre Items", label: "Fibre Items" },
  { value: "Seasonal Products", label: "Seasonal Products" },
];

const Header = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [username, setUsername] = useState("");
  const [CartData, setCartData] = useState([]);
  const {
    createCustomer,
    loginCustomer,
    getLoggedInCustomer,
    GetLoggedInCartItems,
    removeItemFromCart,
    forgotCustomerPassword,
    getCategories,
    GetsubandsubSubcategory,
    OpenLoginModal,
    setOpenLoginModal,
  } = useContext(SignContext);
  const authToken = localStorage.getItem("authToken");
  const [isCartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [CategoryData, setCategoryData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [ConfirmpasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isAccountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [CustomerInfo, setCustomerInfo] = useState({});
  const [Error, setError] = useState("");
  const [errorBanner, setErrorBanner] = useState("");
  const [tag, setTag] = useState("");
  const [products, setProducts] = useState([]);
  const [Success, setSuccess] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [buttonText, setButtonText] = useState("Show More...");
  const [isMegaMenuDropdownOpen, setMegaMenuDropdownOpen] = useState(false);

  
  // const [showLoginModal, setOpenLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleTagsSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}/product/getproductbytags?tag=${tag}`
      );
      const { success, products } = response.data;
      console.log(response.data);
      if (success) {
        setProducts(products);
      } else {
        setProducts([]);
      }
      setShowDropdown(success && products.length > 0);
    } catch (error) {
      console.error(error);
      setProducts([]);
      setShowDropdown(false);
    }
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

  const getLoggedinCustomerCart = async (CustomerId) => {
    const res = await GetLoggedInCartItems(CustomerId);
    // console.log("get cart", res);
    if (res.success) {
      setCartData(res.cartItems);
    }
  };

  const handleRemoveItemFromCart = async (productId) => {
    try {
      const customerId = CustomerInfo._id;
      const res = await removeItemFromCart(customerId, productId);
      // console.log(productId)
      if (res.success) {
        console.log("Cart updated successfully");
      } else {
        console.error(res.msg);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleSignout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("loggedIn");
    console.log("authToken Removed");
  };

  const handleModalClose = () => {
    setOpenLoginModal(false);
  };
  const handleLoginClick = () => {
    setOpenLoginModal(true);
    setShowSignupModal(false);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
    setOpenLoginModal(false);
    setShowForgotPasswordModal(false);
  };

  const handleSignupModalClose = () => {
    setShowSignupModal(false);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
    setOpenLoginModal(false);
    setShowSignupModal(false);
  };

  const handleForgotPasswordModalClose = () => {
    setShowForgotPasswordModal(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryHover = async (categoryId) => {
    setCategoryDropdownOpen(true);
    const data = await GetsubandsubSubcategory(categoryId);
    console.log(data.categoriesWithSubCategoriesAndSubSubCategories);
    setSelectedCategory(data.categoriesWithSubCategoriesAndSubSubCategories);
    
  };
  const handleCategoryLeave = () => {
    setCategoryDropdownOpen(false);
  };

  const handleMegaMenuHover = () => {
    setMegaMenuDropdownOpen(true);
    setIsOpen(true);
  };
  const handleMegaMenuLeave = () => {
    setMegaMenuDropdownOpen(false);
    
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

  

  // Validation schemas
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .required("Email is required"),
  });

  const signupSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string()
      .required("Mobile Number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
  });

  const handleLogin = async (Values) => {
    const res = await loginCustomer(Values);
    // console.log(res);
    if (res.success) {
      window.localStorage.setItem("loggedIn", true);
      window.localStorage.setItem("authToken", res.token);
      window.localStorage.setItem("username", res.customer.username);
      handleModalClose();
    } else {
      setErrorBanner(res.msg);
      setTimeout(() => {
        setErrorBanner("");
      }, 2000);
    }
  };

  const handleForgotPasswordSubmit = async (Values) => {
    try {
      const res = await forgotCustomerPassword(Values);
      console.log(res);

      if (res.success) {
        setSuccess(res.msg);
        setTimeout(() => {
          setSuccess("");
        }, 1000);
      } else {
        setError(res.msg);
        setTimeout(() => {
          setError("");
        }, 1000);
      }
    } catch (error) {
      // Handle any unexpected errors here
      console.error("An error occurred:", error);
      setError("An unexpected error occurred.");
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

  const Getcategories = async () => {
    // Fetch CategoryData here
    const res = await getCategories();

    if (res !== undefined) {
      const transformedData = res.map((category, index) => ({
        ...category,
        id: index + 1,
      }));
      setCategoryData(transformedData);

      // Find the option in the options array that matches the CategoryData.name
      const selected = options.find(
        (option) => option.label === transformedData.name
      );

      if (selected) {
        setSelectedOption(selected);
      }
    }
  };

  useEffect(() => {
    GetLoggedInCustomer(authToken);
    getLoggedinCustomerCart(CustomerInfo._id);
    Getcategories();
    const getStoredUsername = () => {
      const storedUsername = window.localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    getStoredUsername();
  }, [CustomerInfo._id , selectedCategory]);


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

            {OpenLoginModal && (
              <div
                className="modal fade show modal-backdrop-opacity"
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
                              {errorBanner && (
                                <div class="alert alert-danger" role="alert">
                                  {errorBanner}
                                </div>
                              )}
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
                                        <div className="password-input-container">
                                          <Field
                                            type={
                                              passwordVisible
                                                ? "text"
                                                : "password"
                                            }
                                            name="password"
                                            id="password-input"
                                            className="form-control login-input"
                                            placeholder="Password *"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                          />
                                          <span>
                                            <i className="bx bxs-lock bi bi-lock-fill" />
                                          </span>
                                        </div>
                                        <div
                                          className={`eye-icon-container text-end`}
                                        >
                                          <p
                                            className={`bi ${
                                              passwordVisible
                                                ? "bi-eye"
                                                : "bi-eye-slash"
                                            } eye-icon text-end`}
                                            onClick={() =>
                                              setPasswordVisible(
                                                !passwordVisible
                                              )
                                            }
                                          ></p>
                                        </div>
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
                              <h1>Hello!</h1>
                              <p className="text-center mt-2">
                                Unlock a personalized shopping experience by
                                joining us now.
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
                className="modal fade show modal-backdrop-opacity"
                id="LoginRegister"
                style={{ display: "block", paddingRight: 17 }}
                aria-modal="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    {Success && (
                      <div class="alert alert-success" role="alert">
                        {Success}
                      </div>
                    )}
                    {Error && (
                      <div className="alert alert-danger" role="alert">
                        {Error}
                      </div>
                    )}
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
                              <h1>Hello!</h1>
                              <p className="text-center mt-2">
                                Unlock a personalized shopping experience by
                                joining us now.
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
                className="modal fade show modal-backdrop-opacity"
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
                              <p className="text-center mt-2">
                                Log in to continue shopping and managing your
                                account.
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
                                            placeholder="Full Name *"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                          />
                                          <p className="error text-danger">
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
                                          <p className="error text-danger">
                                            {errors.email &&
                                              touched.email &&
                                              errors.email}
                                          </p>
                                        </div>
                                        <div className="form-group col-md-6">
                                          <Field
                                            type={
                                              passwordVisible
                                                ? "text"
                                                : "password"
                                            }
                                            name="password"
                                            className="form-control"
                                            placeholder="Password *"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                          />
                                          <div
                                            className={`eye-icon-container text-end`}
                                          >
                                            <p
                                              className={`bi ${
                                                passwordVisible
                                                  ? "bi-eye"
                                                  : "bi-eye-slash"
                                              } eye-icon text-end me-2`}
                                              onClick={() =>
                                                setPasswordVisible(
                                                  !passwordVisible
                                                )
                                              }
                                            ></p>
                                          </div>
                                          <p className="error text-danger">
                                            {errors.password &&
                                              touched.password &&
                                              errors.password}
                                          </p>
                                        </div>
                                        <div className="form-group col-md-6">
                                          <Field
                                            type={
                                              ConfirmpasswordVisible
                                                ? "text"
                                                : "password"
                                            }
                                            name="confirmPassword"
                                            className="form-control"
                                            placeholder="Confirm Password *"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.confirmPassword}
                                          />
                                          <div
                                            className={`eye-icon-container text-end`}
                                          >
                                            <p
                                              className={`bi ${
                                                ConfirmpasswordVisible
                                                  ? "bi-eye"
                                                  : "bi-eye-slash"
                                              } eye-icon text-end me-2`}
                                              onClick={() =>
                                                setConfirmPasswordVisible(
                                                  !ConfirmpasswordVisible
                                                )
                                              }
                                            ></p>
                                          </div>
                                          <p className="error text-danger">
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
                                          <p className="error text-danger">
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
                <form onSubmit={handleTagsSearch}>
                  <div style={{ width: "300px" }}>
                    <Select
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={options}
                      placeholder="Search"
                    />
                  </div>

                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Search for items..."
                  />
                  <button className="btn" ty>
                  {tag ? (
    <Link to={`/bytags/${tag}`}>
      Search...
    </Link>
  ) : (
    <span>Search...</span>
  )}
                  </button>
                </form>
                {/* {showDropdown && (
                  <ul className="search-list">
                    {products ? (
                      products.map((product) => (
                        <Link
                          to={`/product-details/${product._id}`}
                          key={product._id}
                        >
                          <li>{product.name}</li>
                        </Link>
                      ))
                    ) : (
                      <></>
                    )}
                  </ul>
                )} */}
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
                          {CartData ? CartData.length : null}
                        </span>
                      </Link>
                      <Link to="#">
                        <span className="lable">Cart</span>
                      </Link>
                      {isCartDropdownOpen && (
                        <div className="cart-dropdown-wrap cart-dropdown-hm2">
                          <ul>
                          {CartData
  ? CartData.map((item) => (
      <li key={item.product._id}>
        {item.product && item.product.name && (
          <>
            <div className="shopping-cart-img">
              <Link to="#">
                <img
                  alt="cart"
                  src={`${url}/products/${item.product.imageGallery && item.product.imageGallery[0] ? item.product.imageGallery[0] : 'default-image.jpg'}`}
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
                  handleRemoveItemFromCart(item.product._id);
                }}
              >
                <i className="fi-rs-cross-small bi bi-x" />
              </Link>
            </div>
          </>
        )}
      </li>
    ))
  : null}
                          </ul>
                          <div className="shopping-cart-footer">
                            {/* <div className="shopping-cart-total">
                              <h4 className="d-flex justify-content-between">
                                <span>Total</span> <span>{totalPrice}</span>
                              </h4>
                            </div> */}
                            <div className="shopping-cart-button">
                              {CartData.length > 0 ? (
                                <>
                                  <Link to={`/cart/${CustomerInfo._id}`}>
                                    View cart
                                  </Link>
                                  <Link to={`/checkout/${CustomerInfo._id}`}>
                                    Checkout
                                  </Link>
                                </>
                              ) : (
                                <h4 className="text-center text-danger">
                                  Your cart is empty
                                </h4>
                              )}
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
                // onMouseLeave={handleCategoryLeave}
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
                  <div className="categories-dropdown-wrap categories-dropdown-active-large font-heading" onMouseEnter={ handleMegaMenuHover}
                  onMouseLeave={ handleMegaMenuLeave}>
                    <div className="d-flex categori-dropdown-inner">
                      <ul>
                        {CategoryData.map((category, index) => (
                          <li key={index} onMouseEnter={() => handleCategoryHover(category._id)}>
                            <Link to={`/product-list/${category._id}`}>
                              {" "}
                              <img src={`${url}/cagtegory/${category.image}`} alt="" />
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                  </div>
                  
                )}
                {isMegaMenuDropdownOpen && (
  <div className="submenu d-flex ">
    <div className="menu-title">{selectedCategory ? selectedCategory.subCategoryName : null}</div>
    <ul>
      {selectedCategory && selectedCategory.subSubCategories
        ? selectedCategory.subSubCategories.map((subSubCategory) => (
            <li key={subSubCategory.id}>
              <Link to={`/product-list/${subSubCategory.id}`}>
                {subSubCategory.name}
              </Link>
            </li>
          ))
        : null}
    </ul>
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

                    <li>
                      <Link className="" to="/blogcategories">
                        Blog{" "}
                      </Link>
                    </li>
                    <li>
                      <Link to="/gallery">Gallery</Link>
                    </li>
                    <li>
                      <Link to="/contact-us">Contact</Link>
                    </li>
                    <li>
                      <Link to="/shop">Shop</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="hotline d-none d-lg-flex">
              <div className="me-3 mt-1">
                {authToken ? <p>Jay Shree Krishna , {username?username:null}</p> : <p>Jay Shree Krishna</p>}
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
