import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { Card, CardBody, CardHeader, Col, Container, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import SignContext from "../../contextAPI/Context/SignContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
const ITEMS_PER_PAGE = 10;




const BlogCategory = () => {
  const { GetblogCategories , AddBlogCategory , DeleteBlogCategory ,UpdateBlogCateogry , getSpecificBlogCategorybyId } = useContext(SignContext);
  const [CategoryData, setCategoryData] = useState([]);
  const [modal, setModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [CategoryToDelete, setCategoryToDelete] = useState(null);
  const [EditModal, setEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [updatedCategoryData, setUpdatedCategoryData] = useState({
    name: "",
    active:"",
  });

  const [currentPage, setCurrentPage] = useState(1);


  const getCategories = async () => {
    const res = await GetblogCategories();
    // console.log(res);
    setCategoryData(res.blogCategories);
  };

  const getspecificCategory = async (id) => {
    const res = await getSpecificBlogCategorybyId(id);
    console.log(res);
    if (res.success) {
      setUpdatedCategoryData(res.data); // Update editUserInfo with fetched data
    } else {
      console.log(res.msg);
    }
  };

  const handleChange = (e) => {
    if (EditModal) {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setUpdatedCategoryData({
        ...updatedCategoryData,
        [name]: newValue,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const resUpdate = await UpdateBlogCateogry(updatedCategoryData , updatedCategoryData._id);
    console.log(resUpdate);
    if (resUpdate.success) {
      getCategories();
    //   (resUpdate.msg);
    } else {
    //   setError(resUpdate.msg);
    }
  };

  const addCategoryValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const handleSaveUserData = async (Values) => {
    const res = await AddBlogCategory(Values);
    console.log(res);
    if (res.success) {
        getCategories();
    }
  };

  const handleDeleteGalleryCategory = async (id) => {
    const res = await DeleteBlogCategory(id);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setCategoryToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      getCategories();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const togglemodal = () => {
    setModal(!modal);
  };

  const toggleEditmodal = (id) => {
    setEditModal(!modal);
    getspecificCategory(id);
    console.log(id);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = CategoryData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  useEffect(() => {
    getCategories();
    
  }, []);

  document.title = "Blog Category"
  


  return (
    <>
        <div className="page-content">
        <Container fluid>
        <BreadCrumb
            grandParent="Setup"
            parent="CMS"
            child="Blog Category"
          />
           <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Blog Category</h4>
                  <Row className="align-items-center">
                    <Col className="col-lg-auto">
                      <div className="search-box">
                        <input
                          type="text"
                          id="searchTaskList"
                          className="form-control search"
                          placeholder="Search..."
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
                        <i className="ri-add-line align-bottom me-1"></i> Add
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
                            <th scope="col">Index</th>
                            {/* <th className="name">Image</th> */}
                            <th className="name">Category-Name</th>
                            <th className="name">Status</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {currentItems?currentItems.map((color, key) => (
                            <tr key={color.id}>
                              <td className="product-name"> {key + 1}</td>
                              {/* <td className="Gallery-image">
                                <img
                                  src={`${url}/color/${color.image}`}
                                  alt="ImagePath"
                                  style={{
                                    width: "100px",
                                    height: "auto",
                                    maxHeight: "100px",
                                    objectFit: "cover",
                                    borderRadius: "3px",
                                  }}
                                />
                              </td> */}
                              <td className="product-name">{color.name}</td>
                              <td className="status">
                                {color.active === true ? (
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
                                <div className="hstack gap-2">
                                <button
                                  className="btn btn-soft-info btn-sm me-2"
                                  onClick={() => toggleEditmodal(color._id)}
                                >
                                  <i className="ri-pencil-line"></i>
                                </button>
                                  <button
                                    className="btn btn-sm btn-soft-danger remove-list"
                                    onClick={() => {
                                      toggledeletemodal();
                                      setCategoryToDelete(color);
                                    }}
                                  >
                                    <i className="ri-delete-bin-5-fill align-bottom" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )):null}
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
                      length: Math.ceil(currentItems.length / ITEMS_PER_PAGE),
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
                            Math.ceil(currentItems.length / ITEMS_PER_PAGE)
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
            Add Category
          </h5>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={addCategoryValidationSchema}
            onSubmit={async (values, { resetForm }) => {
              await handleSaveUserData(values);
              resetForm();
              togglemodal();
              toast.success("Category Added Successfully", { autoClose: 3000 });
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
                    Name*
                  </Label>
                  <Field
                    type="text"
                    className="form-control"
                    id="Name"
                    name="name"
                    placeholder="Blog Category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <p className="error" style={{ color: "red" }}>
                    {errors.name && touched.name && errors.name}
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
            Edit Cataegory
          </h5>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={(e) => handleUpdate(e)}>
            

            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="Name"
                placeholder="Name"
                name="name"
                value={updatedCategoryData.name}
                onChange={(e) => {
                  handleChange(e);
                }}
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
                    onChange={handleChange}
                    checked={updatedCategoryData.active}
                  />
                  <Label className="form-check-label" htmlFor="activeStatus">
                    Active
                  </Label>
                </div>
              </div>
            </div>

            <ModalFooter>
              <button
                type="submit"
                className="btn btn-success"
                onClick={() => {
                  setEditModal(!EditModal);
                }}
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
                handleDeleteGalleryCategory(CategoryToDelete._id);
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

export default BlogCategory;
