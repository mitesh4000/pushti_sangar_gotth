import React, { useCallback, useState, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Card, CardBody, Col, Row, CardHeader, Container, PaginationLink, PaginationItem, Pagination } from "reactstrap";
import { isEmpty } from "lodash";
import DeleteModal from "../../Components/Common/DeleteModal";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { deleteProduct, getProducts } from "../../helpers/backend_helper";
import { GET_PRODUCTS } from "../../store/product/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const ITEMS_PER_PAGE = 10;




const ProductMaster = () => {
  const navigate = useNavigate();
  const allProductData = useSelector((state) => state.Product.products);
  const url = `${process.env.REACT_APP_BASE_URL}`;

  // const url = `http://localhost:5000`;
  const [IsformActive, setIsformActive] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [productData, setProductData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [valuesForUpdate, setValuesForUpdate] = useState("");
  const [selectedForDelete, setSelectedForDelete] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const searchList = (e) => {
    let inputVal = e.toLowerCase();

    function filterItems(arr, query) {
      return arr.filter(function (el) {
        return (
          el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          el.sku.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });
    }

    let filterData = filterItems(allProductData, inputVal);
    setProductData(filterData);
    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("todo-task").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("todo-task").style.display = "block";
    }
  };

  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      setIsFetchingData(true);
      const productsResponse = await getProducts();

      dispatch({
        type: GET_PRODUCTS,
        payload: {
          actionType: "GET_PRODUCTS",
          data: productsResponse.products,
        },
      });

      setIsFetchingData(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setProductData(allProductData);
  }, [allProductData]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = productData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handledeleteProduct = async () => {
    if (selectedForDelete) {
      await deleteProduct(selectedForDelete);
      console.log(selectedForDelete);
      fetchData();
      setDeleteModal(false);
    }
  };

  document.title = "Products";

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handledeleteProduct()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <ToastContainer closeButton={false} />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Setup"
            parent="Products"
            child="All Products"
          />

          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <React.Fragment>
                <h4 className="card-title mb-0">Product Master</h4>
                <Row className="align-items-center">
                  <Col className="col-lg-auto">
                    <div className="search-box">
                      <input
                        type="text"
                        id="searchTaskList"
                        className="form-control search"
                        placeholder="Search by product name"
                        onKeyUp={(e) => searchList(e.target.value)}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  <Col className="col-lg-auto">
                    <button
                      className="btn btn-primary createTask"
                      type="button"
                      onClick={() => {
                        navigate("/add-product");
                      }}
                    >
                      <i className="ri-add-fill align-bottom" /> Add 
                    </button>
                  </Col>
                </Row>
              </React.Fragment>
            </CardHeader>

            <CardBody>
              <div
                className="todo-content position-relative px-4 mx-n4"
                id="todo-task"
              >
                {isEmpty(productData) &&
                  (isFetchingData ? (
                    <div id="elmLoader">
                      <div
                        className="spinner-border text-primary avatar-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div id="elmLoader" className="py-4 mt-4 text-center">
                      <div className="d-flex flex-column align-items-center">
                        <i
                          className="las la-exclamation-triangle"
                          style={{ fontSize: "48px" }}
                        ></i>

                        <h5 className="mt-4">Sorry No data to display</h5>
                      </div>
                    </div>
                  ))}

                <table className="table">
                  <thead className="table-active">
                    <tr>
                      <th scope="col">index</th>
                      <th scope="col">image</th>
                      <th scope="col">name</th>
                      <th scope="col">category</th>
                      <th className="price">Original Price</th>
                      <th className="price">Discounted</th>
                      <th className="var">Add Varaition</th>
                      <th scope="col">actions</th>
                    </tr>
                  </thead>

                  <tbody id="task-list">
                    {currentItems
                      ? currentItems.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>
                              <img
                                src={`${url}/products/${item.imageGallery[0]}`}
                                alt="Banner"
                                style={{
                                  width: "100px",
                                  height: "auto",
                                  maxHeight: "100px",
                                  objectFit: "cover",
                                  borderRadius: "3px",
                                }}
                              />
                            </td>
                            <td>
                              {" "}
                              <div>{item.name}</div>
                              <div>{`${item.sku}`}</div>
                            </td>
                            <td>{item.categoryTitle}</td>
                            <td>
                              {item.prices.calculatedPrice
                                ? item.prices.calculatedPrice
                                : "NA"}
                            </td>
                            <td>
                              {item.prices.discounted
                                ? item.prices.discounted
                                : "NA"}
                            </td>
                            <td>
                              <div className="hstack gap-2 text-center">
                              {item.isVariant === false ? (
  <button
    className="btn btn-sm btn-soft-warning edit-list"
    onClick={() => {
      navigate(`/addvariation/${item._id}`);
    }}
  >
    <i className="ri-file-edit-fill align-bottom" />
  </button>
) : (
  <span>Varient</span>
)}
                              </div>
                            </td>
                            <td>
                              <div className="hstack gap-2">
                                <button
                                  className="btn btn-sm btn-soft-info edit-list"
                                  onClick={() => {
                                    navigate(`/add-product/${item._id}`);
                                  }}
                                >
                                  <i className="ri-pencil-fill align-bottom" />
                                </button>

                                <button
                                  className="btn btn-sm btn-soft-danger remove-list"
                                  onClick={() => {
                                    setSelectedForDelete(item._id);
                                    setDeleteModal(true);
                                  }}
                                >
                                  <i className="ri-delete-bin-5-fill align-bottom" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : null}
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
                      length: Math.ceil(productData.length / ITEMS_PER_PAGE),
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
                            Math.ceil(productData.length / ITEMS_PER_PAGE)
                              ? prev
                              : prev + 1
                          )
                        }
                      />
                    </PaginationItem>
                  </Pagination>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProductMaster;
