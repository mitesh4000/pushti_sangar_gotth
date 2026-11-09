import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate=useNavigate()
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // You can handle the login logic here
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
              {/* Modal body */}
              <div className="modal-body">
                <div className="login-part" style={{ display: 'block' }}>
                  <button type="button" className="close" data-dismiss="modal" onClick={closeModal}>
                    ×
                  </button>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="row m-0">
                          <div className="col-md-12 col-lg-8">
                            <div className="lr-details">
                              <h5>Sign in to PushtiShangar</h5>
                              <div className="billing-details mt-4">
                                <div className="form-group">
                                  <Field type="text" name="email" className="form-control login-input" placeholder="Email Address *" />
                                  <ErrorMessage name="email" component="div" className="text-danger" />
                                  <span>
                                    <i className="bx bx-user-circle bi bi-person-circle" />
                                  </span>
                                </div>
                                <div className="form-group">
                                  <Field type="password" name="password" className="form-control login-input" placeholder="Password *" />
                                  <ErrorMessage name="password" component="div" className="text-danger" />
                                  <span>
                                    <i className="bx bxs-lock bi bi-lock-fill" />
                                  </span>
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
                              <h1>Hello, friend!</h1>
                              <p>Enjoy your personal details and start your journey with us.</p>
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
