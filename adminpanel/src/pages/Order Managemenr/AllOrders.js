import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Pagination,
  PaginationLink,
  PaginationItem,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 20;


const AllOrders = () => {
  const {
    GetAllOrders,
    getCustomers,
    DeleteOrder,
    getSpecificOrderbyId,
    UpdateOrder,
  } = useContext(SignContext);
  const [OrdersData, setOrdersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [CustomerNameMapping, setCustomerNameMapping] = useState({});
  const [deletemodal, setDeleteModal] = useState(false);
  const [OrderToDelete, setOrderToDelete] = useState(null);
  const [EditModal, setEditModal] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [updatedOrderData, setUpdatedOrderData] = useState({
    status: "",
  });
  const [searchQuery, setSearchQuery] = useState('');
const [filteredOrders, setFilteredOrders] = useState([]);


  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = OrdersData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const GetOrders = async () => {
    const res = await GetAllOrders();
    console.log(res);

    setOrdersData(res.orders);
  };

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const handleDeleteOrder = async (id) => {
    const res = await DeleteOrder(id);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setOrderToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      GetOrders();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  const toggleEditmodal = (id) => {
    setEditModal(!EditModal);
    getSpecificOrder(id);
    // console.log(id);
  };

  const getSpecificOrder = async (id) => {
    try {
      const response = await getSpecificOrderbyId(id);
      console.log(response)
      if (response.success) {
        setEditOrder(response.orderWithProductDetails.order);
        setUpdatedOrderData({
          status: response.order.status,
          // Add other fields as needed
        });
      } else {
        console.error("Error fetching order:", response.msg);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const handleUpdateOrder = async (id) => {
    try {
      const response = await UpdateOrder(updatedOrderData, id);
      console.log(response);
      if (response.success) {
        setEditModal(false);
        // Refresh the order list after updating
        GetOrders();
      } else {
        console.error("Error updating order:", response.msg);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const searchOrders = (query) => {
    if (query) {
      const filtered = OrdersData.filter((order) => {
        return order.FirstName.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredOrders(filtered);
      setCurrentPage(1); // Reset to the first page when searching
    } else {
      setFilteredOrders([]);
    }
  };

  useEffect(() => {
    GetOrders();
  }, []);

  const statusColors = {
    completed: { backgroundColor: "#28a745", color: "white" },
    pending: { backgroundColor: "#ffc107", color: "black" },
    processing: { backgroundColor: "#007bff", color: "white" },
    cancelled: { backgroundColor: "#dc3545", color: "white" },
    return: { backgroundColor: "#6c757d", color: "white" },
  };

  document.title = "Orders";

  return (
    <>
      <div className="page-content">
        <Container fluid>
        <BreadCrumb grandParent="Setup" parent="Orders" child="new orders" />
          <Row>
            <Col lg={12}>
              <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
             
             <h4 className="card-title mb-0">All Orders</h4>
             <Row className="align-items-center">
               <Col className="col-lg-auto">
                 <div className="search-box">
                   <input
                     type="text"
                     id="searchTaskList"
                     className="form-control search"
                     placeholder="Search.."
                     value={searchQuery}
                     onChange={(e) => {
                       setSearchQuery(e.target.value);
                       searchOrders(e.target.value);
                     }}
                   />
                   <i className="ri-search-line search-icon"></i>
                 </div>
               </Col>
              
             </Row>
           
         </CardHeader>

                <CardBody>
                  <div id="contentList">
                    
                    <div className="table-responsive table-card mt-1 mb-3">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th className="name">Index</th>
                            <th className="name">Order Id</th>
                            <th className="name">First Name</th>
                            <th className="name">Last Name</th>
                            <th className="name">Total Amount</th>
                            <th className="name">Payment Method</th>
                            <th className="name">Order On</th>
                            <th className="name">Status</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>

                        <tbody className="list form-check-all">
                          {searchQuery?filteredOrders.map((order, key) => (
                            <tr key={order.id}>
                              <th scope="row">
                                <div className="form-check">
                                  <td className="product-name">{key + 1}</td>
                                </div>
                              </th>
                              <td className="product-name">{order._id}</td>
                              <td className="product-name">
                                {order.FirstName}
                              </td>
                              <td className="product-name">{order.LastName}</td>
                              <td className="product-name">
                                ₹{order.totalAmount}
                              </td>
                              <td className="product-name">
                                {order.paymentMethod}
                              </td>
                              <td className="status">
                                <span
                                  className="badge badge-soft"
                                  style={statusColors[order.status]}
                                >
                                  {order.status}
                                </span>

                                
                              </td>

                              {/* Add other columns here as needed */}
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="view">
                                    <Link
                                      to={`/vieworder/${order._id}`}
                                      className="btn btn-sm btn-soft-info view-item-btn"
                                    >
                                      View
                                    </Link>
                                  </div>
                                  <div className="edit">
                                    <Link
                                      onClick={() => toggleEditmodal(order._id)}
                                      className="btn btn-sm btn-soft-success edit-item-btn"
                                    >
                                      <i className="ri-pencil-line"></i>
                                    </Link>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-soft-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        toggledeletemodal();
                                        setOrderToDelete(order);
                                      }}
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </button>
                                  </div>
                                  {/* <div className="action">
                                    <button className="btn btn-sm btn-secondary">
                                      <i className="ri-settings-3-line"></i>
                                    </button>
                                  </div> */}
                                </div>
                              </td>
                            </tr>
                          )):currentItems.map((order, key) => (
                            <tr key={order.id}>
                              <th scope="row">
                                <div className="form-check">
                                  <td className="product-name text-center">{key + 1}</td>
                                </div>
                              </th>
                              <td className="product-name">{order._id}</td>
                              <td className="product-name">
                                {order.FirstName}
                              </td>
                              <td className="product-name text-center">{order.LastName}</td>
                              <td className="product-name">
                                ₹{order.totalAmount}
                              </td>
                              <td className="product-name text-center">
                                {order.paymentMethod}
                              </td>
                              <td className="product-name">
                              {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td className="status">
                                <span
                                  className="badge badge-soft"
                                  style={statusColors[order.status]}
                                >
                                  {order.status}
                                </span>

                                
                              </td>

                              {/* Add other columns here as needed */}
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="view">
                                    <Link
                                      to={`/vieworder/${order._id}`}
                                      className="btn btn-sm btn-soft-info view-item-btn"
                                    >
                                      <i className="ri-eye-fill align-bottom" />
                                    </Link>
                                  </div>
                                  <div className="edit">
                                    <Link
                                      onClick={() => toggleEditmodal(order._id)}
                                      className="btn btn-sm btn-soft-success edit-item-btn"
                                    >
                                      <i className="ri-pencil-line"></i>
                                    </Link>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-soft-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        toggledeletemodal();
                                        setOrderToDelete(order);
                                      }}
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </button>
                                  </div>
                                  {/* <div className="action">
                                    <button className="btn btn-sm btn-secondary">
                                      <i className="ri-settings-3-line"></i>
                                    </button>
                                  </div> */}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <Pagination>
                    <PaginationItem>
                      <PaginationLink
                        previous
                        onClick={() =>
                          setCurrentPage((prev) =>
                            prev === 1 ? prev : prev - 1
                          )
                        }
                      />
                    </PaginationItem>
                    {Array.from({
                      length: Math.ceil(OrdersData.length / ITEMS_PER_PAGE),
                    }).map((_, index) => (
                      <PaginationItem
                        key={index + 1}
                        active={index + 1 === currentPage}
                      >
                        <PaginationLink onClick={() => paginate(index + 1)}>
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationLink
                        next
                        onClick={() =>
                          setCurrentPage((prev) =>
                            prev ===
                            Math.ceil(OrdersData.length / ITEMS_PER_PAGE)
                              ? prev
                              : prev + 1
                          )
                        }
                      />
                    </PaginationItem>
                  </Pagination>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Modal
        isOpen={EditModal}
        role="dialog"
        autoFocus={true}
        centered
        id="addAddressModal"
        toggle={toggleEditmodal}
      >
        <ModalHeader
          toggle={() => {
            setEditModal(!EditModal);
          }}
        >
          <h5 className="modal-title" id="addAddressModalLabel">
            Edit Status
          </h5>
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="mb-3">
              <Label for="status" className="form-label">
                Status
              </Label>
              <select
                className="form-select"
                id="state"
                name="status"
                value={updatedOrderData.status}
                onChange={(e) =>
                  setUpdatedOrderData({
                    ...updatedOrderData,
                    status: e.target.value,
                  })
                }
              >
                {/* Add options for different order statuses */}
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="cancelled">Cancelled</option>
                <option value="return">Return</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <ModalFooter>
              
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleUpdateOrder(editOrder._id)}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setEditModal(!EditModal);
                }}
              >
                Close
              </button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={deletemodal}
        role="dialog"
        autoFocus={true}
        centered
        id="removeItemModal"
        toggle={toggledeletemodal}
      >
        <ModalHeader
          toggle={() => {
            setDeleteModal(!deletemodal);
          }}
        ></ModalHeader>
        <ModalBody>
          <div className="mt-2 text-center">
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="loop"
              colors="primary:#f7b84b,secondary:#f06548"
              style={{ width: "100px", height: "100px" }}
            ></lord-icon>
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you Sure You want to Remove this Coupon ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            
            <button
              type="button"
              className="btn w-sm btn-danger"
              onClick={() => {
                handleDeleteOrder(OrderToDelete._id);
                setDeleteModal(false);
              }}
            >
              Yes, Delete It!
            </button>
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => {
                setDeleteModal(!deletemodal);
              }}
            >
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AllOrders;
