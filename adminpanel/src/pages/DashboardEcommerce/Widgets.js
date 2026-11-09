import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Row } from "reactstrap";
// import SignContext from "../../contextAPI/Context/SignContext";
// import { useContext } from "react";

const Widgets = () => {
//   const { GetDashboardData } = useContext(SignContext);
//   const [DashboardData, setDashboardData] = useState({});

//   const getDashboardData = async () => {
//     const res = await GetDashboardData();
//     console.log(res);

//     // setDashboardData(res.orders);
//   };



  // Example state to hold data fetched from the API
  const [widgetData, setWidgetData] = useState({
    totalCustomers: 0,
    totalPendingOrders: 0,
    totalReturnOrders: 0,
    totalCancelledOrders: 0,
    totalProducts: 0,
    totalShringarProducts: 0,
    totalSilverVesselsProducts: 0,
    totalSugandhiProducts: 0,
    totalPichwaiWallArtProducts: 0,
    totalVastraProducts: 0,
    totalFibreItemsProducts: 0,
    totalSeasonalProducts: 0,
  });

  useEffect(() => {
    // getDashboardData();
    setWidgetData({
      totalCustomers: 1000,
      totalPendingOrders: 50,
      totalReturnOrders: 200,
      totalCancelledOrders: 30,
      totalProductCategories: 8,
      totalShringarProducts: 8,
      totalSilverVesselsProducts: 8,
      totalSugandhiProducts: 8,
      totalPichwaiWallArtProducts: 8,
      totalVastraProducts: 8,
      totalFibreItemsProducts: 8,
      totalSeasonalProducts: 8,
    });
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <>
      <Row>
        {/* Total Customers Widget */}
        <Col xl={3} md={6}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Customers
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={widgetData.totalCustomers}
                    >
                      <CountUp
                        start={0}
                        end={widgetData.totalCustomers}
                        duration={2}
                      />
                    </span>
                  </h4>
                  <Link to="/customers" className="text-decoration-underline">
                    View Details
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} md={6}>
          <Card className="card-animate">
            <CardBody>
              {/* Pending Orders */}
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Pending Orders
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={widgetData.totalPendingOrders}
                    >
                      <CountUp
                        start={0}
                        end={widgetData.totalPendingOrders}
                        duration={2}
                      />
                    </span>
                  </h4>
                  <Link
                    to="/orders/pending"
                    className="text-decoration-underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={3} md={6}>
          <Card className="card-animate">
            <CardBody>
              {/* Similar structure for other order status widgets */}
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Return Orders
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={widgetData.totalReturnOrders}
                    >
                      <CountUp
                        start={0}
                        end={widgetData.totalReturnOrders}
                        duration={2}
                      />
                    </span>
                  </h4>
                  <Link
                    to="/orders/processed"
                    className="text-decoration-underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Cancelled Orders */}
        <Col xl={3} md={6}>
          <Card className="card-animate">
            <CardBody>
              {/* Similar structure for other order status widgets */}
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Cancelled Orders
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={widgetData.totalCancelledOrders}
                    >
                      <CountUp
                        start={0}
                        end={widgetData.totalCancelledOrders}
                        duration={2}
                      />
                    </span>
                  </h4>
                  <Link
                    to="/orders/cancelled"
                    className="text-decoration-underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={3} md={6}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Shringar Products
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={widgetData.totalShringarProducts}
                    >
                      <CountUp
                        start={0}
                        end={widgetData.totalShringarProducts}
                        duration={2}
                      />
                    </span>
                  </h4>
                  <Link
                    to="/product-categories"
                    className="text-decoration-underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} md={6}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Silver Vessels Products
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={widgetData.totalSilverVesselsProducts}
                    >
                      <CountUp
                        start={0}
                        end={widgetData.totalSilverVesselsProducts}
                        duration={2}
                      />
                    </span>
                  </h4>
                  <Link
                    to="/product-categories"
                    className="text-decoration-underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} md={6}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Sugandhi(Attar) Products
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={widgetData.totalSugandhiProducts}
                    >
                      <CountUp
                        start={0}
                        end={widgetData.totalSugandhiProducts}
                        duration={2}
                      />
                    </span>
                  </h4>
                  <Link
                    to="/product-categories"
                    className="text-decoration-underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} md={6}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Pichwai & Wall Art Products
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={widgetData.totalPichwaiWallArtProducts}
                    >
                      <CountUp
                        start={0}
                        end={widgetData.totalPichwaiWallArtProducts}
                        duration={2}
                      />
                    </span>
                  </h4>
                  <Link
                    to="/product-categories"
                    className="text-decoration-underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} md={6}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Vastra Products
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={widgetData.totalVastraProducts}
                    >
                      <CountUp
                        start={0}
                        end={widgetData.totalVastraProducts}
                        duration={2}
                      />
                    </span>
                  </h4>
                  <Link
                    to="/product-categories"
                    className="text-decoration-underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} md={6}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Fibre Items Products
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={widgetData.totalFibreItemsProducts}
                    >
                      <CountUp
                        start={0}
                        end={widgetData.totalFibreItemsProducts}
                        duration={2}
                      />
                    </span>
                  </h4>
                  <Link
                    to="/product-categories"
                    className="text-decoration-underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl={3} md={6}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    Seasonal Products
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={widgetData.totalSeasonalProducts}
                    >
                      <CountUp
                        start={0}
                        end={widgetData.totalSeasonalProducts}
                        duration={2}
                      />
                    </span>
                  </h4>
                  <Link
                    to="/product-categories"
                    className="text-decoration-underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Widgets;
