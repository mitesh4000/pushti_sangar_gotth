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
  const [CustomerInfo, setCustomerInfo] = useState({ username: '' });
  // const [UpdatedCustomerInfo, setUpdatedCustomerInfo] = useState({});

  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const handleChange = (e) => {
    // Update the username in the state when the input changes
    setCustomerInfo({ ...CustomerInfo, username: e.target.value });
  };

  const passwordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string().required("New Password is required"),
  });

  const handleSignout = async () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("loggedIn");
    console.log("authToken Removed");
    
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const updateResult = await UpdateCustomer(id, CustomerInfo.username);
      console.log(updateResult);
      if (updateResult.success) {
        // Update the state with the new username
        setCustomerInfo(updateResult.customer);
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

  console.log(CustomerInfo)

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
                      <Link to={`/my-order/${CustomerInfo._id}`}>My Orders</Link>
                    </li>
                    {/* <li>
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
                    </li> */}
                    <li>
                      <Link onClick={handleSignout} to="/">Logout</Link>
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
                      
                        
                          <form onSubmit={handleUsernameSubmit} >
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
            value={CustomerInfo.username}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="text-left">
        <button type="submit" className="default-btn">
          Update Now
          <span />
        </button>
      </div>
                          </form>
                       
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
