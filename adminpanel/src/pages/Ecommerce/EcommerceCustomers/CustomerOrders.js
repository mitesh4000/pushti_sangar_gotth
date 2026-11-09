import React, { useContext, useEffect, useState } from "react";
import SignContext from '../../../contextAPI/Context/SignContext';
import { Link, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const CustomerOrders = () => {
  const { id } = useParams();
  const { GetorderHistorybyId } = useContext(SignContext);
  const [OrderData, setOrderData] = useState([]);

  const getOrderHistorybyId = async (id) => {
    const res = await GetorderHistorybyId(id);
    console.log(res)
    if (res.success) {
      setOrderData(res.orderHistory);
    }
  };

  useEffect(() => {
    getOrderHistorybyId(id);
  }, [id]);

  document.title = "OrderHistory | Pushtishangar";



  return (
    <>
    <div className="page-content">
        <Container fluid>
         
          <BreadCrumb grandParent="Setup" parent="OrderHistory" child="All Customers" />

          <Row>
            <Col lg={12}>
              <Card>
               
                <CardHeader className="d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Order History</h4>
                </CardHeader>
                <CardBody>
                <div id="contentList">
                   
                    <div
                      id="todo-task"
                      className="table-responsive table-card mt-1 mb-3"
                    >
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="name">Index</th>
                            <th className="name">Order Id</th>
                            <th className="name">City</th>
                            <th className="name">Total Amount</th>
                            <th className="name">Order On</th>
                           
                            <th className="action">Action</th>
                          </tr>
                        </thead>

                        <tbody className="list form-check-all">
                          {OrderData.map((order, key) => (
                            <tr key={order.id}>
                              <th scope="row">
                                <div className="form-check">
                                  <td className="product-name">{key + 1}</td>
                                </div>
                              </th>
                              <td className="product-name">{order._id}</td>
                              <td className="product-name">{order.city}</td>
                              <td className="product-name">{order.totalAmount}</td>
                              <td className="product-name">{new Date(order.createdAt).toLocaleDateString()}</td>
                            
                        

                              {/* Add other columns here as needed */}
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <Link
                                      to={`/vieworder/${order._id}`}
                                      className="btn btn-sm btn-soft-info edit-item-btn"
                                    >
                                      <i className="ri-eye-fill align-bottom" />
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                  </div>
                  </CardBody>
                </Card>
                </Col>
                </Row>
                </Container>
                </div>
    </>
  )
}

export default CustomerOrders