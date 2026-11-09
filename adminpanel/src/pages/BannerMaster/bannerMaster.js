import React, { useState, useEffect, useCallback } from "react";
import {
  Col,
  Container,
  Card,
  CardBody,
  Form,
  CardHeader,
  FormFeedback,
  Input,
  Modal,
  Button,
  ModalBody,
  Spinner,
  ModalHeader,
  Row,
  Label,
  PaginationLink,
  PaginationItem,
  Pagination,
} from "reactstrap";
import Loader from "../../Components/Common/Loader";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { ToastContainer } from "react-toastify";
import DeleteModal from "../../Components/Common/DeleteModal";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import {
  addNewBanner,
  deleteBanner,
  getBanner,
  updateBanner,
} from "../../helpers/backend_helper";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import FilePondPluginFilePoster from "filepond-plugin-file-poster";

// import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Nodata from "../../Components/Common/Nodata";
import { Link } from "react-router-dom";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview
  // FilePondPluginFilePoster
);

const ITEMS_PER_PAGE = 10;


const BannerMaster = () => {
  document.title = "Banner Master";
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const [deleteModal, setDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [recordForSubmit, setrecordForSubmit] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const [valuesForUpdate, setValuesForUpdate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [buttnLoading, setButtnLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searchSubCategories = (query) => {
    if (query) {
      const filtered = tableData.filter((subcategory) => {
        return subcategory.bannerTitle.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  };
  

  const fetchData = async () => {
    try {
      const response = await getBanner();
      setTableData(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setFetchingData(true);
    fetchData();
    setFetchingData(false);

    setFiles([]);
  }, [isEdit]);

  const toggle = useCallback(() => {
    if (showModal) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [showModal]);

  const handledeleteProduct = async () => {
    if (valuesForUpdate) {
      await deleteBanner(valuesForUpdate._id);
      fetchData();
      setDeleteModal(false);
    }
  };

  const BannerValidation = Yup.object().shape({
    bannerTitle: Yup.string().required("banner title required"),
    bannerType: Yup.string().required("banner type required"),
  });

  const bannerForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      bannerTitle: (valuesForUpdate && valuesForUpdate.bannerTitle) || "",
      bannerType: (valuesForUpdate && valuesForUpdate.bannerType) || "",
      bannerText: (valuesForUpdate && valuesForUpdate.bannerText) || "",
      description: (valuesForUpdate && valuesForUpdate.description) || "",
    },
    validationSchema: BannerValidation,
    onSubmit: async (values) => {
      
      setSubmitted(true);
      const formData = new FormData();
      formData.append("bannerTitle", values.bannerTitle);
      formData.append("bannerType", values.bannerType);
      formData.append("bannerText", values.bannerText);
      formData.append("description", values.description);
      if (files.length > 0) {
        formData.append("image",files[0].file);
      }
      setButtnLoading(true);
      if (isEdit) {
        console.log(valuesForUpdate)
        await updateBanner(formData, valuesForUpdate._id);
      } else {
        await addNewBanner(formData);
      }
      setButtnLoading(false);
      setIsEdit(false);
      setSubmitted(false);
      bannerForm.resetForm();
      fetchData();
      toggle();
    },
  });

  return (
    <div className="page-content">
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handledeleteProduct()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <Container fluid>
        <BreadCrumb
          grandParent="Setup"
          parent="CMS"
          child="Banner Master"
        />
        <Row>
          <Col lg={12}>
            <Card id="orderList">
              <CardHeader className="d-flex justify-content-between align-items-center">
               
                  <h5 className="card-title mb-0 flex-grow-1">All Banners</h5>

                  <Row className="g-4 mb-3">
                    <Col className="col-sm">
                      <div className="d-flex justify-content-sm-end">
                        <div className="search-box ms-2">
                          <input
                            type="text"
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
                      </div>
                    </Col>
                    <Col className="col-sm-auto">
                      <div>
                        <Link
                          className="btn btn-primary add-btn me-1"
                          id="create-btn"
                          onClick={() => {
                            setIsEdit(false);
                            setValuesForUpdate("");
                            setFiles([]);
  
                            toggle();
                          }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  
                
              </CardHeader>
              <CardBody className="">
                <div>
                {tableData.length ? (
                  <table className="table">
                    <thead className="table-active">
                      <tr>
                        <th>index</th>
                        <th>banner image</th>
                        <th>banner title</th>
                        <th>banner type</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filteredSubCategories.length > 0?filteredSubCategories.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>
                              <img
                                src={`${url}/banner/${item.image}`}
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
                            <td>{item.bannerTitle}</td>
                            <td>{item.bannerType}</td>
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
                                  setIsEdit(true);
                                  setValuesForUpdate(item);
                                  setShowModal(true);
                                }}
                              >
                                <i className="ri-pencil-fill align-bottom" />
                              </button>
                              <button
                                className="btn btn-sm btn-soft-danger remove-list mx-1"
                                onClick={() => {
                                  setValuesForUpdate(item);
                                  setDeleteModal(true);
                                }}
                              >
                                <i className="ri-delete-bin-5-fill align-bottom" />
                              </button>
                            </td>
                          </tr>
                        )):currentItems.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>
                              <img
                                src={`${url}/banner/${item.image}`}
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
                            <td>{item.bannerTitle}</td>
                            <td>{item.bannerType}</td>
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
                                  setIsEdit(true);
                                  setValuesForUpdate(item);
                                  setShowModal(true);
                                }}
                              >
                                <i className="ri-pencil-fill align-bottom" />
                              </button>
                              <button
                                className="btn btn-sm btn-soft-danger remove-list mx-1"
                                onClick={() => {
                                  setValuesForUpdate(item);
                                  setDeleteModal(true);
                                }}
                              >
                                <i className="ri-delete-bin-5-fill align-bottom" />
                              </button>
                            </td>
                          </tr>
                        ))
                              }
                    </tbody>
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
                  </table>
                  ) : fetchingData ? (
                    <Loader error={tableData} />
                  ) : (
                    <Card>

                      {/* <Nodata></Nodata> */}

                      <div id="elmLoader">
                        <div
                          className="spinner-border text-primary avatar-sm"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>

                    </Card>
                  )}
                </div>
                <Modal
                  id="showModal"
                  isOpen={showModal}
                  toggle={toggle}
                  centered
                >
                  <ModalHeader className="bg-light p-3" toggle={toggle}>
                    {!!isEdit ? "Edit Banner" : "Add Banner"}
                  </ModalHeader>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      bannerForm.handleSubmit();
                      return false;
                    }}
                  >
                    <ModalBody>
                      <div className="mb-3">
                        <FilePond
                          files={files}
                          onupdatefiles={setFiles}
                          allowMultiple={false}
                          maxFiles={3}
                          name="files"
                          className="filepond filepond-input-multiple"
                          allowFilePoster={true}
                        ></FilePond>
                        <img
                          src={
                            files.length === 0
                              ? `${url}/banner/${valuesForUpdate.image}`
                              : null
                          }
                          alt=""
                          style={{
                            width: "450px",
                            height: "auto",
                            maxHeight: "250px",
                            objectFit: "cover",
                            borderRadius: "3px",
                          }}
                        />

                        {submitted && files.length === 0 ? (
                          <p style={{ color: "red" }}>Please select an image</p>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="bannerTitle" className="form-label">
                          banner title*
                        </Label>
                        <Input
                          name="bannerTitle"
                          id="bannerTitle"
                          className="form-control"
                          placeholder="Enter Banner title"
                          type="text"
                          onChange={bannerForm.handleChange}
                          onBlur={bannerForm.handleBlur}
                          value={bannerForm.values.bannerTitle || ""}
                          invalid={
                            bannerForm.touched.bannerTitle &&
                            bannerForm.errors.bannerTitle
                              ? true
                              : false
                          }
                        />
                        {bannerForm.touched.bannerTitle &&
                        bannerForm.errors.bannerTitle ? (
                          <FormFeedback type="invalid">
                            {bannerForm.errors.bannerTitle}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="name" className="form-label">
                          banner type*
                        </Label>
                        <select
                          className="form-select"
                          id="bannerType"
                          name="bannerType"
                          aria-label="bannerType"
                          onChange={bannerForm.handleChange}
                          onBlur={bannerForm.handleBlur}
                          value={bannerForm.values.bannerType || ""}
                        >
                          <option value="">Select banner type</option>
                          <option value="top-right">top-right</option>
                          <option value="carousel">carousel</option>
                          <option value="bottom">bottom</option>
                        </select>
                        {bannerForm.touched.bannerType && bannerForm.errors.bannerType ? (
                          <p style={{ color: "red", fontSize: "12px" }}>
                          {bannerForm.errors.bannerType && bannerForm.touched.bannerType && bannerForm.errors.bannerType}
                        </p>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="bannerText" className="form-label">
                          banner text
                        </Label>
                        <Input
                          name="bannerText"
                          id="bannerText"
                          className="form-control"
                          placeholder="bannerText"
                          type="text"
                          onChange={bannerForm.handleChange}
                          onBlur={bannerForm.handleBlur}
                          value={bannerForm.values.bannerText || ""}
                          invalid={
                            bannerForm.touched.bannerText &&
                            bannerForm.errors.bannerText
                              ? true
                              : false
                          }
                        />
                        {bannerForm.touched.bannerText &&
                        bannerForm.errors.bannerText ? (
                          <FormFeedback type="invalid">
                            {bannerForm.errors.bannerText}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="id-field" className="form-label">
                          description
                        </Label>
                        <Input
                          name="description"
                          id="description"
                          className="form-control"
                          placeholder="Enter description"
                          type="textarea"
                          onChange={bannerForm.handleChange}
                          onBlur={bannerForm.handleBlur}
                          value={bannerForm.values.description || ""}
                          invalid={
                            bannerForm.touched.description &&
                            bannerForm.errors.description
                              ? true
                              : false
                          }
                        />
                        {bannerForm.touched.description &&
                        bannerForm.errors.description ? (
                          <FormFeedback type="invalid">
                            {bannerForm.errors.description}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </ModalBody>
                    <div className="modal-footer">
                      <div className="hstack gap-2 justify-content-end">
                        

                        {!buttnLoading ? (
                          <React.Fragment>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              id="addNewTodo"
                            >
                              {!!isEdit ? "Update" : "Add Banner"}
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
                              <span className="flex-grow-1 ms-2">
                                Loading...
                              </span>
                            </span>
                          </Button>
                        )}
                        <button
                          type="button"
                          className="btn btn-light"
                          onClick={() => {
                            setShowModal(false);
                            setValuesForUpdate("");
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </Form>
                </Modal>
                <ToastContainer closeButton={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BannerMaster;
