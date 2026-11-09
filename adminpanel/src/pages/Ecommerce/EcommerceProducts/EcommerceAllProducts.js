import React, { useContext, useEffect, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
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
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { BiDotsHorizontal } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { MdEdit, MdDelete } from "react-icons/md";
// import { FaEdit, FaTrash } from "react-icons/fa";
import SignContext from "../../../contextAPI/Context/SignContext";
import { deleteProduct, getProducts } from "../../../helpers/backend_helper";
// import ReactPaginate from 'react-paginate';

const EcommerceAllProducts = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  // const params = useParams();
  const [ProductData, setProductData] = useState([]);
  const [categoryNameMapping, setCategoryNameMapping] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };


  const fetchData = async () => {
    try {
      const res = await getProducts();
      setProductData(res.products);
      console.log(res)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  // Function to handle product deletion
  const handleDeleteProduct = async (ProductId) => {
    const res = await deleteProduct(ProductId);
    console.log(res);
    if (res.success) {

      setProductToDelete(null);
      setDeleteModal(false);
      fetchData();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  document.title = "Products | Pushtishangar";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="All Products" pageTitle="Ecommerce" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Products</h4>
                </CardHeader>

                <CardBody>
                  <div id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-sm-auto">
                        <div>
                          <Link
                            to="/addproduct"
                            className="btn btn-success add-btn me-1"
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Link>
                          {/* <Button
                          className="btn btn-soft-danger"
                          // onClick="deleteMultiple()"
                        >
                          <i className="ri-delete-bin-2-line"></i>
                        </Button> */}
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-card mt-1 mb-3">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                           
                            <th className="name">index</th>
                            <th className="Image">Image</th>
                            <th className="name">Name</th>
                            <th className="Category">Category</th>
                            <th className="stock">Stock</th>
                            <th className="price">Original Price</th>
                            <th className="price">Discounted</th>
                            <th className="status">Status</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {ProductData ? ProductData.map((product) => (
                            <tr key={product._id}>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="chk_child"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="product-image">
                                <div
                                  style={{
                                    maxWidth: "50px",
                                    maxHeight: "50px",
                                    overflow: "hidden",
                                    display: "inline-block",
                                  }}
                                >
                                  <img
                                    src={`${url}/products/${product.imageGallery[0]}`}
                                    alt="productImage"
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="product-name">{product.name}</td>


                              <td className="category">
                                {categoryNameMapping[product.category]}
                              </td>
                              <td className="stock">{product.stock.quantity}</td>
                              <td className="original-price">
                                ₹{product.prices.original}
                              </td>
                              <td className="discounted-price">
                                ₹{product.prices.discounted}
                              </td>
                              <td className="status">
                                {product.isActive === true ? (
                                  <span
                                    className="badge badge-soft"
                                    style={{
                                      backgroundColor: "#28a745",
                                      color: "white",
                                    }}
                                  >
                                    Active
                                  </span>
                                ) : (
                                  <span
                                    className="badge badge-soft"
                                    style={{
                                      backgroundColor: "#dc3545",
                                      color: "white",
                                    }}
                                  >
                                    Inactive
                                  </span>
                                )}
                              </td>

                              {/* Add other columns here as needed */}
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <Link
                                      to={`/editproduct/${product._id}`}
                                      className="btn btn-sm btn-success edit-item-btn"
                                    >
                                      Edit
                                    </Link>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-danger remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        toggledeletemodal();
                                        setProductToDelete(product);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )):null}
                        </tbody>
                      </table>
                      <div className="noresult" style={{ display: "none" }}>
                        <div className="text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#121331,secondary:#08a88a"
                            style={{ width: "75px", height: "75px" }}
                          ></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">
                            We've searched more than 150+ Orders We did not find
                            any orders for you search.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"><li>1</li></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

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
                Are you Sure You want to Remove this Product ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-light"
              onClick={() => {
                setDeleteModal(!deletemodal);
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn w-sm btn-danger"
              onClick={() => {
                handleDeleteProduct(productToDelete._id);
                setDeleteModal(false);
              }}
            >
              Yes, Delete It!
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EcommerceAllProducts;
