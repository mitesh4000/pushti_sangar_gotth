import { Formik } from "formik";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Subscribe from "../../components/Subscribe";
import MidFooter from "../../components/MidFooter";
import Featured from "../../components/Featured";
import Header from "../../components/Header";
// import ContactImg from "./../../images/contact-us-img.jpg";
import "./contactUs.css";
import MobileSidebar from "../../components/MobileSidebar";

const ContactUs = () => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    phoneNumber: Yup.string()
      .required("Phone number  is a required field")
      .min(10, "Phone number must be at least 10 characters")
      .max(12, "Phone number must be at least 12 characters"),
    name: Yup.string().required("Please enter your name !!!"),
    subject: Yup.string().required("Please enter your subject !!!"),
    message: Yup.string().required("Please enter your message !!!"),
  });
  return (
    <React.Fragment>
      <Header />
      <MobileSidebar/>
      <div className="page-header breadcrumb-wrap">
        <div className="container">
          <div className="breadcrumb">
            <Link className="homeLink" to="/" rel="nofollow">
              <i className="fi-rs-home ">
                <AiOutlineHome />
              </i>
              Home
            </Link>
          
            <AiOutlineRight className="rightIcon" /> Contact
          </div>
        </div>
      </div>
      <Container>
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-8" style={{justifyContent : 'center'}}>
            <div className="contact-from-area ">
              <h5 className="contactFormTitle">Contact form</h5>
              <h2 className="contactSubTitle">Drop Us a Line</h2>
              <p className="text-muted  font-sm">
                Your email address will not be published. Required fields are
                marked *
              </p>

              <Formik
                validationSchema={schema}
                initialValues={{
                  email: "",
                  phoneNumber: "",
                  name: "",
                  subject: "",
                  message: "",
                }}
                onSubmit={(values) => {
                  // Alert the input values of the form that we filled
                  alert(JSON.stringify(values));
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <div className="login">
                    <div className="form">
                      {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                      <form noValidate onSubmit={handleSubmit}>
                        <Row>
                          <Col lg="6" md="6" sm="12">
                            <div className="input-style mb-20">
                              <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder="Enter your name*"
                                className="inputLable"
                                id="name"
                              />
                              {/* If validation is not passed show errors */}
                              <p className="error">
                                {errors.name && touched.name && errors.name}
                              </p>
                            </div>
                          </Col>
                          <Col lg="6" md="6" sm="12">
                            <div className="input-style mb-20">
                              <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="Enter email id / username*"
                                className="inputLable"
                                id="email"
                              />
                              {/* If validation is not passed show errors */}
                              <p className="error">
                                {errors.email && touched.email && errors.email}
                              </p>
                            </div>
                          </Col>
                          <Col lg="6" md="6" sm="12">
                            <div className="input-style mb-20">
                              <input
                                type="text"
                                name="phoneNumber"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phoneNumber}
                                placeholder="Your Phone*"
                                className="inputLable"
                                id="phoneNumber"
                              />
                              {/* If validation is not passed show errors */}
                              <p className="error">
                                {errors.phoneNumber &&
                                  touched.phoneNumber &&
                                  errors.phoneNumber}
                              </p>
                            </div>
                          </Col>
                          <Col lg="6" md="6" sm="12">
                            <div className="input-style mb-20">
                              <input
                                type="text"
                                name="subject"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.subject}
                                placeholder="Subject*"
                                className="inputLable"
                                id="subject"
                              />
                              {/* If validation is not passed show errors */}
                              <p className="error">
                                {errors.subject &&
                                  touched.subject &&
                                  errors.subject}
                              </p>
                            </div>
                          </Col>
                          <Col className="col-lg-12 col-md-12">
                            <div className="textarea-style">
                              <textarea
                                type="text"
                                name="message" // Make sure the name matches the schema
                                value={values.message} // Connect to Formik values
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Message*"
                                className="textareaContactus"
                                rows={4}
                                cols={40}
                              />
                               <p className="error">
                                {errors.message &&
                                  touched.message &&
                                  errors.message}
                              </p>
                            </div>
                          </Col>
                        </Row>

                        <button type="submit">Send Message</button>
                      </form>
                    </div>
                  </div>
                )}
              </Formik>
              <p className="form-messege" />
            </div>
          </div>
        </div>
          {/* <div className="col-lg-4  col-md-6 pl-50 d-lg-block d-none">
            <img className="border-radius-15 mt-50" src='' alt />
          </div> */}
          
      </Container>

      <Subscribe />
      <Featured />
      {/* <Container>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.149542991973!2d73.16583817442529!3d22.31018344253875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf3fc43dfdeb%3A0x86ed8bbfb2c6c9ea!2sBarodaweb!5e0!3m2!1sen!2sin!4v1694838393547!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          style={{ margin: "40px 0px" }}
        ></iframe>
      </Container> */}
      <MidFooter />
    </React.Fragment>
  );
};

export default ContactUs;
