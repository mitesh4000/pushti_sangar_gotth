import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SignContext from "../../contextAPI/Context/SignContext";
import logo from "../../images/logo1.png";
const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-left: 220px;
`;

const Signup = () => {
  const { createCustomer } = useContext(SignContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [ConfirmpasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [errorBanner, setErrorBanner] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleSignupSubmit = async (Values) => {
    const res = await createCustomer(Values);
    // console.log(res);
    if (res.success) {
      navigate("/login");
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string()
      .required("Mobile Number is required")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  });

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div>
      {isModalOpen && (
        <div
          className="modal fade show"
          id="LoginRegister"
          style={{ display: "block" }}
          aria-modal="true"
        >
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            style={{ right: 10, left: "auto" }}
            onClick={closeModal}
          >
            ×
          </button>
          <Link to="/">
            <Logo className="nav-logo" src={logo} alt="logo" />
          </Link>
          <div className="modal-dialog modal-lg">
            <h2>Sign up </h2>
            <div className="modal-content">
              <div className="modal-body">
                <div className="register-part">
                  <Formik
                    initialValues={{
                      username: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      phone: "",
                    }}
                    validationSchema={validationSchema}
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
                                placeholder="Username *"
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
                                {errors.email && touched.email && errors.email}
                              </p>
                            </div>
                            <div className="form-group col-md-6">
                              <Field
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                className="form-control"
                                placeholder="Password *"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                              />
                              <div className={`eye-icon-container text-end`}>
                                <p
                                  className={`bi ${
                                    passwordVisible ? "bi-eye" : "bi-eye-slash"
                                  } eye-icon text-end me-2`}
                                  onClick={() =>
                                    setPasswordVisible(!passwordVisible)
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
                                  ConfirmpasswordVisible ? "text" : "password"
                                }
                                name="confirmPassword"
                                className="form-control"
                                placeholder="Confirm Password *"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                              />
                              <div className={`eye-icon-container text-end`}>
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
                                {errors.phone && touched.phone && errors.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div><p>Go back to Login ? <Link to="/login">Login</Link></p></div>
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
      )}
    </div>
  );
};

export default Signup;
