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
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";

const ITEMS_PER_PAGE = 10;

const Content = () => {
  const { GetContent, DeleteContent } = useContext(SignContext);
  const [ContentData, setContentData] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [ContentToDelete, setContentToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const Getcontent = async () => {
    const res = await GetContent();
    console.log(res);

    const transformedData = res.Contents.map((content, index) => ({
      ...content,
      id: index + 1,
    }));
    setContentData(transformedData);
  };

  const handleDeleteContent = async (id) => {
    const res = await DeleteContent(id);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setContentToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      Getcontent();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = ContentData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    Getcontent();
  }, []);

  const searchSubCategories = (query) => {
    if (query) {
      const filtered = ContentData.filter((subcategory) => {
        return subcategory.contentType
          .toLowerCase()
          .includes(query.toLowerCase());
      });
      setFilteredSubCategories(filtered);
    } else {
      setFilteredSubCategories([]);
    }
  };

  document.title = "Contents";
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb grandParent="Setup" parent="CMS" child="Contents" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                  <h4 className="card-title mb-0">Contents</h4>

                  <Row className="align-items-center">
                    <Col className="col-lg-auto">
                      <div className="search-box">
                        <input
                          type="text"
                          id="searchTaskList"
                          className="form-control search"
                          placeholder="Search"
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
                        to="/addcontent"
                        className="btn btn-primary add-btn me-1"
                        id="create-btn"
                      >
                        <i className="ri-add-line align-bottom me-1"></i> Add
                      </Link>
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
                            <th className="name">Title</th>
                            <th className="name">Status</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>

                        <tbody className="list form-check-all">
                          {filteredSubCategories.length > 0?filteredSubCategories.map((content, key) => (
                            <tr key={content.id}>
                              <td className="product-name">{key + 1}</td>
                              <td className="product-name">
                                {content.contentType}
                              </td>
                              <td className="status">
                                {content.active === true ? (
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
                                      to={`/updatecontent/${content._id}`}
                                      className="btn btn-sm btn-soft-success edit-item-btn"
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
                                        setContentToDelete(content);
                                      }}
                                    >
                                      <i className="ri-delete-bin-5-fill align-bottom" />
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )):currentItems.map((content, key) => (
                            <tr key={content.id}>
                              <td className="product-name">{key + 1}</td>
                              <td className="product-name">
                                {content.contentType}
                              </td>
                              <td className="status">
                                {content.active === true ? (
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
                                      to={`/updatecontent/${content._id}`}
                                      className="btn btn-sm btn-soft-success edit-item-btn"
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
                                        setContentToDelete(content);
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
                      length: Math.ceil(ContentData.length / ITEMS_PER_PAGE),
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
                            Math.ceil(ContentData.length / ITEMS_PER_PAGE)
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
                Are you Sure You want to Remove this Content ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <button
              type="button"
              className="btn w-sm btn-danger"
              onClick={() => {
                handleDeleteContent(ContentToDelete._id);
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

export default Content;
