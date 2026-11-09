import React, { useCallback, useContext, useEffect, useState } from "react";
import Select from "react-select";
import "./Checkout.css";
import Header from "../../components/Header";
import MidFooter from "../../components/MidFooter";
import { Link, useNavigate, useParams } from "react-router-dom";
import MobileSidebar from "../../components/MobileSidebar";
import * as Yup from "yup";
import { Formik } from "formik";
import SignContext from "../../contextAPI/Context/SignContext";
import Swal from "sweetalert2";
import axios from "axios";


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
  const navigate = useNavigate();
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [selectedState, setSelectedState] = useState(null);
  const [loading2, setLoading2] = useState(false);
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

  const [totalAmount, setTotalAmount] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");

  const ShippingCharge = 0;

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

  const showEmptyCartMessage = () => {
    Swal.fire({
      icon: "warning",
      title: "Your Cart is Empty",
      showConfirmButton: false,
      timer: 1500,
    });
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

  const handleApplyCoupon = (couponId) => {
    const selectedCoupon = coupons.find((coupon) => coupon._id === couponId);
    console.log(selectedCoupon);
    setSelectedCoupon(selectedCoupon);

    const newDiscountedTotal = calculateDiscountedTotal(
      tPwithGST ? tPwithGST : totalAmount,
      selectedCoupon
    );

    setDiscountedTotal(newDiscountedTotal);

    // Update the totalAmount by subtracting the discount amount
    const newTotalAmount =
      tPwithGST && selectedCoupon
        ? tPwithGST - calculateDiscountAmount(tPwithGST, selectedCoupon)
        : totalAmount;

    setTotalAmount(newTotalAmount);
  };

  const calculateDiscountAmount = (total, coupon) => {
    if (coupon && coupon.type === "%") {
      if (coupon.discount !== null) {
        return (total * coupon.discount) / 100;
      } else {
        return 0;
      }
    } else {
      if (coupon && coupon.discount !== null) {
        return coupon.discount;
      } else {
        return 0;
      }
    }
  };

  function formatNumberWithCommas(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleRemoveAll = async () => {
    const res = await RemoveAllItemsFromCart(id);
    console.log("get cart", res);
    if (res.success) {
      setCartData(res.cartItems);
    }
  };

  function calculateDiscountedTotal(total, coupon) {
    if (coupon && coupon.type === "%") {
      const discountAmount = (total * coupon.discount) / 100;
      return total - discountAmount-75;
    } else if (coupon && coupon.discount !== null) {
      return total - coupon.discount;
    } else {
      return total;
    }
  }

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
          return acc;
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
          return acc; 
        }

        return acc + totalPriceWithGST;
      }, 0)
    : null;

  //   const data ={
  //     name: Name,
  //     amount: discountedTotal
  //     ? (discountedTotal + (ShippingCharge || 0)).toFixed(2)
  //     : (tPwithGST + (ShippingCharge || 0)).toFixed(2),
  //     number: Phone,
  //     MUID: "MUID" + Date.now(),
  //     transactionId: 'T' + Date.now(),
  // }

  

//   const handlePayment = async () => {
//     setLoading2(true);

//     try {
//         const response = await axios.post(`${url}/api/payment`, { ...data });
//         console.log(response);

//         const newTab = window.open(response.data.url, '_blank');

//         if (newTab) {
//             newTab.focus();
//         } else {
//             console.error("Popup blocked. Please enable popups to view the payment page.");
//         }
//     } catch (error) {
//         console.error(error);
//     } finally {
//         setTimeout(() => {
//             setLoading2(false);
//         }, 1500);
//     }
// };

  
//   const handlePayment = async (e)=>{
//     e.preventDefault();
//     setLoading2(true);
//     await axios.post(`${url}/api/payment`, {...data}).then(res => {  
//     setTimeout(() => {
//         setLoading2(false);
//     }, 1500);
//     })
//     .catch(error => {
//         setLoading2(false)
//         console.error(error);
//     });   
// }

