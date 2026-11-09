import React, { useState, useEffect, useCallback } from "react";
import {
  Col,
  Container,
  Form,
  Button,
  Spinner,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  PaginationLink,
  PaginationItem,
  Pagination,
  Row,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { isEmpty } from "lodash";
import Loader from "../../Components/Common/Loader";
import { ToastContainer } from "react-toastify";
import DeleteModal from "../../Components/Common/DeleteModal";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import {
  addCategory,
  addSubCategory,
  deleteSubCategory,
  getCategory,
  getSubCategory,
  updateCategory,
  updateSubCategory,
} from "../../helpers/backend_helper";
import BreadCrumb from "../../Components/Common/BreadCrumb";
// import { Category_IMAGE_LINK, USER_IMAGE_LINK } from "../../helpers/url_helper";
const ITEMS_PER_PAGE = 10;

const SubCategoryMaster = () => {
  document.title = "sub category Master";

  const [deleteModal, setDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recordForSubmit, setrecordForSubmit] = useState(null);
  const [errorBanner, setErrorBanner] = useState("");
  const [successBanner, setSuccessBanner] = useState("");
  const [buttnLoading, setButtnLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getSubCategory();
      setTableData(response);
      const res = await getCategory();
      setCategoryData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggle = useCallback(() => {
    if (showModal) {
      setShowModal(false);
      setrecordForSubmit(null);
    } else {
      setShowModal(true);
    }
  }, [showModal]);

  const handleDelete = (selectedCategory) => {
    console.log(selectedCategory);
    setrecordForSubmit(selectedCategory);
    setDeleteModal(true);
  };

  const handleDeleteCategory = async () => {
    if (recordForSubmit) {
      await deleteSubCategory(recordForSubmit);
      fetchData();
      setDeleteModal(false);
    }
  };

  const categoryValidation = Yup.object().shape({
    name: Yup.string().required("sub category is required."),
    Category: Yup.string().required("category is required."),
  });

  const searchSubCategories = (query) => {
    if (query) {
      const filtered = tableData.filter((subcategory) => {
        return subcategory.name.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteCategory()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Setup"
            parent="Manage Category"
            child="Sub Category"
          />
          <Row>
          <Col lg={12}>
          <Card id="orderList">
          
          
          <CardHeader className="card-header border-0">
              <div className="hstack mb-4">
                <h5 className="fw-semibold flex-grow-1 mb-0">
                  Sub Category Master
                </h5>
                <div className="hstack gap-2">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <Col className="col-lg mx-2">
                      <div className="search-box">
                        <input
                          type="text"
                          id="searchTaskList"
                          className="form-control search"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            searchSubCategories(e.target.value);
                          }}
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                    <Col className="col-lg-auto">
                      <button
                        className="btn btn-primary createTask"
                        type="button"
                        onClick={() => {
                          toggle();
                        }}
                      >
                        <i className="ri-add-fill align-bottom" /> Add
                      </button>
                    </Col>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <div>
                {isEmpty(tableData) && (
                  <div id="elmLoader">
                    {/* <div
                      className="spinner-border text-primary avatar-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div> */}
                    <Loader error={tableData}/>
                  </div>
                )}
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{width : "100px"}}>index</th>
                      <th>Category</th>
                      <th>Sub Category Title</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubCategories.length > 0
                      ? filteredSubCategories.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item.CategoryTitle}</td>
                            <td>{item.name}</td>
                            <td>
                              {" "}
                              {item.isActive ? (
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

                            <td>
                              <button
                                className="btn btn-sm btn-soft-info edit-list mx-1"
                                onClick={() => {
                                  setShowModal(true);
                                  setrecordForSubmit(item);
                                  setIsEdit(true);
                                  console.log(item);
                                }}
                              >
                                <i className="ri-pencil-fill align-bottom" />
                              </button>

                              <button
                                className="btn btn-sm btn-soft-danger remove-list"
                                onClick={() => handleDelete(item)}
                              >
                                <i className="ri-delete-bin-5-fill align-bottom" />
                              </button>
                            </td>
                          </tr>
                        ))
                      : currentItems.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{item.CategoryTitle}</td>
                            <td>{item.name}</td>
                            <td>
                              {" "}
                              {item.isActive ? (
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

                            <td>
                              <button
                                className="btn btn-sm btn-soft-info edit-list mx-1"
                                onClick={() => {
                                  setShowModal(true);
                                  setrecordForSubmit(item);
                                  setIsEdit(true);
                                  console.log(item);
                                }}
                              >
                                <i className="ri-pencil-fill align-bottom" />
                              </button>

                              <button
                                className="btn btn-sm btn-soft-danger remove-list"
                                onClick={() => handleDelete(item)}
                              >
                                <i className="ri-delete-bin-5-fill align-bottom" />
                              </button>
                            </td>
                          </tr>
                        ))}
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
                        length: Math.ceil(tableData.length / ITEMS_PER_PAGE),
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
                              Math.ceil(tableData.length / ITEMS_PER_PAGE)
                                ? prev
                                : prev + 1
                            )
                          }
                        />
                      </PaginationItem>
                    </Pagination>
                  </tbody>
                </table>
              </div>
              </CardBody>
          </Card>
          </Col>
          </Row>
        </Container>
      </div>

      <Modal
        id="createTask"
        isOpen={showModal}
        toggle={toggle}
        modalClassName="zoomIn"
        centered
        tabIndex="-1"
      >
        <ModalHeader toggle={toggle} className="p-3 bg-soft-success">
          {" "}
          {!!isEdit ? "Edit Category" : "create new sub category"}{" "}
        </ModalHeader>
        <ModalBody>
          {successBanner ? (
            <div class="alert alert-success" role="alert">
              {successBanner}
            </div>
          ) : null}
          {errorBanner ? (
            <div class="alert alert-danger" role="alert">
              {errorBanner}
            </div>
          ) : null}
          <Formik
            initialValues={{
              name: (recordForSubmit && recordForSubmit.name) || "",
              isActive: (recordForSubmit && recordForSubmit.isActive) || true,
              Category: (recordForSubmit && recordForSubmit.Category) || "",
            }}
            validationSchema={categoryValidation}
            onSubmit={async (values, { resetForm }) => {
              if (isEdit) {
                await updateSubCategory(values, recordForSubmit._id);
                setIsEdit(false);
              } else {
                await addSubCategory(values);
              }
              fetchData();
              toggle();
              resetForm();
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <div>
                <div>
                  <Form>
                    <Col md={12}>
                      <label className="modalLabel">category</label>
                      <select
                        name="Category"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.Category}
                        className="form-control inp_text modalInput"
                        id="Category"
                      >
                        {/* Add a default option or label */}
                        <option value="" disabled>
                          --select--
                        </option>
                        {/* Map through your category data to create dropdown options */}
                        {categoryData
                          ? categoryData.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            ))
                          : null}
                      </select>
                      {/* If validation is not passed, show errors */}
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {errors.Category && touched.Category && errors.Category}
                      </p>
                    </Col>
                    <Col md={12}>
                      <label className="modalLable">sub category title</label>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Enter sub category title"
                        className="form-control inp_text modalInput"
                        id="name"
                      />
                      {/* If validation is not passed show errors */}
                      <p style={{ color: "red", fontSize: "12px" }}>
                        {errors.name && touched.name && errors.name}
                      </p>
                    </Col>

                    <Col md={12}>
                      <div className="form-check mb-2">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id="active"
                          name="isActive"
                          checked={values.isActive}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Label className="form-check-label" htmlFor="active">
                          Is Active
                        </Label>
                      </div>
                    </Col>
                  </Form>
                  <div className="hstack gap-2 justify-content-end">
                    {!buttnLoading ? (
                      <React.Fragment>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          id="addNewTodo"
                          onClick={handleSubmit}
                        >
                          {!!isEdit ? "Update" : "save"}
                        </button>
                      </React.Fragment>
                    ) : (
                      <Button
                        color="primary"
                        className="btn-load"
                        outline
                        disabled
                      >
                        <span className="d-flex align-items-center">
                          <Spinner size="sm" className="flex-shrink-0">
                            {" "}
                            Loading...{" "}
                          </Spinner>
                          <span className="flex-grow-1 ms-2">Loading...</span>
                        </span>
                      </Button>
                    )}
                    <button
                      type="button"
                      className="btn btn-ghost-danger"
                      onClick={() => {
                        toggle();
                        setIsEdit(false);
                      }}
                    >
                      <i className="ri-close-fill align-bottom"></i> Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default SubCategoryMaster;
