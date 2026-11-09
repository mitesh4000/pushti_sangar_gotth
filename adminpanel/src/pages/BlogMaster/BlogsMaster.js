import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import JoditEditor from "jodit-react";
import {
  Card,
  CardBody,
  Col,
  Row,
  FormFeedback,
  CardHeader,
  Form,
  Container,
  Label,
  Spinner,
  Button,
  Input,
  PaginationLink,
  PaginationItem,
  Pagination,
} from "reactstrap";
import FeatherIcon from "feather-icons-react";
import { isEmpty } from "lodash";
import DeleteModal from "../../Components/Common/DeleteModal";

import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";

import * as Yup from "yup";
import {
  getBlog,
  addBlog,
  updateBlog,
  deleteBlog,
} from "../../helpers/backend_helper";
import Dropzone from "react-dropzone";
import SignContext from "../../contextAPI/Context/SignContext";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const ITEMS_PER_PAGE = 10;

const BlogMaster = () => {
  const { GetblogCategories } = useContext(SignContext);
  const [CategoryData, setCategoryData] = useState([]);
  const [blogContent, setContent] = useState("");
  const [IsformActive, setIsformActive] = useState(false);
  const [selectedForUpdate, setselectedForUpdate] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  // const [logs, setLogs] = useState([]);
  const [BlogData, setBlogData] = useState([]);
  const [previewImage, setpreviewImage] = useState(null);
  const [selectedFile, setselectedFile] = useState([]);
  const [buttnLoading, setButtnLoading] = useState(false);
  const [allBlogData, setallBlogData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = BlogData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const url = process.env.REACT_APP_BASE_URL;
  const BLOG_IMAGE_LINK = `${url}/blog-images/`;

  const getCategories = async () => {
    const res = await GetblogCategories();
    // console.log(res);
    setCategoryData(res.blogCategories);
  };

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  function convertToYYYYMMDD(dateTimeString) {
    if (!dateTimeString) return ""; // Handle empty or undefined values

    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleEditorChange = (content) => {
    // Update the formik field value with the new content
    // setContent(content)
    formik.setFieldValue("blog", content);
    // formik.setFieldValue("content", content);
  };

  const fetchData = async () => {
    try {
      setIsFetchingData(true);
      const response = await getBlog();
      setallBlogData(response.data);
      setBlogData(response.data);
      setIsFetchingData(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const toggle = useCallback(() => {
    if (IsformActive) {
      setIsformActive(false);
    } else {
      setIsformActive(true);
    }
  }, [IsformActive]);

  useEffect(() => {
    if (!BlogData.length) {
      fetchData();
    }
    getCategories();
  }, [getBlog]);

  const handleDeleteModal = (itemForDelete) => {
    setselectedForUpdate(itemForDelete);
    setDeleteModal(true);
  };

  const searchList = (e) => {
    let inputVal = e.toLowerCase();

    function filterItems(arr, query) {
      return arr.filter(function (el) {
        return (
          el.blogFeed.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          el.blogTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          el.description.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });
    }

    let filterData = filterItems(allBlogData, inputVal);
    setBlogData(filterData);
    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("todo-task").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("todo-task").style.display = "block";
    }
  };

  const handledeleteBlog = async () => {
    if (selectedForUpdate) {
      await deleteBlog(selectedForUpdate._id);
      fetchData();
      setDeleteModal(false);
    }
  };

  const handleAdd = () => {
    setpreviewImage(null);
    setselectedForUpdate("");
    toggle();
  };

  const handleEdit = useCallback(
    (arg) => {
      setIsEdit(true);

      const valuesForUpdate = arg;

      setselectedForUpdate({
        _id: valuesForUpdate._id,
        blogFeed: valuesForUpdate.blogFeed,
        blogTitle: valuesForUpdate.blogTitle,
        blog: valuesForUpdate.blog,
        blogCategory: valuesForUpdate.blogCategory,

        date: valuesForUpdate.date,
        active: valuesForUpdate.active,
        description: valuesForUpdate.description,
      });
      setpreviewImage(BLOG_IMAGE_LINK + valuesForUpdate.imagePath);

      setContent(valuesForUpdate.blog);
      toggle();
    },
    [toggle]
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      blogFeed: (selectedForUpdate && selectedForUpdate.blogFeed) || "",
      blogTitle: (selectedForUpdate && selectedForUpdate.blogTitle) || "",
      date: (selectedForUpdate && selectedForUpdate.date) || "",
      blog: (selectedForUpdate && selectedForUpdate.blog) || "",
      blogCategory: (selectedForUpdate && selectedForUpdate.blogCategory) || "",
      description: (selectedForUpdate && selectedForUpdate.description) || "",
      imagePath: previewImage || "",
    },
    validationSchema: Yup.object({
      blogFeed: Yup.string().required("required"),
      blogTitle: Yup.string().required("required"),
      date: Yup.string().required("required"),
    }),

    onSubmit: async (values) => {
      setButtnLoading(true);

      const formData = new FormData();
      formData.append("blogFeed", values.blogFeed);
      formData.append("blogTitle", values.blogTitle);
      formData.append("date", values.date);
      formData.append("blog", values.blog);
      formData.append("blogCategory", values.blogCategory);
      formData.append("description", values.description);
      formData.append("active", values.active);
      if (selectedFile.length !== 0) {
        formData.append("imagePath", selectedFile);
      }
      console.log(formData);
      if (isEdit) {
        await updateBlog(formData, selectedForUpdate._id);
        formik.resetForm();
      } else {
        await addBlog(formData);
        formik.resetForm();
      }
      setButtnLoading(false);

      fetchData();
      toggle();
    },
  });

  document.title = "Blogs";

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handledeleteBlog()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <ToastContainer closeButton={false} />
      <div className="page-content">
        <Container fluid>
        <BreadCrumb
          grandParent="Setup"
          parent="CMS"
          child="Blog Master"
        />
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center">
              {!IsformActive ? (
                <React.Fragment>
                  <h4 className="card-title mb-0">Blog Master</h4>
                  <Row className="align-items-center">
                    <Col className="col-lg-auto">
                      <div className="search-box">
                        <input
                          type="text"
                          id="searchTaskList"
                          className="form-control search"
                          placeholder="Search"
                          onKeyUp={(e) => searchList(e.target.value)}
                        />
                        <i className="ri-search-line search-icon"></i>
                      </div>
                    </Col>
                    <Col className="col-lg-auto">
                      <button
                        className="btn btn-primary createTask"
                        type="button"
                        onClick={() => handleAdd()}
                      >
                        <i className="ri-add-fill align-bottom" /> Add
                      </button>
                    </Col>
                  </Row>
                </React.Fragment>
              ) : !isEdit ? (
                <h4 className="card-title mb-0">Add Blog</h4>
              ) : (
                <h4 className="card-title mb-0">update Blog</h4>
              )}
            </CardHeader>
            {IsformActive ? (
              <CardBody>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                    return false;
                  }}
                >
                  <Row>
                    <Col md={12}>
                      <Dropzone
                        className="mt=10"
                        onDrop={(acceptedFiles) => {
                          const file = acceptedFiles[0];
                          setselectedFile(file);
                          setpreviewImage(URL.createObjectURL(file));
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone dz-clickable">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <input
                                {...getInputProps()}
                                accept="image/*"
                                multiple="false"
                              />

                              <div>
                                {previewImage ? (
                                  <div
                                    style={{
                                      maxWidth: "100%",
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <img
                                      src={previewImage}
                                      alt="Selected"
                                      style={{ maxWidth: "300px" }}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <div className="mb-3">
                                      <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                    </div>
                                    <h4>Drop files here or click to upload.</h4>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                    </Col>

                    <Col md={3}>
                      <div className="mb-3">
                        <Label htmlFor="blogFeedinput" className="form-label">
                          Author
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="full name ofAuthor"
                          id="blogFeed"
                          name="blogFeed"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.blogFeed || ""}
                        />
                        {formik.touched.blogFeed && formik.errors.blogFeed ? (
                          <FormFeedback type="invalid">
                            {formik.errors.blogFeed}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="mb-3">
                        <Label htmlFor="dateinput" className="form-label">
                          Date
                        </Label>
                        <Input
                          type="date"
                          className="form-control"
                          placeholder="content type"
                          id="date"
                          name="date"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={convertToYYYYMMDD(formik.values.date) || ""}
                        />
                        {formik.touched.date && formik.errors.date ? (
                          <FormFeedback type="invalid">
                            {formik.errors.date}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="mb-3">
                        <Label htmlFor="blogTitleinput" className="form-label">
                          Title
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          placeholder="Blog Title"
                          id="blogTitle"
                          name="blogTitle"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.blogTitle || ""}
                        />
                        {formik.touched.blogTitle && formik.errors.blogTitle ? (
                          <FormFeedback type="invalid">
                            {formik.errors.blogTitle}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="mb-3">
                        <Label htmlFor="blogCategory" className="form-label">
                          Category
                        </Label>
                        <select
                          className="form-select"
                          id="blogCategory"
                          name="blogCategory"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.blogCategory || ""}
                        >
                          <option value="">Select a category</option>
                          {CategoryData.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                  </Row>

                  <div className="mb-3">
                    <Label htmlFor="blogTitleinput" className="form-label">
                      Description
                    </Label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      id="description"
                      name="description"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description || ""}
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <FormFeedback type="invalid">
                        {formik.errors.description}
                      </FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-3">
                    <Label htmlFor="bloginput" className="form-label">
                      Enter Blog
                    </Label>
                    <JoditEditor
                      value={blogContent || ""}
                      config={config}
                      tabIndex={1}
                      id="blog"
                      name="blog"
                      onChange={handleEditorChange}
                    />
                  </div>

                  <div className="hstack gap-2 justify-content-center mt-3">
                    {!buttnLoading ? (
                      <React.Fragment>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          id="addNewTodo"
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
                        setContent("");
                        setselectedForUpdate("");
                      }}
                    >
                      <i className="ri-close-fill align-bottom"></i> Cancel
                    </button>
                  </div>
                </Form>
              </CardBody>
            ) : (
              <CardBody>
                <div
                  className="todo-content position-relative px-4 mx-n4"
                  id="todo-content"
                >
                  {isEmpty(allBlogData) &&
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

                  <div className="todo-task" id="todo-task">
                    <div className="table-responsive">
                      <table className="table align-middle position-relative">
                        <thead className="table-active">
                          <tr>
                            <th scope="col">index</th>
                            <th scope="col">Blog Category</th>
                            <th scope="col">Blog Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>

                        <tbody id="task-list">
                          {currentItems
                            ? currentItems.map((item, key) => (
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{item.blogCategory}</td>
                                  <td>{item.blogTitle}</td>
                                  <td>{item.blogFeed}</td>
                                  <td>
                                    {new Date(item.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                      }
                                    )}
                                  </td>

                                  <td>
                                    <div className="hstack gap-2">
                                      <button
                                        className="btn btn-sm btn-soft-info edit-list"
                                        onClick={() => handleEdit(item)}
                                      >
                                        <i className="ri-pencil-fill align-bottom" />
                                      </button>
                                      <button
                                        className="btn btn-sm btn-soft-danger remove-list"
                                        onClick={() => handleDeleteModal(item)}
                                      >
                                        <i className="ri-delete-bin-5-fill align-bottom" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : null}
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
                              length: Math.ceil(
                                BlogData.length / ITEMS_PER_PAGE
                              ),
                            }).map((_, index) => (
                              <PaginationItem
                                key={index + 1}
                                active={index + 1 === currentPage}
                              >
                                <PaginationLink
                                  onClick={() => paginate(index + 1)}
                                >
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
                                    Math.ceil(BlogData.length / ITEMS_PER_PAGE)
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
              </CardBody>
            )}
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BlogMaster;
