import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardHeader,
  Collapse,
} from "reactstrap";

import classnames from "classnames";
import { Link, useParams } from "react-router-dom";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { productDetails } from "../../../common/data/ecommerce";
import EcommerceOrderProduct from "./EcommerceOrderProduct";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import SignContext from "../../../contextAPI/Context/SignContext";

const EcommerceOrderDetail = (props) => {
  const { id } = useParams();
  const { getSpecificOrderbyId, GetSpecificCustomer, GetSpecificCouponbyId } =
    useContext(SignContext);
  const [OrderData, setOrderData] = useState([]);
  const [ProductData, setProductData] = useState([]);
  const [CouponData, setCouponData] = useState({});
  const [CustomerInfo, setCustomerInfo] = useState({});
  const customerId = OrderData.customer;
  const ShippingCharge = 150;

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
          item.product.prices.discounted ? item.product.prices.discounted : item.product.prices.calculatedPrice
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

 
  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(true);
  const [col3, setcol3] = useState(true);

  function togglecol1() {
    setcol1(!col1);
  }

  function togglecol2() {
    setcol2(!col2);
  }

  function togglecol3() {
    setcol3(!col3);
  }

  useEffect(() => {
    // console.log("id:", id);
    // console.log("customerId:", customerId);
    GetspecificOrderbyId(id);
    if (customerId) {
      getSpecificCustomer(customerId);
    }
    getspecificCouponbyId(OrderData.couponCode);
  }, [id, customerId, OrderData.couponCode]);

  document.title = "Order Details | Pushtishangar";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Order Details" pageTitle="Ecommerce" />

        <Row>
          <Col xl={9}>
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Order {OrderData._id}{" "}
                  </h5>
                  <div className="flex-shrink-0">
                    <Link
                      to={`/invoice/${OrderData._id}`}
                      className="btn btn-success btn-sm"
                    >
                      <i className="ri-download-2-fill align-middle me-1"></i>{" "}
                      Invoice
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-responsive table-card">
                  <table className="table table-nowrap align-middle table-borderless mb-0">
                    <thead className="table-light text-muted">
                      <tr>
                        <th scope="col">Product Details</th>
                        <th scope="col">Item Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">GST</th>
                        {/* <th scope="col" className="text-end">
                          Total Amount
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {ProductData.map((product, key) => (
                        <EcommerceOrderProduct product={product} key={key} />
                      ))}
                      <tr className="border-top border-top-dashed">
                        <td colSpan="3"></td>
                        <td colSpan="2" className="fw-medium p-0">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td>Sub Total :</td>
                                <td className="text-end">₹ {totalPrice}</td>
                              </tr>
                              <tr>
                                <td>Tax :</td>
                                <td className="text-end">
                                  ₹{" "}
                                  {(tPwithGST - totalPrice).toFixed(
                                    2
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Shipping Charge :</td>
                                <td className="text-end">
                                  ₹{" "}
                                  {ShippingCharge?ShippingCharge : "0"}
                                </td>
                                </tr>
                              <tr>
                                <td>
                                  Discount{" "}
                                  <span className="text-muted">
                                    ({CouponData?CouponData.name:null})
                                  </span>{" "}
                                  : :
                                </td>
                                <td className="text-end">
                                  -{CouponData?CouponData.discount:null}
                                  {CouponData?CouponData.type:null}
                                </td>
                              </tr>
                              {/* <tr>
                                <td>Shipping Charge :</td>
                                <td className="text-end">$65.00</td>
                              </tr> */}

                              <tr className="border-top border-top-dashed">
                                <th scope="row">Total (₹) :</th>
                                <th className="text-end">
                                  ₹ {OrderData.totalAmount}
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>

            {/* <Card>
              <CardHeader>
                <div className="d-sm-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Order Status</h5>
                  <div className="flex-shrink-0 mt-2 mt-sm-0">
                    <Link
                      to="#"
                      className="btn btn-soft-info btn-sm mt-2 mt-sm-0"
                    >
                      <i className="ri-map-pin-line align-middle me-1"></i>{" "}
                      Change Address
                    </Link>{" "}
                    <Link
                      to="#"
                      className="btn btn-soft-danger btn-sm mt-2 mt-sm-0"
                    >
                      <i className="mdi mdi-archive-remove-outline align-middle me-1"></i>{" "}
                      Cancel Order
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="profile-timeline">
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item border-0" onClick={togglecol1}>
                      <div className="accordion-header" id="headingOne">
                        <Link to="#" className={classnames(
                          "accordion-button",
                          "p-2",
                          "shadow-none",
                          { collapsed: !col1 }

                        )}>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="ri-shopping-bag-line"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-0 fw-semibold">
                                Order Placed -{" "}
                                <span className="fw-normal">
                                  Wed, 15 Dec 2021
                                </span>
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <Collapse
                        id="collapseOne"
                        className="accordion-collapse"
                        isOpen={col1}
                      >
                        <div className="accordion-body ms-2 ps-5 pt-0">
                          <h6 className="mb-1">An order has been placed.</h6>
                          <p className="text-muted">
                            Wed, 15 Dec 2021 - 05:34PM
                          </p>

                          <h6 className="mb-1">
                            Seller has proccessed your order.
                          </h6>
                          <p className="text-muted mb-0">
                            Thu, 16 Dec 2021 - 5:48AM
                          </p>
                        </div>
                      </Collapse>
                    </div>
                    <div className="accordion-item border-0" onClick={togglecol2}>
                      <div className="accordion-header" id="headingTwo">
                        <Link to="#"
                          className={classnames(
                            "accordion-button",
                            "p-2",
                            "shadow-none",
                            { collapsed: !col2 }
                          )}
                          href="#collapseTwo"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="mdi mdi-gift-outline"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-1 fw-semibold">
                                Packed -{" "}
                                <span className="fw-normal">
                                  Thu, 16 Dec 2021
                                </span>
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <Collapse
                        id="collapseTwo"
                        className="accordion-collapse"
                        isOpen={col2}
                      >
                        <div className="accordion-body ms-2 ps-5 pt-0">
                          <h6 className="mb-1">
                            Your Item has been picked up by courier patner
                          </h6>
                          <p className="text-muted mb-0">
                            Fri, 17 Dec 2021 - 9:45AM
                          </p>
                        </div>
                      </Collapse>
                    </div>
                    <div className="accordion-item border-0" onClick={togglecol3}>
                      <div className="accordion-header" id="headingThree">
                        <Link to="#"
                          className={classnames(
                            "accordion-button",
                            "p-2",
                            "shadow-none",
                            { collapsed: !col3 }
                          )}
                          href="#collapseThree"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-success rounded-circle">
                                <i className="ri-truck-line"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-15 mb-1 fw-semibold">
                                Shipping -{" "}
                                <span className="fw-normal">
                                  Thu, 16 Dec 2021
                                </span>
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <Collapse
                        id="collapseThree"
                        className="accordion-collapse"
                        isOpen={col3}
                      >
                        <div className="accordion-body ms-2 ps-5 pt-0">
                          <h6 className="fs-14">
                            RQK Logistics - MFDS1400457854
                          </h6>
                          <h6 className="mb-1">Your item has been shipped.</h6>
                          <p className="text-muted mb-0">
                            Sat, 18 Dec 2021 - 4.54PM
                          </p>
                        </div>
                      </Collapse>
                    </div>
                    <div className="accordion-item border-0">
                      <div className="accordion-header" id="headingFour">
                        <Link to="#"
                          className="accordion-button p-2 shadow-none"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-light text-success rounded-circle">
                                <i className="ri-takeaway-fill"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-14 mb-0 fw-semibold">
                                Out For Delivery
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="accordion-item border-0">
                      <div className="accordion-header" id="headingFive">
                        <Link
                          className="accordion-button p-2 shadow-none"
                          to="#"
                        >
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 avatar-xs">
                              <div className="avatar-title bg-light text-success rounded-circle">
                                <i className="mdi mdi-package-variant"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="fs-14 mb-0 fw-semibold">
                                Delivered
                              </h6>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card> */}
          </Col>

          <Col xl={3}>
            {/* <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                    <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
                    Logistics Details
                  </h5>
                  <div className="flex-shrink-0">
                    <Link to="#" className="badge badge-soft-primary fs-11">
                      Track Order
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="text-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/uetqnvvg.json"
                    trigger="loop"
                    colors="primary:#405189,secondary:#0ab39c"
                    style={{ width: "80px", height: "80px" }}
                  ></lord-icon>
                  <h5 className="fs-16 mt-2">RQK Logistics</h5>
                  <p className="text-muted mb-0">ID: MFDS1400457854</p>
                  <p className="text-muted mb-0">Payment Mode : Debit Card</p>
                </div>
              </CardBody>
            </Card> */}

            <Card>
              <CardHeader>
                <div className="d-flex">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Customer Details
                  </h5>
                  {/* <div className="flex-shrink-0">
                    <Link to="#" className="link-secondary">
                      View Profile
                    </Link>
                  </div> */}
                </div>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled mb-0 vstack gap-3">
                  <li>
                    <div className="d-flex align-items-center">
                      {/* <div className="flex-shrink-0">
                        <img
                          src={avatar3}
                          alt=""
                          className="avatar-sm rounded"
                        />
                      </div> */}
                      <div className="flex-grow-1 ms-3">
                        <h6 className="fs-14 mb-1">
                          {OrderData.FirstName} {OrderData.LastName}
                        </h6>
                        <p className="text-muted mb-0">Customer</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <i className="ri-mail-line me-2 align-middle text-muted fs-16"></i>
                    {CustomerInfo.email}
                  </li>
                  <li>
                    <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                    +(91) {CustomerInfo.phone}
                  </li>
                </ul>
              </CardBody>
            </Card>

            {/* <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                  Billing Address
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                  <li className="fw-medium fs-14">Joseph Parker</li>
                  <li>+(256) 245451 451</li>
                  <li>2186 Joyce Street Rocky Mount</li>
                  <li>New York - 25645</li>
                  <li>United States</li>
                </ul>
              </CardBody>
            </Card> */}

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                  Shipping Address
                </h5>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                  <li className="fw-medium fs-14">
                    {OrderData.FirstName} {OrderData.LastName}
                  </li>
                  <li>+(91) {CustomerInfo.phone} </li>
                  <li>{OrderData.shippingAddress}</li>
                  <li>
                    {OrderData.state} - {OrderData.postCode}
                  </li>
                  <li>{OrderData.country}</li>
                </ul>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">
                  <i className="ri-secure-payment-line align-bottom me-1 text-muted"></i>{" "}
                  Payment Details
                </h5>
              </CardHeader>
              <CardBody>
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Transactions:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">{OrderData.paymentMethod}</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Payment Method:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">{OrderData.paymentMethod}</h6>
                  </div>
                </div>
                
                <div className="d-flex align-items-center mb-2">
                  <div className="flex-shrink-0">
                    {/* <p className="text-muted mb-0">Card Number:</p> */}
                  </div>
                  <div className="flex-grow-1 ms-2">
                    {/* <h6 className="mb-0">xxxx xxxx xxxx 2456</h6> */}
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <p className="text-muted mb-0">Total Amount:</p>
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <h6 className="mb-0">₹ {OrderData.totalAmount}</h6>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EcommerceOrderDetail;
