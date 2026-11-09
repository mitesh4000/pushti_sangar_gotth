import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Pagination,
  PaginationLink,
  PaginationItem,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const ITEMS_PER_PAGE = 10;

const Coupons = () => {
  const { GetCoupons, DeleteCoupon } = useContext(SignContext);
  const [CouponData, setCouponData] = useState([]);
  const [allCouponData, setAllCouponData] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [ContentToDelete, setContentToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const Getcoupons = async () => {
    const res = await GetCoupons();

    setCouponData(res.coupons);
    setAllCouponData(res.coupons);
  };

  const searchList = (e) => {
    let inputVal = e.toLowerCase();

    function filterItems(arr, query) {
      return arr.filter(function (el) {
        return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    }

    let filterData = filterItems(allCouponData, inputVal);
    setCouponData(filterData);
    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("todo-task").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("todo-task").style.display = "block";
    }
  };

  const handleDeleteCoupon = async (id) => {
    const res = await DeleteCoupon(id);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setContentToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      Getcoupons();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  useEffect(() => {
    Getcoupons();
  }, []);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = CouponData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  document.title = "Coupons";

  return (
    <>
      <div className="page-content">
        <Container fluid>
         
          <BreadCrumb grandParent="Setup" parent="Coupons" child="All Coupons" />

          <Row>
            <Col lg={12}>
              <Card>
               
                <CardHeader className="d-flex justify-content-between align-items-center">
             
                    <h4 className="card-title mb-0">All Coupons</h4>
                    <Row className="align-items-center">
                      <Col className="col-lg-auto">
                        <div className="search-box">
                          <input
                            type="text"
                            id="searchTaskList"
                            className="form-control search"
                            placeholder="Search.."
                            onKeyUp={(e) => searchList(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col className="col-lg-auto">
                        

                        <Link
                            to="/addcoupon"
                            className="btn btn-primary add-btn me-1"
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Link>
                      </Col>
                    </Row>
                  
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
                            <th className="name">Name</th>
                            <th className="name">Discount</th>
                            <th className="name">Type</th>
                            <th className="name">Start</th>
                            <th className="name">Expiry</th>
                            <th className="name">Status</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>

                        <tbody className="list form-check-all">
                          {currentItems.map((coupon, key) => (
                            <tr key={coupon.id}>
                              <th scope="row">
                                <div className="form-check">
                                  <td className="product-name">{key + 1}</td>
                                </div>
                              </th>
                              <td className="product-name">{coupon.name}</td>
                              <td className="product-name">
                                {coupon.discount}
                              </td>
                              <td className="product-name">{coupon.type}</td>
                              <td className="product-name">
                                {new Date(coupon.start).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td className="product-name">
                                {new Date(coupon.expiry).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </td>
                              <td>
                              {" "}
                              {coupon.active ? (
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
                                  <div className="edit">
                                    <Link
                                      to={`/editcoupon/${coupon._id}`}
                                      className="btn btn-sm btn-soft-info edit-item-btn"
                                    >
                                      <i className="ri-pencil-fill align-bottom" />
                                    </Link>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-soft-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        toggledeletemodal();
                                        setContentToDelete(coupon);
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
                      length: Math.ceil(CouponData.length / ITEMS_PER_PAGE),
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
                            Math.ceil(CouponData.length / ITEMS_PER_PAGE)
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

      {/* modal Delete Content */}
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
                handleDeleteCoupon(ContentToDelete._id);
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

export default Coupons;
