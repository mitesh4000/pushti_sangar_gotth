import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
 const navigate=useNavigate()
 
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    mobileNumber: Yup.string().required('Mobile Number is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here
    console.log(values);
    setSubmitting(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/')
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal fade show" id="LoginRegister" style={{ display: 'block' }} aria-modal="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-body">
                <div className="register-part">
                  <button type="button" className="close" data-dismiss="modal" style={{ right: 10, left: 'auto' }} onClick={closeModal}>
                    ×
                  </button>
                  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="row m-0">
                          <div className="col-md-12 col-lg-4 flex-col img-part">
                            <div className="login-white-container">
                              <h1>Welcome Back!</h1>
                              <p>To be connected with us, please login with your personal info.</p>
                              <div className="register">
                                <Link className="createlinking login_button" to="/login" id>
                                  Sign In
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-8">
                            <div className="lr-details">
                              <h5>Create Account</h5>
                              <div className="billing-details mt-4">
                                <div className="row">
                                  <div className="form-group col-md-6">
                                    <Field type="text" name="firstName" className="form-control" placeholder="First Name *" />
                                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <Field type="text" name="lastName" className="form-control" placeholder="Last Name *" />
                                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <Field type="text" name="email" className="form-control" placeholder="Email Address *" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <Field type="password" name="password" className="form-control" placeholder="Password *" />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <Field type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password *" />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <Field type="text" name="mobileNumber" className="form-control" placeholder="Mobile Number *" />
                                    <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
                                  </div>
                                </div>
                              </div>
                              <div className="text-center mt-3">
                                <button type="submit" className="default-btn w-50" disabled={isSubmitting}>
                                  Submit Here
                                  <span />
                                </button>
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

export default Signup;
