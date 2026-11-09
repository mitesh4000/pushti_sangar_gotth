import React from "react";
import {
  CardBody,
  Row,
  Col,
  Card,
  Table,
  CardHeader,
  Container,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";

import logoDark from "../../assets/images/users/Logo-Dark (2).png";
import logoLight from "../../assets/images/users/Logo-Light (2).png";
import Bglogo from "../../assets/images/users/letter-pad.jpg";
import { useContext } from "react";

import SignContext from "../../contextAPI/Context/SignContext";
import { useState } from "react";
import { useEffect } from "react";

const InvoiceDetails = () => {
  const { id } = useParams();
  const { getSpecificOrderbyId, GetSpecificCustomer, GetSpecificCouponbyId } =
    useContext(SignContext);
  const [OrderData, setOrderData] = useState([]);
  const [todayDate, setTodayDate] = useState("");
  const [ProductData, setProductData] = useState([]);
  const [CouponData, setCouponData] = useState({});
  const [CustomerInfo, setCustomerInfo] = useState({});
  const customerId = OrderData.customer;
  const ShippingCharge = 150;

  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };

  const GetspecificOrderbyId = async (id) => {
    const res = await getSpecificOrderbyId(id);
    console.log(res);
    if (res.success) {
      setOrderData(res.orderWithProductDetails.order);
      setProductData(res.orderWithProductDetails.products);
    }
  };

  const getspecificCouponbyId = async (id) => {
    const res = await GetSpecificCouponbyId(id);
    console.log(res);
    if (res.success) {
      setCouponData(res.coupon);
    }
  };
  // console.log(CouponData);

  const getSpecificCustomer = async (id) => {
    try {
      const res = await GetSpecificCustomer(id);
      console.log(res);
      if (res.success) {
        setCustomerInfo(res.customer);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  const totalPrice = ProductData
    ? ProductData.reduce((acc, item) => {
        const quantity = parseFloat(item.quantity);
        // const gst = parseFloat(item.tax);

        const discountedPrice = parseFloat(
          item.product.prices.discounted
            ? item.product.prices.discounted
            : item.product.prices.calculatedPrice
        );

        if (isNaN(quantity) || isNaN(discountedPrice)) {
          return acc; // Skip this item if it has invalid data
        }

        return acc + quantity * discountedPrice;
      }, 0)
    : null;

  const tPwithGST = ProductData
    ? ProductData.reduce((acc, item) => {
        const quantity = parseFloat(item.quantity);
        const gst = parseFloat(item.product.gst);

        const discountedPrice = parseFloat(
          item.product.prices.discounted
            ? item.product.prices.discounted
            : item.product.prices.calculatedPrice
        );
        const totalPriceWithGST =
          quantity * discountedPrice + (quantity * discountedPrice * gst) / 100;

        if (isNaN(quantity) || isNaN(discountedPrice)) {
          return acc;
        }

        return acc + totalPriceWithGST;
      }, 0)
    : null;

  const shpChrg = ProductData
    ? ProductData.reduce((acc, item) => {
        // Ensure that item.quantity and item.discountedPrice are valid numbers
        let quantity = 0;
        quantity = quantity + parseFloat(item.product.shippingCharge);

        return quantity;
      }, 0)
    : null;

  useEffect(() => {
    GetspecificOrderbyId(id);
    if (customerId) {
      getSpecificCustomer(customerId);
    }
    getspecificCouponbyId(OrderData.couponCode);
    const getFormattedDate = () => {
      const options = { year: "numeric", month: "short", day: "numeric" };
      const today = new Date();
      return today.toLocaleDateString("en-US", options);
    };

    setTodayDate(getFormattedDate());
  }, [id, customerId, OrderData.couponCode]);

  document.title = "Invoice Details ";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Invoice Details" pageTitle="Invoices" />

        <Row className="justify-content-center">
          <Col xxl={9}>
            <Card id="demo">
              <Row>
                <Col lg={12}>
                  <CardHeader className="border-bottom-dashed py-3 px-4">
                    <div className="row text-center" style={{alignItems:"center"}}>
                      <div className="col-lg-5 place-content-center" style={{alignItems:"-webkit-center"}}>
                        <img
                          src={logoDark}
                          className="card-logo card-logo-dark"
                          alt="logo dark"
                          height="60"
                        />
                        <img
                          src={logoLight}
                          className="card-logo card-logo-light"
                          alt="logo light"
                          height="90"
                        />
                        <div className="mt-sm-5 mt-4">
                          {/* <h6 className="text-muted text-uppercase fw-semibold">
                            Address
                          </h6> */}
                          {/* <p className="text-muted mb-0" id="zip-code">
                            <span>Zip-code: 90201</span>
                          </p> */}
                        </div>
                      </div>
                      <div className="col-lg-7 mt-sm-0 mt-3" style={{textAlign:"right"}}>
                        <h6>
                          <span id="legal-register-no"><b>Pushti Shangar</b></span>
                        </h6>
                        <p className="addressDetails" id="address-details">
                          103, Vrajmadhurya, Lakshmi Colony,
                          Behind Govardhannathji Haveli(Alkapuri),
                          Productivity Road ,<br />
                          Vadodara -390007
                        </p>
                        <h6 className="mb-2">
                          <span id="email">sales.pushtishangar@gmail.com</span>
                        </h6>
                        <h6 className="mb-2">
                          <span id="email">GSTIN/UIN : 24ABAFP9685P1ZD</span>
                        </h6>
                        <h6 className="">
                          <span id="contact-no"> +(91) 8980963151</span>
                        </h6>
                      </div>
                    </div>
                  </CardHeader>
                </Col>
                <Col lg={12}>
                  <CardBody className="p-4">
                    <Row className="g-3">
                      <Col lg={3} xs={6}>
                        <p className="text-muted  text-uppercase fw-semibold">
                          Invoice No
                        </p>
                        <h5 className="fs-14 mb-0">
                          <span id="invoice-no">{OrderData.invoiceNumber}</span>
                        </h5>
                      </Col>
                      <Col lg={3} xs={6}>
                        <p className="text-muted  text-uppercase fw-semibold">
                          Date
                        </p>
                        <h5 className="fs-14 mb-0">
                          <span id="invoice-date">{todayDate}</span>{" "}
                          <small className="text-muted" id="invoice-time">
                            {new Date().toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </small>
                        </h5>
                      </Col>
                      <Col lg={3} xs={6}>
                        <p className="text-muted text-uppercase fw-semibold">
                          Payment Status
                        </p>
                        <span className="status" id="payment-status">
                          {OrderData.paymentMethod}
                        </span>
                      </Col>
                      <Col lg={3} xs={6}>
                        <p className="text-muted  text-uppercase fw-semibold">
                          Total Amount
                        </p>
                        <h5 className="fs-14 mb-0">
                          ₹
                          <span id="total-amount">{OrderData.totalAmount}</span>
                        </h5>
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
                <Col lg={12}>
                  <CardBody className="px-3 py-1 border-top border-top-dashed">
                    <Row className="g-3">
                      {/* <Col sm={6}>
                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                          Billing Address
                        </h6>
                        <p className="fw-medium mb-2" id="billing-name">
                          David Nichols
                        </p>
                        <p
                          className="text-muted mb-1"
                          id="billing-address-line-1"
                        >
                          305 S San Gabriel Blvd
                        </p>
                        <p className="text-muted mb-1">
                          <span>Phone: +</span>
                          <span id="billing-phone-no">(123) 456-7890</span>
                        </p>
                        <p className="text-muted mb-0">
                          <span>Tax: </span>
                          <span id="billing-tax-no">12-3456789</span>
                        </p>
                      </Col> */}
                      <Col sm={6}>
                        <h6 className="text-muted text-uppercase fw-semibold mb-2">
                          Shipping Address
                        </h6>
                        <p className="fw-medium mb-2" id="shipping-name">
                          {CustomerInfo.username}
                        </p>
                        <p className="mb-1" id="shipping-address-line-1">
                          {OrderData.shippingAddress} <br />
                          {OrderData.city}-{OrderData.postCode}
                        </p>
                        <p className="mb-1">
                          <span>Phone: +(91) </span>
                          <span id="shipping-phone-no">
                            {CustomerInfo.phone}
                          </span>
                        </p>
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
                <Col lg={12}>
                  <CardBody className="p-4">
                    <div className="table-responsive">
                      <Table className="table-borderless text-center table-nowrap align-middle mb-0">
                        <thead>
                          <tr className="table-active">
                            <th scope="col" style={{ width: "50px" }}>
                              #
                            </th>
                            <th scope="col">Product Details</th>
                            <th scope="col">Product Weight</th>
                            <th scope="col">Labor Cost</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Quantity</th>
                            <th scope="col" className="text-end">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody id="products-list">
                          {ProductData.map((product, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td className="text-center">
                                <span className="fw-medium">
                                  {product.product.name}
                                </span>

                                <p className="text-muted mb-0">
                                  HSN :{" "}
                                  {product.product.hsnCode
                                    ? product.product.hsnCode
                                    : "NA"}
                                </p>
                              </td>
                              <td>
                                {product.product.weight
                                  ? `${product.product.weight} gms`
                                  : "NA"}
                              </td>
                              <td>
                                {product.product.discountOnLaborCost
                                  ? `₹${product.product.discountOnLaborCost}`
                                  : "NA"}
                              </td>
                              {/* <td>₹{product.product.prices.discounted || product.product.prices.calculatedPrice}</td> */}
                              <td>
                                ₹
                                {product.product.prices.discounted ||
                                  product.product.prices.calculatedPrice}
                              </td>
                              <td>{product.quantity}</td>
                              <td className="text-end">
                                ₹
                                {product.quantity *
                                  (product.product.prices.discounted ||
                                    product.product.prices.calculatedPrice)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <div className="border-top border-top-dashed mt-2">
                      <Table
                        className="table table-borderless table-nowrap align-middle mb-0 ms-auto"
                        style={{ width: "250px" }}
                      >
                        <tbody>
                          <tr>
                            <td>Sub Total</td>
                            <td className="text-end">₹{totalPrice}</td>
                          </tr>
                          <tr>
                            <td>Tax</td>
                            <td className="text-end">
                              ₹{(tPwithGST - totalPrice).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td>Shipping Charge</td>
                            <td className="text-end">₹{ShippingCharge ? ShippingCharge : "0"}</td>
                          </tr>
                          <tr>
                            <td>
                              Discount{" "}
                              <small className="text-muted">
                                {CouponData?CouponData.name:null}
                              </small>
                            </td>
                            <td className="text-end">
                             - {CouponData?CouponData.discount:null}
                               {CouponData.type}
                            </td>
                          </tr>

                          <tr className="border-top border-top-dashed fs-15">
                            <th scope="row">Total Amount</th>
                            <th className="text-end">
                              ₹{OrderData.totalAmount}
                            </th>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    {/* <div className="mt-3">
                      <h6 className="text-muted text-uppercase fw-semibold mb-3">
                        Payment Details:
                      </h6>
                      <p className="text-muted mb-1">
                        Payment Method:{" "}
                        <span className="fw-medium" id="payment-method">
                          {OrderData.paymentMethod}
                        </span>
                      </p>
                      
                      <p className="text-muted">
                        Total Amount:{" "}
                        <span className="fw-medium" id="">
                          ₹{OrderData.totalAmount}
                        </span>
                      </p>
                    </div> */}
                    {/* <div className="mt-4">
                      <div className="alert alert-info">
                        <p className="mb-0">
                          <span className="fw-semibold">NOTES:</span>
                          <span id="note">
                            {" "}
                            All accounts are to be paid within 7 days from
                            receipt of invoice. To be paid by cheque or credit
                            card or direct payment online. If account is not
                            paid within 7 days the credits details supplied as
                            confirmation of work undertaken will be charged the
                            agreed quoted fee noted above.
                          </span>
                        </p>
                      </div>
                    </div> */}
                    <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                      <Link
                        to="#"
                        onClick={printInvoice}
                        className="btn btn-success"
                      >
                        <i className="ri-printer-line align-bottom me-1"></i>{" "}
                        Print
                      </Link>
                      {/* <Link to="#" className="btn btn-primary">
                        <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                        Download
                      </Link> */}
                    </div>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InvoiceDetails;
