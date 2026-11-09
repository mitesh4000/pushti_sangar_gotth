import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import "./Checkout.css";
import Header from "../../components/Header";
import MidFooter from "../../components/MidFooter";
import { Link, useParams } from "react-router-dom";
import MobileSidebar from "../../components/MobileSidebar";
import * as Yup from "yup";
import { Formik } from "formik";
import SignContext from "../../contextAPI/Context/SignContext";

const allStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
];

const stateOptions = allStates.map((state) => ({
  value: state,
  label: state,
}));

const countryOptions = [{ value: "India", label: "India" }];

const Checkout = () => {
  const { id } = useParams();
  const [selectedState, setSelectedState] = useState(null);
  const {
    getLoggedInCustomer,
    GetLoggedInCartItems,
    RemoveAllItemsFromCart,
    CreateOrder,
    GetallCoupons,
    GetCouponbyId,
  } = useContext(SignContext);
  const [CartData, setCartData] = useState([]);
  const [CustomerInfo, setCustomerInfo] = useState({});
  const authToken = localStorage.getItem("authToken");
  const [coupons, setCoupons] = useState([]);
  // const [appliedCoupon, setAppliedCoupon] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const GetLoggedInCustomer = async (token) => {
    const res = await getLoggedInCustomer(token);
    console.log(res);
    if (res.success) {
      setCustomerInfo(res.customer);
    } else {
      console.log(res.msg);
    }
  };

  const getLoggedinCustomerCart = async (CustomerId) => {
    const res = await GetLoggedInCartItems(CustomerId);
    console.log("get cart", res);
    if (res.success) {
      setCartData(res.cartItems);
    }
  };

  const Getcoupons = async () => {
    const res = await GetallCoupons();
    console.log(res);

    const transformedData = res.coupons.map((coupons, index) => ({
      ...coupons,
      id: index + 1,
    }));
    setCoupons(transformedData);
  };

  const handleApplyCoupon = async (couponId) => {
    const selectedCoupon = coupons.find((coupon) => coupon._id === couponId);
    setSelectedCoupon(selectedCoupon);

    // Apply the coupon discount to the total order amount
    let discount = 0;
    let discountedTotal = 0;

    if (selectedCoupon.type === "₹") {
      discount = selectedCoupon ? selectedCoupon.discount : 0;
      discountedTotal = tPwithGST - discount;
    } else {
      discount = selectedCoupon ? selectedCoupon.discount : 0;
      discountedTotal = tPwithGST - (tPwithGST * discount) / 100;
    }

    // Update the total amount with the discount
    setTotalAmount(discountedTotal);

    // Set the state to show the coupon applied popup
    setCouponApplied(true);
  };

  const handleRemoveAll = async () => {
    const res = await RemoveAllItemsFromCart(id);
    console.log("get cart", res);
    if (res.success) {
      setCartData(res.cartItems);
    }
  };

  const totalPrice = CartData
    ? CartData.reduce((acc, item) => {
        // Ensure that item.quantity and item.discountedPrice are valid numbers
        const quantity = parseFloat(item.quantity);
        const discountedPrice = parseFloat(
          item.product.prices.discounted
            ? item.product.prices.discounted
            : item.product.prices.calculatedPrice
        );

        // Check for NaN or invalid values
        if (isNaN(quantity) || isNaN(discountedPrice)) {
          return acc; // Skip this item if it has invalid data
        }

        return acc + quantity * discountedPrice;
      }, 0)
    : null;

  const tPwithGST = CartData
    ? CartData.reduce((acc, item) => {
        // Ensure that item.quantity and item.discountedPrice are valid numbers
        const quantity = parseFloat(item.quantity);
        const gst = parseFloat(item.tax);

        const discountedPrice = parseFloat(
          item.product.prices.discounted
            ? item.product.prices.discounted
            : item.product.prices.calculatedPrice
        );
        const totalPriceWithGST =
          quantity * discountedPrice + (quantity * discountedPrice * gst) / 100;
        // console.log(`Item: ${item.product.name}, Quantity: ${quantity}, Discounted Price: ${discountedPrice}, GST: ${gst}%, Total Price with GST: ${totalPriceWithGST}`);
        // Check for NaN or invalid values
        if (isNaN(quantity) || isNaN(discountedPrice)) {
          return acc; // Skip this item if it has invalid data
        }

        return acc + totalPriceWithGST;
      }, 0)
    : null;

  const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //   .required("Email is required")
    //   .email("Invalid email format"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    selectedCountry: Yup.object()
      .nullable(false)
      .required("Country is required"),
    selectedState: Yup.object().nullable(false).required("State is required"),
    city: Yup.string().required("Town / City is required"),
    postcode: Yup.string().required("Postcode / Zip is required"),
    phone: Yup.string().required("Phone is required"),
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      await GetLoggedInCustomer(authToken);
      getLoggedinCustomerCart(CustomerInfo._id);
    };

    fetchCustomerData();
    getLoggedinCustomerCart(CustomerInfo._id);
    Getcoupons();
  }, [CustomerInfo._id]);

  return (
    <div>
      <Header />
      <MobileSidebar />
      <section className="pt-4 ">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="text-center fs-3"> Checkout</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="checkout-area pt-4 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="user-actions text-start">
                <i className="flaticon-share bi bi-reply" />
                <span>
                  Returning customer?
                  <Link to="/login">Click here to login</Link>
                </span>
              </div>
            </div>
          </div>
          <Formik
            initialValues={{
              // email: CustomerInfo.email || "",
              firstName: "",
              lastName: "",
              address: "",
              selectedCountry: null,
              selectedState: null,
              city: "",
              postcode: "",
              phone: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const response = await CreateOrder({
                  customer: CustomerInfo._id,
                  FirstName: values.firstName,
                  LastName: values.lastName,
                  products: CartData.map((item) => ({
                    product: item.product._id,
                    quantity: item.quantity,
                  })),
                  totalAmount: tPwithGST ? tPwithGST.toFixed(2) : totalAmount,
                  // status: "pending",
                  country: values.selectedCountry.value,
                  state: values.selectedState.value,
                  city: values.city,
                  postCode: values.postcode,
                  shippingAddress: values.address,
                  couponCode: selectedCoupon ? selectedCoupon.name : null,
                  // paymentMethod: "Net Banking", // You might want to get this from the form
                  // ... (other fields)
                });
                if (response.success) {
                  // Order created successfully
                  console.log("Order", response);
                  alert(
                    "Order placed successfully! Invoice will send to you later"
                  );
                  handleRemoveAll();

                  resetForm();
                  // Redirect or show a success message
                  // Redirect to the order confirmation page
                } else {
                  // Handle the case where order creation failed
                  console.error("Error creating order:", response.msg);
                }
              } catch (error) {
                console.error("Error creating order:", error);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue, // Add setFieldValue
              setFieldTouched, // Add setFieldTouched
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-5 col-md-12">
                    <div className="billing-details cart-buttons mt-0">
                      <h3 className="title">Shipping Address</h3>

                      <div className="row" id>
                        {/* <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>
                              Email Address
                              <span className="required">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-control"
                              disabled
                            />
                            {errors.email && touched.email && (
                              <div className="text-danger">{errors.email}</div>
                            )}
                          </div>
                        </div> */}
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>
                              First Name
                              <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              value={values.firstName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-control"
                            />
                            {errors.firstName && touched.firstName && (
                              <div className="text-danger">
                                {errors.firstName}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>
                              Last Name
                              <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-control"
                            />
                            {errors.lastName && touched.lastName && (
                              <div className="text-danger">
                                {errors.lastName}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-6">
                          <div className="form-group">
                            <label>
                              Address
                              <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-control"
                            />
                            {errors.address && touched.address && (
                              <div className="text-danger">
                                {errors.address}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>
                              Country <span className="required">*</span>
                            </label>
                            <Select
                              value={values.selectedCountry}
                              onChange={(selectedOption) => {
                                setFieldValue(
                                  "selectedCountry",
                                  selectedOption
                                ); // Set the selected value
                                setFieldTouched("selectedCountry", true); // Mark field as touched
                              }}
                              options={countryOptions}
                              placeholder="Select Country"
                            />
                            {touched.selectedCountry &&
                              errors.selectedCountry && (
                                <p className="error">
                                  {errors.selectedCountry}
                                </p>
                              )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>
                              State <span className="required">*</span>
                            </label>
                            <Select
                              value={values.selectedState}
                              onChange={(selectedOption) => {
                                setFieldValue("selectedState", selectedOption); // Set the selected value using Formik
                                setFieldTouched("selectedState", true); // Mark field as touched to trigger validation
                              }}
                              options={stateOptions}
                              placeholder="Select State"
                            />
                            {touched.selectedState && errors.selectedState && (
                              <p className="error">{errors.selectedState}</p>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>
                              Town / City
                              <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-control"
                            />
                            {errors.city && touched.city && (
                              <div className="text-danger">{errors.city}</div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="form-group">
                            <label>
                              Postcode / Zip
                              <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              name="postcode"
                              value={values.postcode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-control"
                            />
                            {errors.postcode && touched.postcode && (
                              <div className="text-danger">
                                {errors.postcode}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12">
                          <div className="form-group">
                            <label>
                              Phone
                              <span className="required">*</span>
                            </label>
                            <input
                              type="text"
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-control"
                            />
                            {errors.phone && touched.phone && (
                              <div className="text-danger">{errors.phone}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12">
                    <div className="order-details">
                      <h3 className="title">Order Summary</h3>
                      <h5 className="mt-3 mb-3 fs-13">Use Coupon Code</h5>

                      {totalPrice > 10000 && (
                        <div id="cuponcode">
                          <div className="form-coupon checkout-login">
                            <div className="cart-buttons m-0">
                              <div className="shopping-coupon-code">
                                <select
                                  value={
                                    selectedCoupon ? selectedCoupon._id : ""
                                  }
                                  onChange={(e) =>
                                    handleApplyCoupon(e.target.value)
                                  }
                                >
                                  <option value="">Select a coupon</option>
                                  {coupons.map((coupon) => (
                                    <option
                                      key={coupon._id}
                                      value={coupon._id}
                                      disabled={
                                        new Date(coupon.expiry).getTime() <=
                                        Date.now()
                                      }
                                    >
                                      {coupon.name} -{" "}
                                      {new Date(
                                        coupon.expiry
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })}
                                      {new Date(coupon.expiry).getTime() <=
                                      Date.now()
                                        ? "  expired"
                                        : ""}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleApplyCoupon(selectedCoupon._id)
                                  }
                                >
                                  Apply Coupon
                                </button>
                              </div>
                              <div>
                                {selectedCoupon && (
                                  <div className="row mt-4">
                                    <div className="col-lg-12">
                                      <h5>Coupon Details</h5>
                                      <div className="row coupn_det">
                                        <div className="col-lg-6">
                                          <p>Name: {selectedCoupon.name}</p>
                                        </div>
                                        <div className="col-lg-6">
                                          <p>
                                            Discount: {selectedCoupon.discount}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* <h5>Coupon Details</h5>
                                    <p>Name: {selectedCoupon.name}</p>
                                    <p>Discount: {selectedCoupon.discount}</p> */}
                                    {/* <p>Type: {selectedCoupon.type}</p> */}
                                    {/* <p>
                                      Start:{" "}
                                      {new Date(
                                        selectedCoupon.start
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </p> */}
                                    {/* <p>Type: {selectedCoupon.start}</p> */}
                                    {/* <p>
                                      expiry:{" "}
                                      {new Date(
                                        selectedCoupon.expiry
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      })}
                                    </p> */}

                                    {/* Add more details as needed */}
                                  </div>
                                )}
                              </div>
                              <small>
                                Coupon code can also be applied at checkout
                                before payment.
                              </small>
                            </div>
                          </div>
                        </div>
                      )}
                      <hr />
                      {CartData && (
                        <h5 className="mt-3 mb-3 fs-13">
                          {CartData.length > 1
                            ? `${CartData.length} items in cart`
                            : `${CartData.length} item in cart`}
                        </h5>
                      )}
                      <div className="order-table table-responsive">
                        <table className="table table-bordered">
                          {/* <thead>
                            <tr>
                              <th scope="col">Product Name</th>
                              <th scope="col">QTY</th>
                              <th scope="col">Total</th>
                            </tr>
                          </thead> */}
                          <tbody>
                            {/* <tr>
                              <td className="product-name">
                                <Link to="#">Zari Product</Link>
                              </td>
                              <td className="product-name">2</td>
                              <td className="product-total">
                                <span className="subtotal-amount">
                                  ₹ 380.00
                                </span>
                              </td>
                            </tr> */}
                            <tr>
                              <td className="order-subtotal" colSpan={2}>
                                <span>Cart Subtotal</span>
                              </td>
                              <td className="order-subtotal-price">
                                <span className="order-subtotal-amount">
                                  ₹ {totalPrice}
                                </span>
                              </td>
                            </tr>
                            {/* Coupon Code */}

                            {selectedCoupon && (
                              <tr>
                                <td className="order-shipping" colSpan={2}>
                                  <span>Discount </span>
                                </td>
                                <td className="shipping-price">
                                  <span>
                                    {selectedCoupon?selectedCoupon.discount : null}
                                    
                                    {selectedCoupon.type?selectedCoupon.type : null}{" "}
                                  </span>
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td className="total-price" colSpan={2}>
                                <span>Order Total</span>
                              </td>
                              <td className="product-subtotal">
                                <span className="subtotal-amount">
                                  ₹ {tPwithGST.toFixed(2) ? tPwithGST.toFixed(2)  : totalAmount}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="payment-box">
                        <div className="payment-method">
                          {/* <p>
                            <input
                              type="radio"
                              id="direct-bank-transfer"
                              name="radio-group"
                              defaultChecked
                              className="me-2"
                            />
                            <label htmlFor="direct-bank-transfer">
                              Net Banking
                            </label>
                          </p>
                          <p>
                            <input
                              type="radio"
                              id="paypal"
                              name="radio-group"
                              className="me-2"
                            />
                            <label htmlFor="paypal">PayPal</label>
                          </p> */}
                          <p>
                            <input
                              type="radio"
                              id="cash-on-delivery"
                              name="radio-group"
                              className="me-2"
                              checked
                            />
                            <label htmlFor="cash-on-delivery">
                              Cash on Delivery
                            </label>
                          </p>
                        </div>
                        <button
                          to="#"
                          type="submit"
                          className="default-btn order-btn"
                        >
                          Place Order
                          <span />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </section>
      <MidFooter />
    </div>
  );
};

export default Checkout;