const handlePayment = async (values) => {
  setLoading2(true);

  try {
   
      if (values.paymentMethod === "UPI") {
      
          if (!values.firstName || !values.phone) {
             
              console.error("Please fill out the required fields for UPI payment.");
              return;
          }
      }

      
      const data = {
          name: CustomerInfo?CustomerInfo.name:null,
          amount: discountedTotal
              ? (discountedTotal + (ShippingCharge || 0)).toFixed(2)
              : (tPwithGST + (ShippingCharge || 0)).toFixed(2),
          number: CustomerInfo.phone,
          MUID: "MUID" + Date.now(),
          transactionId: 'T' + Date.now(),
      };

      // Make API call
      const response = await axios.post(`${url}/api/payment`, { ...data });
      console.log(response);

     
      const newTab = window.open(response.data.url, '_blank');

      if (newTab) {
          newTab.focus();
      } else {
          console.error("Popup blocked. Please enable popups to view the payment page.");
      }
  } catch (error) {
      console.error(error);
  } finally {
      // Set loading state to false after a delay
      setTimeout(() => {
          setLoading2(false);
      }, 1500);
  }
};

  

  const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //   .required("Email is required")
    //   .email("Invalid email format"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    selectedCountry: Yup.object().nullable().required("Country is required"),
    selectedState: Yup.object().nullable().required("State is required"),
    city: Yup.string().required("Town / City is required"),
    postcode: Yup.string().required("Postcode / Zip is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
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

  // console.log(typeof tPwithGST);

  return (
    <div>
      <Header />
      <MobileSidebar />
      <section class="pt-4 ">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h3 class="text-center fs-3"> Checkout</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="checkout-area pt-4 pb-5">
        <div className="container">
          {!authToken && (
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
          )}
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
              paymentMethod: "COD",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                if (CartData?.length > 0) {
                  const response = await CreateOrder({
                    customer: CustomerInfo._id,
                    FirstName: values.firstName,
                    LastName: values.lastName,
                    products: CartData
                      ? CartData.map((item) => ({
                          product: item.product._id,
                          quantity: item.quantity,
                        }))
                      : null,
                    totalAmount: discountedTotal
                      ? (discountedTotal + (ShippingCharge || 0)).toFixed(2)
                      : (tPwithGST + (ShippingCharge || 0)).toFixed(2),

                    country: values.selectedCountry.value,
                    state: values.selectedState.value,
                    city: values.city,
                    postCode: values.postcode,
                    shippingAddress: values.address,
                    couponCode: selectedCoupon ? selectedCoupon._id : null,
                    paymentMethod: values.paymentMethod,

                    
                  });
                  
                setName(values.firstName);
                setPhone(values.phone);
                  if (response.success) {
                    console.log("Order", response);
                    Swal.fire({
                      icon: "success",
                      title:
                        "Order placed successfully! Invoice will send to you later",
                      showConfirmButton: false,
                      timer: 3000,
                    });

                    handleRemoveAll();
                    resetForm();
                    navigate("/");
                  } else {
                    console.error("Error creating order:", response.msg);
                    Swal.fire({
                      icon: "warning",
                      title:
                        "Product is Out of Stock",
                      showConfirmButton: false,
                      timer: 3000,
                    });
                  }
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "Your Cart is Empty",
                    showConfirmButton: false,
                    timer: 1500,
                  });
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
              setFieldValue, 
              setFieldTouched, 
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-5 col-md-12">
                    <div className="billing-details cart-buttons mt-0">
                      <h3 className="title">Shipping Address</h3>

                      <div className="row" id>
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
                                setFieldValue("selectedState", selectedOption);
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

                      {totalPrice > 10000 && (
                        <div className="row">
                          <h5 className="mt-3 mb-3 fs-13">Use Coupon Code</h5>
                          <div id="cuponcode" className="col-lg-8">
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
                                    {coupons
                                      .filter((coupon) => coupon.active)
                                      .map((coupon) => (
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
                                </div>
                                <div>
                                  {selectedCoupon && (
                                    <div className="row mt-4">
                                      <div className="col-lg-12">
                                        <h5>Coupon Details</h5>
                                        <div className="row coupn_det">
                                          <div className="col-lg-6">
                                            <p>
                                              Code:{" "}
                                              {selectedCoupon
                                                ? selectedCoupon.name
                                                : null}
                                            </p>
                                          </div>
                                          <div className="col-lg-6">
                                            <p>
                                              Discount:{" "}
                                              {selectedCoupon
                                                ? selectedCoupon.discount
                                                : null}
                                              {selectedCoupon
                                                ? selectedCoupon.type
                                                : null}
                                            </p>
                                          </div>
                                        </div>
                                        {/* Add more details as needed */}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {/* <small>
                                  Coupon code can also be applied at checkout
                                  before payment.
                                </small> */}
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4 align-self-center">
                            <button type="button" className="checkout_btn">
                              Apply Coupon
                            </button>
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
                          <tbody>
                            <tr>
                              <td className="total-price" colSpan={2}>
                                <span>Shipping Charge</span>
                              </td>
                              <td className="product-subtotal">
                                <span className="subtotal-amount">
                                  ₹ {ShippingCharge}
                                </span>
                              </td>
                            </tr>

                            <tr>
                              <td className="total-price" colSpan={2}>
                                <span>Order Total</span>
                              </td>
                              <td className="product-subtotal">
                                <span className="subtotal-amount">
                                  ₹{" "}
                                  {tPwithGST
                                    ? formatNumberWithCommas(
                                        tPwithGST + (ShippingCharge || 0)
                                      )
                                    : formatNumberWithCommas(
                                        totalAmount + (ShippingCharge || 0)
                                      )}
                                </span>
                              </td>
                            </tr>
                            {selectedCoupon && (
                              <>
                                <tr>
                                  <td className="order-shipping" colSpan={2}>
                                    <span>Discount</span>
                                  </td>
                                  <td className="shipping-price">
                                    <span>
                                      {selectedCoupon
                                        ? selectedCoupon.discount
                                        : null}{" "}
                                      {selectedCoupon
                                        ? selectedCoupon.type === "%"
                                          ? "%"
                                          : "₹"
                                        : null}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="total-price" colSpan={2}>
                                    <span>Grand Total</span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="subtotal-amount">
                                      ₹{" "}
                                      {formatNumberWithCommas(
                                        (!isNaN(discountedTotal)
                                          ? discountedTotal
                                          : 0) +
                                          (!isNaN(ShippingCharge)
                                            ? ShippingCharge
                                            : 0)
                                          
                                      )}
                                    </span>
                                  </td>
                                </tr>
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div className="payment-box">
    <div className="payment-method">
        <p>
            <input
                type="radio"
                id="cash-on-delivery"
                name="paymentMethod"
                value="COD"
                checked={values.paymentMethod === "COD"}
                onChange={() => setFieldValue("paymentMethod", "COD")}
                onBlur={() => setFieldTouched("paymentMethod", true)}
                className="me-2"
            />
            <label htmlFor="cash-on-delivery">
                Cash on Delivery
            </label>
        </p>
        
        <p>
            <input
                type="radio"
                id="upi-payment"
                name="paymentMethod"
                value="UPI"
                checked={values.paymentMethod === "UPI"}
                onChange={() => setFieldValue("paymentMethod", "UPI")}
                onBlur={() => setFieldTouched("paymentMethod", true)}
                className="me-2"
            />
            <label htmlFor="upi-payment">
                UPI Payment
            </label>
        </p>
    </div>

    {/* {!loading2 ? (
        values.paymentMethod === "COD" ? (
            <div className="payment-method">
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="default-btn order-btn"
                >
                    Place Order
                    <span />
                </button>
            </div>
        ) : values.paymentMethod === "UPI" ? (
            <div className="payment-method">
                <button
                    onClick={handlePayment}
                    type="submit"
                    className="default-btn order-btn"
                >
                    Pay {discountedTotal
                        ? (discountedTotal + (ShippingCharge || 0)).toFixed(2)
                        : (tPwithGST + (ShippingCharge || 0)).toFixed(2)}
                    <span />
                </button>
            </div>
        ) : null
    ) : (
        <div className='col-12 center'>
            <button className='w-100 text-center' type="submit">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden ">Wait...</span>
                </div>
            </button>
        </div>
    )} */}
    {!loading2 ? (
  values.paymentMethod === "COD" ? (
    <div className="payment-method">
      <button
        type="submit"
        className="default-btn order-btn"
        disabled={isSubmitting}  // Disable the button during form submission
      >
        Place Order
        <span />
      </button>
    </div>
  ) : values.paymentMethod === "UPI" ? (
    <div className="payment-method">
      <button
        type="button"  // Change to type="button" to prevent form submission
        onClick={() => handlePayment(values)}
        className="default-btn order-btn"
        disabled={isSubmitting}  // Disable the button during form submission
      >
        Pay {discountedTotal
          ? (discountedTotal + (ShippingCharge || 0)).toFixed(2)
          : (tPwithGST + (ShippingCharge || 0)).toFixed(2)}
        <span />
      </button>
    </div>
  ) : null
) : (
  <div className='col-12 center'>
    <button className='w-100 text-center' type="button" disabled>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Wait...</span>
      </div>
    </button>
  </div>
)}

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
