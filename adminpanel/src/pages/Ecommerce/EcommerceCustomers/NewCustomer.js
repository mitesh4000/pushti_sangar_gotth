import React, { useContext, useEffect, useState } from "react";
import {
  Card,
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
  CardBody,
  CardFooter,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import FeatherIcon from "feather-icons-react";
import { Grid } from "gridjs";
import SignContext from "../../../contextAPI/Context/SignContext";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 10;

const NewCustomer = () => {
  // const { id } = useParams();
  // console.log(id);
  const {
    getCustomers,
    createCustomer,
    GetSpecificCustomer,
    UpdateCustomer,
    deleteCustomer,
  } = useContext(SignContext);
  const [CustomersData, setCustomersData] = useState([]);
  const [allCustomersData, setAllCustomersData] = useState([]);
  const [CustomerInfo, setCustomerInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    active: true,
  });
  const [EditCustomerInfo, setEditCustomerInfo] = useState({
    username: "",
    active: true,
    deleted: false,
  });
  const [modal, setModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [CustomerToDelete, setCustomerToDelete] = useState(null);
  const [deletemodal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    // active: Yup.string().required("Status is required"),
  });

  const Getcustomers = async () => {
    const res = await getCustomers();
    console.log(res);

    const transformedData = res.customers.map((customer, index) => ({
      ...customer,
      id: index + 1,
    }));
    setCustomersData(transformedData);
    setAllCustomersData(transformedData);
  };

  const getspecificCustomer = async (id) => {
    const res = await GetSpecificCustomer(id);
    console.log(res);
    if (res.success) {
      setEditCustomerInfo(res.customer); // Update editUserInfo with fetched data
    } else {
      console.log(res.msg);
    }
  };

  const handleSaveCustomer = async (Values) => {
    const res = await createCustomer(Values);
    console.log(res);
    if (res.success) {
      setCustomerInfo(res.customer);
      Getcustomers();
    }
  };

  const handleChange = (e) => {
    if (EditModal) {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setEditCustomerInfo({
        ...EditCustomerInfo,
        [name]: newValue,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const customerId = CustomerInfo._id;
    const resUpdate = await UpdateCustomer(customerId, EditCustomerInfo);
    console.log(resUpdate);
    if (resUpdate.success) {
      Getcustomers();
      // setSuccess(resUpdate.msg);
    } else {
      console.log(resUpdate.msg);
    }
  };

  const searchList = (e) => {
    let inputVal = e.toLowerCase();

    function filterItems(arr, query) {
      return arr.filter(function (el) {
        return (
          el.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          el.email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          el.phone.toLowerCase().indexOf(query.toLowerCase()) !== -1 
        
        );
      });
    }

    let filterData = filterItems(allCustomersData, inputVal);
    setCustomersData(filterData);
    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("todo-task").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("todo-task").style.display = "block";
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    const res = await deleteCustomer(customerId);
    console.log(res);
    if (res.success) {
      setCustomerToDelete(null);
      setDeleteModal(false);
      
      Getcustomers();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  const togglemodal = () => {
    setModal(!modal);
  };

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const toggleEditmodal = (id) => {
    // console.log(id);
    setEditModal(!modal);
    getspecificCustomer(id);
  };

  useEffect(() => {
    Getcustomers();
    getspecificCustomer(CustomerInfo._id);
  }, [CustomerInfo._id]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  useEffect(()=>{
    setCustomersData(CustomersData.slice(indexOfFirstItem, indexOfLastItem))
    
  },[currentPage])

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  document.title = "Customers";
  return (
    <>
      <div className="page-content">
        <Container fluid>
        <BreadCrumb grandParent="Setup" parent="Customers" child="Customers" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
              <CardHeader className="d-flex justify-content-between align-items-center">
              <React.Fragment>
                <h4 className="card-title mb-0">Customers</h4>
                <Row className="align-items-center">
                  <Col className="col-lg-auto">
                    <div className="search-box">
                      <input
                        type="text"
                        id="searchTaskList"
                        className="form-control search"
                        placeholder="Search..."
                        onKeyUp={(e) => searchList(e.target.value)}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                 
                </Row>
              </React.Fragment>
            </CardHeader>
            <CardBody>
            <div className="table-responsive table-card mt-1 mb-3" id="todo-task">
                    <table
                      className="table align-middle table-nowrap"
                      id="customerTable"
                    >
                      <thead className="table-light">
                        <tr>
                          <th className="name">Index</th>
                          <th className="name">Name</th>
                          <th className="price">email</th>
                          <th className="price">Contact</th>
                          <th className="price">Registered At</th>

                          <th className="status">Status</th>
                          <th className="action">Action</th>
                        </tr>
                      </thead>
                      <tbody  className="list form-check-all">
                        {CustomersData.map((customer, key) => (
                          <tr key={customer.id}>
                            <th scope="row">
                              <td className="product-name">{key + 1}</td>
                            </th>
                            <td className="product-name">
                              {customer.username}
                            </td>
                            <td className="stock">{customer.email}</td>
                            <td className="stock">{customer.phone}</td>
                            <td className="stock">
                            {new Date(customer.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                              </td>
                            <td className="status">
                              {customer.active === true ? (
                                <div>
                                <span className="badge badge-soft-success badge-border">
                                  Active
                                </span>
                              </div>
                            ) : (
                              <div>
                                <span className="badge badge-soft-danger badge-border">
                                  InActive
                                </span>
                              </div>
                            )}
                            </td>

                            {/* Add other columns here as needed */}
                            <td>
                              <div className="d-flex gap-2">
                              <div className="View">
                                  <Link
                                    to={`/customerorder/${customer._id}`}
                                    className="btn btn-sm btn-soft-info remove-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteRecordModal"
                                    // onClick={() => {
                                    //   toggledeletemodal();
                                    //   setCustomerToDelete(customer);
                                    // }}
                                  >
                                    <i className="ri-eye-fill align-bottom" />
                                  </Link>
                                </div>
                                <div className="remove">
                                  <button
                                    className="btn btn-sm btn-soft-danger remove-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteRecordModal"
                                    onClick={() => {
                                      toggledeletemodal();
                                      setCustomerToDelete(customer);
                                    }}
                                  >
                                    <i className="ri-delete-bin-5-fill align-bottom" />
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      
                    </table>
                    
                  </div>
                  <div
                className="py-4 mt-4 text-center"
                id="noresult"
                style={{ display: "none" }}
              >
                <h1>
                  <FeatherIcon icon="search" />
                </h1>
                <h5 className="mt-4">Sorry! No Result Found</h5>
              </div>
            </CardBody>
               <CardFooter>
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
                      length: Math.ceil(CustomersData.length / ITEMS_PER_PAGE),
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
                            Math.ceil(CustomersData.length / ITEMS_PER_PAGE)
                              ? prev
                              : prev + 1
                          )
                        }
                      />
                    </PaginationItem>
                  </Pagination>
               </CardFooter>
                  
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* modal Add Customer */}
      <Modal
        isOpen={modal}
        role="dialog"
        autoFocus={true}
        centered
        id="addAddressModal"
        toggle={togglemodal}
      >
        <ModalHeader
          toggle={() => {
            setModal(!modal);
          }}
        >
          <h5 className="modal-title" id="addAddressModalLabel">
            Add Customer
          </h5>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
              active: true,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              await handleSaveCustomer(values);
              resetForm();
              togglemodal();
              toast.success("User Added Successfully", { autoClose: 3000 });
            }}
          >
            {({
              isSubmitting,
              handleChange,
              handleSubmit,
              errors,
              touched,
              values,
              handleBlur,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Label for="addaddress-Name" className="form-label">
                    Name
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="Name"
                    placeholder="Enter Name"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  <p classname="error text-danger">
                    {errors.username && touched.username && errors.username}
                  </p>
                </div>

                <div className="mb-3">
                  <Label for="Email" className="form-label">
                    Email
                  </Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="Email"
                    placeholder="Enter Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <p classname="error text-danger">
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>
                <div className="mb-3">
                  <Label for="password" className="form-label">
                    Password
                  </Label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <p classname="error text-danger">
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
                <div className="mb-3">
                  <Label for="password" className="form-label">
                    Confirm Password
                  </Label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  <p classname="error text-danger">
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </p>
                </div>
                <div className="mb-3">
                  <Label for="status" className="form-label">
                    Status
                  </Label>
                  <div>
                    <div className="form-check form-check-inline">
                      <Field
                        type="radio"
                        className="form-check-input"
                        id="activeStatus"
                        name="active"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.active}
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="activeStatus"
                      >
                        Active
                      </Label>
                    </div>
                  </div>
                </div>

                <ModalFooter>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      setModal(!modal);
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    // onClick={() => {
                    //   setModal(!modal);
                    // }}
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>

      {/* Modal Edit Address */}
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
            Edit Customer
          </h5>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="Name"
                placeholder="Enter Name"
                name="username"
                value={EditCustomerInfo.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <Label for="status" className="form-label">
                Status
              </Label>
              <div>
                <div className="form-check form-check-inline">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    id="activeStatus"
                    name="active"
                    checked={EditCustomerInfo.active}
                    onChange={handleChange}
                  />
                  <Label className="form-check-label" htmlFor="activeStatus">
                    Active
                  </Label>
                </div>
              </div>
            </div>

            <ModalFooter>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setEditModal(!EditModal);
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => {
                  setEditModal(!EditModal);
                }}
              >
                Save
              </button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>

      {/* modal Delete Address */}
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
                Are you Sure You want to Remove this Customer ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            
            <button
              type="button"
              className="btn w-sm btn-danger"
              onClick={() => {
                handleDeleteCustomer(CustomerToDelete);
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

export default NewCustomer;
