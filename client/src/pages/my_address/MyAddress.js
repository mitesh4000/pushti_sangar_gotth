import React, { useState } from 'react';
import './MyAddress.css';
import Header from '../../components/Header';
import MidFooter from '../../components/MidFooter';
import { Link } from 'react-router-dom';
import MobileSidebar from '../../components/MobileSidebar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from "react-select"; // Make sure to import the Select component if not already imported

const options = [
  { value: "Gujarat", label: "Gujarat" },
  { value: "Delhi", label: "Delhi" },
  { value: "Goa", label: "Goa" },
];

const countryoptions = [
  { value: "India", label: "India" },
];

const MyAddress = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    streetAddress: Yup.string().required('Street Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State/Province is required'),
    zipCode: Yup.string().required('ZIP/Postal Code is required'),
    country: Yup.string().required('Country is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log('Form values:', values);
    },
  });

  return (
    <div>
      <Header />
      <MobileSidebar />
      <section className="pt-4 vmobile-tag-kl">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center fs-4"> My Addresses</h3>
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
                  <ul className='text-start'>
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
                <div className="part-1 ">
                  <div className="row">
                    <div className="col-md-12 col-lg-12">
                      <div className="cart-buttons">
                        <h5 className='text-start'>Adreess Information  <Link to="#" className="default-btn few-add ml-3">Add New <span /> </Link></h5>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-md-6">
                          <div className="billing-details save-address">
                            <h5>Rushil Patel  <span className="deafult-add">Default</span> </h5>
                            <p>projects@barodaweb.net</p>
                            <p>+91 9824281021</p>
                            <p>Darpan Apartment, 305, next to Express Hotel, Alkapuri, Vadodara, Gujarat 390005</p>
                            <p>
                              <Link to="/my-address">Edit Address</Link>
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="billing-details save-address">
                            <h5>Rushil Patel </h5>
                            <p>projects@barodaweb.net</p>
                            <p>+91 9824281021</p>
                            <p>Darpan Apartment, 305, next to Express Hotel, Alkapuri, Vadodara, Gujarat 390005</p>
                            <p>
                              <Link to="/my-address">Edit Address</Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="part-2">
                  <div className="row">
                    <div className="col-md-12 col-lg-6">
                      <h5>Account Information</h5>
                      <hr />
                      <div className="billing-details">
                        <div className="form-group">
                          <label>
                            FIRST NAME
                            <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                          />
                          {formik.touched.firstName && formik.errors.firstName ? (
                            <div className="error">{formik.errors.firstName}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label>
                            LAST NAME
                            <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                          />
                          {formik.touched.lastName && formik.errors.lastName ? (
                            <div className="error">{formik.errors.lastName}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label>
                            PHONE NUMBER 
                            <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                          />
                          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                            <div className="error">{formik.errors.phoneNumber}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 col-lg-6">
                      <h5>Address</h5>
                      <hr />
                      <div className="billing-details">
                        <div className="form-group">
                          <label>
                            STREET ADDRESS 
                            <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="streetAddress"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.streetAddress}
                          />
                          {formik.touched.streetAddress && formik.errors.streetAddress ? (
                            <div className="error">{formik.errors.streetAddress}</div>
                          ) : null}
                          <input
                            type="text"
                            className="form-control mt-3"
                            name="addressLine2"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.addressLine2}
                          />
                          <input
                            type="text"
                            className="form-control mt-3"
                            name="addressLine3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.addressLine3}
                          />
                        </div>
                        <div className="form-group">
                          <label>
                            CITY
                            <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                          />
                          {formik.touched.city && formik.errors.city ? (
                            <div className="error">{formik.errors.city}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label>
                            STATE/PROVINCE
                            <span className="required">*</span>
                          </label>
                          <div>
                            <Select
                              defaultValue={selectedOption}
                              onChange={setSelectedOption}
                              options={options}
                              placeholder="State"
                            />
                          </div>
                          {formik.touched.state && formik.errors.state ? (
                            <div className="error">{formik.errors.state}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label>
                            ZIP/POSTAL CODE
                            <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="zipCode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.zipCode}
                          />
                          {formik.touched.zipCode && formik.errors.zipCode ? (
                            <div className="error">{formik.errors.zipCode}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label>
                            COUNTRY
                            <span className="required">*</span>
                          </label>
                          <div>
                            <Select
                              defaultValue={selectedOption}
                              onChange={setSelectedOption}
                              options={countryoptions}
                              placeholder="Country"
                            />
                          </div>
                          {formik.touched.country && formik.errors.country ? (
                            <div className="error">{formik.errors.country}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="text-left">
                        <button type="submit" className="default-btn">
                          Save Address
                          <span />
                        </button>
                      </div>
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

export default MyAddress;
