import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
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
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";

const ITEMS_PER_PAGE = 10;

const ManageGalleryCat = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  // console.log(url)
  const { GetGalleryCat, DeleteGalleryCat } = useContext(SignContext);
  const [GalleryData, setGalleryData] = useState([]);
  const [allGalleryData, setAllGalleryData] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [CategoryToDelete, setCategoryToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const searchSubCategories = (query) => {
    if (query) {
      const filtered = GalleryData.filter((subcategory) => {
        return subcategory.gallaryCategoryTitle
          .toLowerCase()
          .includes(query.toLowerCase());
      });
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  };

  const navigate = useNavigate();

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const searchList = (e) => {
    let inputVal = e.toLowerCase();

    function filterItems(arr, query) {
      return arr.filter(function (el) {
        return el.imageTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
    }

    let filterData = filterItems(allGalleryData, inputVal);
    setGalleryData(filterData);
    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("customerTable").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("customerTable").style.display = "block";
    }
  };

  const Getgallerycat = async () => {
    const res = await GetGalleryCat();

    console.log(res);

    const transformedData = res.GalleryCat.map((gallery, index) => ({
      ...gallery,
      id: index + 1,
    }));
    console.log(transformedData);
    setGalleryData(transformedData);
    setAllGalleryData(transformedData);
  };

  const handleDeleteGalleryCategory = async (id) => {
    const res = await DeleteGalleryCat(id);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setCategoryToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      Getgallerycat();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = GalleryData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    Getgallerycat();
  }, []);

  document.title = "Gallery";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Setup"
            parent="Gallery"
            child="Gallery Category"
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Gallery Category</h4>
                  <Row className="align-items-center">
                    <Col className="col-lg-auto">
                      <div className="search-box">
                        <input
                          type="text"
                          id="searchTaskList"
                          className="form-control search"
                          placeholder="Search by title"
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
                      <Link
                        to="/creategallery"
                        className="btn btn-primary add-btn me-1"
                        id="create-btn"
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
                            <th className="name">Index</th>
                            <th className="name">Category-Image</th>
                            <th className="name">Category-Title</th>
                            <th className="name">Status</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {filteredSubCategories.length > 0?filteredSubCategories.map((gallery, key) => (
                            <tr key={gallery.id}>
                              <th scope="row">
                                <td className="product-name">{key + 1}</td>
                              </th>
                              <td className="Gallery-image">
                                <img
                                  src={`${url}/gallery-images/${gallery.imagePath}`}
                                  alt="ImagePath"
                                  style={{
                                    width: "100px",
                                    height: "auto",
                                    maxHeight: "70px",
                                    objectFit: "cover",
                                    borderRadius: "3px",
                                  }}
                                />
                              </td>
                              <td className="product-name">
                                {gallery.gallaryCategoryTitle}
                              </td>
                              <td className="status">
                                {gallery.active === true ? (
                                  <span className="badge badge-soft-success badge-border">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge badge-soft-danger badge-border">
                                    Inactive
                                  </span>
                                )}
                              </td>

                              {/* Add other columns here as needed */}

                              <td>
                                <div className="hstack gap-2">
                                  <button
                                    className="btn btn-sm btn-soft-info edit-list"
                                    onClick={() => {
                                      navigate(
                                        `/editgallerycat/${gallery._id}`
                                      );
                                    }}
                                  >
                                    <i className="ri-pencil-fill align-bottom" />
                                  </button>

                                  <button
                                    className="btn btn-sm btn-soft-danger remove-list"
                                    onClick={() => {
                                      toggledeletemodal();
                                      setCategoryToDelete(gallery);
                                    }}
                                  >
                                    <i className="ri-delete-bin-5-fill align-bottom" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )):currentItems.map((gallery, key) => (
                            <tr key={gallery.id}>
                              <th scope="row">
                                <td className="product-name">{key + 1}</td>
                              </th>
                              <td className="Gallery-image">
                                <img
                                  src={`${url}/gallery-images/${gallery.imagePath}`}
                                  alt="ImagePath"
                                  style={{
                                    width: "100px",
                                    height: "auto",
                                    maxHeight: "70px",
                                    objectFit: "cover",
                                    borderRadius: "3px",
                                  }}
                                />
                              </td>
                              <td className="product-name">
                                {gallery.gallaryCategoryTitle}
                              </td>
                              <td className="status">
                                {gallery.active === true ? (
                                  <span className="badge badge-soft-success badge-border">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge badge-soft-danger badge-border">
                                    Inactive
                                  </span>
                                )}
                              </td>

                              {/* Add other columns here as needed */}

                              <td>
                                <div className="hstack gap-2">
                                  <button
                                    className="btn btn-sm btn-soft-info edit-list"
                                    onClick={() => {
                                      navigate(
                                        `/editgallerycat/${gallery._id}`
                                      );
                                    }}
                                  >
                                    <i className="ri-pencil-fill align-bottom" />
                                  </button>

                                  <button
                                    className="btn btn-sm btn-soft-danger remove-list"
                                    onClick={() => {
                                      toggledeletemodal();
                                      setCategoryToDelete(gallery);
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
                      length: Math.ceil(GalleryData.length / ITEMS_PER_PAGE),
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
                            Math.ceil(GalleryData.length / ITEMS_PER_PAGE)
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
                Are you Sure You want to Remove this Gallery Category ?
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

export default ManageGalleryCat;
