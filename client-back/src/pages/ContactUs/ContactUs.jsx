import { Formik } from "formik";
import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineHome, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Subscribe from "../../components/Subscribe";
import MidFooter from "../../components/MidFooter";
import Featured from "../../components/Featured";
import Header from "../../components/Header";
import "./contactUs.css";
import MobileSidebar from "../../components/MobileSidebar";
import SignContext from "../../contextAPI/Context/SignContext";
import Swal from 'sweetalert2';

const ContactUs = () => {
  const {  AddContact } = useContext(SignContext);

  const handleSavedContact = async (Values) => {
    const res = await AddContact(Values);
    if (res.success) {
      Swal.fire({
        icon: 'success',
        title: 'Contact added successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
      
    }
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    phone: Yup.string()
      .required("Phone number  is a required field").matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    name: Yup.string().required("Please enter your name !!!"),
    subject: Yup.string().required("Please enter your subject !!!"),
    message: Yup.string().required("Please enter your message !!!"),
  });


  return (
    <React.Fragment>
      <Header />
      <MobileSidebar/>
      <div class="page-header breadcrumb-wrap">
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
            <div className="contact-from-area" style={{padding : "65px"}}>
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
                  phone: "",
                  name: "",
                  subject: "",
                  message: "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  await handleSavedContact(values);
                  resetForm();
                  // togglemodal();
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
                      <form onSubmit={handleSubmit}>
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
                                name="phone"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                placeholder="Your Phone*"
                                className="inputLable"
                                id="phoneNumber"
                              />
                              {/* If validation is not passed show errors */}
                              <p className="error">
                                {errors.phone &&
                                  touched.phone &&
                                  errors.phone}
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
          
          
      </Container>

      <Subscribe />
      <Featured />
      <MidFooter />
    </React.Fragment>
  );
};

export default ContactUs;
