import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import SignContext from '../../contextAPI/Context/SignContext';
import styled from "styled-components";
import logo from "../../images/logo1.png";
const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-left: 220px;
`;


const Login = () => {
  const {
    loginCustomer,
    
  } = useContext(SignContext);
  const [errorBanner, setErrorBanner] = useState("");
  const [Success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate=useNavigate()
  

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (Values) => {
    const res = await loginCustomer(Values);
    // console.log(res);
    if (res.success) {
      window.localStorage.setItem("loggedIn", true);
      window.localStorage.setItem("authToken", res.token);
      navigate("/");
    } else {
      setErrorBanner(res.msg);
      setTimeout(() => {
        setErrorBanner("");
      }, 2000);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/')
  };

  return (
    <div>
      <Link to="/">
            <Logo className="nav-logo" src={logo} alt="logo" />
          </Link>
      {isModalOpen && (
        
        <div className="modal fade show" id="LoginRegister" style={{ display: 'block' }} aria-modal="true">

          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              {/* Modal body */}
              <div className="modal-body">
                <div className="login-part" style={{ display: 'block' }}>
                  <button type="button" className="close" data-dismiss="modal" onClick={closeModal}>
                    ×
                  </button>
                  
                  <Formik
                   initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={validationSchema}
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
                        <div className="row m-0">
                          <div className="col-md-12 col-lg-8">
                            <div className="lr-details">
                              <h5>Sign in to PushtiShangar</h5>
                              {errorBanner && (
                                <div class="alert alert-danger" role="alert">
                                  {errorBanner}
                                </div>
                              )}
                              <div className="billing-details mt-4">
                                <div className="form-group">
                                  <Field type="text" name="email"  onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.email} className="form-control login-input" placeholder="Email Address *" />
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
                              <div className="forogotlink">
                                <Link className="forgotlinking forgot_password" id to="/forgot-password">
                                  Forgot Password?
                                </Link>
                              </div>
                              <div className="text-center mt-3">
                                <button type="submit" className="default-btn w-50" disabled={isSubmitting}>
                                  Sign In
                                  <span />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-4 flex-col img-part">
                            <div className="login-white-container">
                              <h1>Hello !</h1>
                              <p>Unlock a personalized shopping experience by joining us now.</p>
                              <div className="register">
                                <Link className="createlinking register_button" to="/signup" id>
                                  Sign Up
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
