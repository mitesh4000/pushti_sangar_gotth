import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import MidFooter from "../../components/MidFooter";
import { Link, useParams } from "react-router-dom";
import MobileSidebar from "../../components/MobileSidebar";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import SignContext from "../../contextAPI/Context/SignContext";

const MyProfile = () => {
  const { id } = useParams();
  const { getLoggedInCustomer, UpdateCustomer, changePassword } =
    useContext(SignContext);
  const authToken = localStorage.getItem("authToken");
  const [CustomerInfo, setCustomerInfo] = useState({});

  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const usernameValidationSchema = Yup.object().shape({
    username: Yup.string().required("User Name is required"),
  });

  const passwordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string().required("New Password is required"),
  });

  const handleUsernameSubmit = async (values) => {
    try {
      const updateResult = await UpdateCustomer(id, values);
      console.log(updateResult);
      if (updateResult.success) {
        // Update the state with the new username
        setCustomerInfo((prevInfo) => ({
          ...prevInfo,
          username: values.username,
        }));
      } else {
        // Handle the case where the update fails
        console.error(updateResult.msg);
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  const handlePasswordSubmit = async (values, { setSubmitting , resetForm }) => {
    try {
      const passwordResult = await changePassword(
        { oldPassword: values.oldPassword, newPassword: values.newPassword },
        id,
        authToken
      );
  
      if (passwordResult.success) {
        // Handle success, e.g., show a success message
        console.log("Password updated successfully");
        resetForm();
      } else {
        // Handle the case where the password update fails
        console.error(passwordResult.msg);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
      setSubmitting(false);
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

  useEffect(() => {
    GetLoggedInCustomer(authToken);
  }, [authToken]);

  return (
    <div>
      <Header />
      <MobileSidebar />
      <section className="pt-4 vmobile-tag-kl">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center fs-4"> My Profile </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="blog-area ptb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <aside className="widget-area" id="secondary">
                <section className="widget widget_categories with-my">
                  <h3 className="widget-title text-start">Account Dashboard</h3>
                  <ul className="text-start">
                    <li>
                      <Link to="/my-account">My Account</Link>
                    </li>
                    <li>
                      <Link to="/my-order">My Orders</Link>
                    </li>
                    <li>
                      <Link to="/my-address">My Addresses</Link>
                    </li>
                    <li>
                      <Link to="/my-profile">My Profile</Link>
                    </li>
                    <li>
                      <Link to="/track-order">Track Order</Link>
                    </li>
                    <li>
                      <Link to="/ticket-support">Support Ticket</Link>
                    </li>
                    <li>
                      <Link to="/">Logout</Link>
                    </li>
                  </ul>
                </section>
              </aside>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="my-desc">
                <div className="part-1">
                  <div className="row">
                    <div className="col-md-6 col-lg-6">
                      <h5 className="text-start">Account Information</h5>
                      <hr />
                      <Formik
                        initialValues={{
                          username: "",
                        }}
                        validationSchema={usernameValidationSchema}
                        onSubmit={async (values, { resetForm }) => {
                          await handleUsernameSubmit(values);
                          // resetForm();
                          // togglemodal();
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
                            <div className="billing-details">
                              <div className="form-group">
                                <label>
                                  USER NAME
                                  <span className="required">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="username"
                                  className="form-control"
                                  value={values.username}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                                <p className="error text-danger">
                                  {errors.username &&
                                    touched.username &&
                                    errors.username}
                                </p>
                              </div>
                              {/* <div className="form-group">
                                <label>
                                  LAST NAME
                                  <span className="required">*</span>
                                </label>
                                <Field type="text" name="lastName" className="form-control" />
                                <ErrorMessage name="lastName" component="div" className="text-danger" />
                              </div> */}
                            </div>
                            <div className="text-left">
                              <button
                                type="submit"
                                className="default-btn"
                                disabled={isSubmitting}
                              >
                                Update Now
                                <span />
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                    <div className="col-md-6 col-lg-6">
                      <h5 className="text-start">Change Password</h5>
                      <hr />
                      <Formik
                        initialValues={initialValues}
                        validationSchema={passwordValidationSchema}
                        onSubmit={handlePasswordSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <div className="billing-details">
                              <div className="form-group">
                                <label>
                                  OLD PASSWORD
                                  <span className="required">*</span>
                                </label>
                                <Field
                                  type="password"
                                  name="oldPassword"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="newPassword"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="form-group">
                                <label>
                                   NEW PASSWORD
                                  <span className="required">*</span>
                                </label>
                                <Field
                                  type="password"
                                  name="newPassword"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="confirmNewPassword"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                              <div className="text-left">
                                <button
                                  type="submit"
                                  className="default-btn"
                                  disabled={isSubmitting}
                                >
                                  Update Now
                                  <span />
                                </button>
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
          </div>
        </div>
      </section>
      <MidFooter />
    </div>
  );
};

export default MyProfile;
