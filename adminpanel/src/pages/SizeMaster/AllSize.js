import React, { useContext, useEffect, useState } from "react";
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
  ModalFooter,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ITEMS_PER_PAGE = 10;

const AllSize = () => {

  const { Getsize, DeleteSize , AddSize } = useContext(SignContext);
  const [SizeData, setSizeData] = useState([]);
  const [modal, setModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [SizeToDelete, setSizeToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const addSizeValidationSchema = Yup.object().shape({
    size: Yup.string().required("size is required"),
  });

  const handleSaveUserData = async (Values) => {
    const res = await AddSize(Values);
    console.log(res);
    if (res.success) {
      getsizes();
    }
  };

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const getsizes = async () => {
    const res = await Getsize();
    console.log(res);

    const transformedData = res.sizes.map((sizes, index) => ({
      ...sizes,
      id: index + 1,
    }));
    console.log(transformedData);
    setSizeData(transformedData);
  };

  const togglemodal = () => {
    setModal(!modal);
  };

  const handleDeleteGalleryCategory = async (id) => {
    const res = await DeleteSize(id);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setSizeToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      getsizes();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = SizeData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  useEffect(() => {
    getsizes();
  }, []);

  document.title = "Size-Details";


  return (

    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb grandParent="Setup" parent="AllSizes" child="Size Details" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Size Details</h4>
                    <Row className="align-items-center">
                      <Col className="col-lg-auto">
                        <div className="search-box">
                          <input
                            type="text"
                            id="searchTaskList"
                            className="form-control search"
                            placeholder="Search.."
                            // onKeyUp={(e) => searchList(e.target.value)}
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col className="col-lg-auto">
                        

                      <Link
                            className="btn btn-primary add-btn me-1"
                            id="create-btn"
                            onClick={togglemodal}
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Link>
                      </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                  <div id="GalleryList">
                    
                    <div className="table-responsive table-card mt-1 mb-3">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th scope="col">
                           Index
                            </th>
                            {/* <th className="name">Image</th> */}
                            <th className="name">Size</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {currentItems.map((color,key) => (
                            <tr key={color.id}>
                              
                              <td className="product-name"> {key+1}</td>
                      
                              <td className="product-name">
                                {color.size}
                              </td>
                              
                              <td>
                            <div className="hstack gap-2">
                              <button
                                className="btn btn-sm btn-soft-danger remove-list"
                                onClick={() => {
                                  toggledeletemodal();
                                  setSizeToDelete(color);
                                }}
                              >
                                <i className="ri-delete-bin-5-fill align-bottom" />
                              </button>
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
                      length: Math.ceil(SizeData.length / ITEMS_PER_PAGE),
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
                            Math.ceil(SizeData.length / ITEMS_PER_PAGE)
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
            Add Size
          </h5>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              size: "",
            }}
            validationSchema={addSizeValidationSchema}
            onSubmit={async (values, { resetForm }) => {
              await handleSaveUserData(values);
              resetForm();
              togglemodal();
              toast.success("Size Added Successfully", { autoClose: 3000 });
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
                    Size in cm*
                  </Label>
                  <Field
                    // type="text"
                    className="form-control"
                    id="Name"
                    name="size"
                    placeholder="size"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.size}
                  />
                  <p className="error" style={{ color: "red" }}>
                    {errors.size && touched.size && errors.size}
                  </p>
                </div>
                <ModalFooter>
                  
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      setModal(!modal);
                    }}
                  >
                    Close
                  </button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>

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
                Are you Sure You want to Remove this Gallery-Items ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            
            <button
              type="button"
              className="btn w-sm btn-danger"
              onClick={() => {
                handleDeleteGalleryCategory(SizeToDelete._id);
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
  )
}

export default AllSize