import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../../contextAPI/Context/SignContext";
import FeatherIcon from "feather-icons-react";

import {
  CardBody,
  CardHeader,
  Col,
  Card,
  Container,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  PaginationLink,
  PaginationItem,
  Pagination,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { color } from "echarts";

const ITEMS_PER_PAGE = 10;


const NewTeam = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { id } = useParams();
  const {
    registerUser,
    getUsers,
    deleteUser,
    updateUser,
    getSpecificUser,
    GetRoles,
  } = useContext(SignContext);
  const [usersData, setUsersData] = useState([]);
  const [allusersData, setAllUsersData] = useState([]);
  const [editUserInfo, setEditUserInfo] = useState({
    name: "",
    email: "",
    photo: "",
    roles: "",
    active: "",
  });
  const [Roles, setRoles] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [modal, setModal] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [UserToDelete, setUserToDelete] = useState(null);
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const roles = JSON.parse(localStorage.getItem("rights")).role;
  const [currentPage, setCurrentPage] = useState(1);

  // console.log(roles);

  const addUserValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    roles: Yup.string().required("Role is required"),
    photo: Yup.mixed()
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true; // No file is selected, so it's valid
        return value.size <= 5242880; // 5MB maximum file size
      })
      .test("fileType", "Invalid file type", (value) => {
        if (!value) return true; // No file is selected, so it's valid
        return (
          ["image/jpeg", "image/jpg", "image/png"].includes(value.type) ||
          value.photo.endsWith(".jpeg") ||
          value.photo.endsWith(".jpg") ||
          value.photo.endsWith(".png")
        );
      })
      .required("Photo is required"),
    // status: Yup.string().required("Status is required"),
  });

  const getusers = async () => {
    const res = await getUsers();
    console.log(res);
    const transformedData = res.users.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setUsersData(transformedData);
    setAllUsersData(transformedData);
  };

  const getRoles = async () => {
    const res = await GetRoles();
    console.log(res);
    setRoles(res);
  };

  const searchList = (e) => {
    let inputVal = e.toLowerCase();

    function filterItems(arr, query) {
      return arr.filter(function (el) {
        return (
          el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          el.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
      });
    }

    let filterData = filterItems(allusersData, inputVal);
    setUsersData(filterData);
    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("todo-task").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("todo-task").style.display = "block";
    }
  };

  const getspecificUser = async (id) => {
    const res = await getSpecificUser(id);
    // console.log(res);
    if (res.success) {
      setEditUserInfo(res); // Update editUserInfo with fetched data
    } else {
      console.log(res.msg);
    }
  };

  const handleChange = (e) => {
    if (EditModal) {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setEditUserInfo({
        ...editUserInfo,
        [name]: newValue,
      });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setProfilePhoto(file);
  };

  const handleSaveUserData = async (Values) => {
    const res = await registerUser(Values);
    console.log(res);
    if (res.success) {
      getusers();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const resUpdate = await updateUser(editUserInfo, profilePhoto);
    console.log(resUpdate);
    if (resUpdate.success) {
      getusers();
      setSuccess(resUpdate.msg);
    } else {
      setError(resUpdate.msg);
    }
  };

  const handleDeleteUser = async (userId) => {
    const res = await deleteUser(userId);
    console.log(res);
    if (res.success) {
      // Product was successfully deleted
      // Perform any necessary state updates or notifications
      // Reset productToDelete and close the modal
      setUserToDelete(null);
      setDeleteModal(false);
      // Refresh the product list after deletion
      getusers();
    } else {
      // Handle deletion error, show error message
      // You might want to display an error notification
    }
  };

  const togglemodal = () => {
    setModal(!modal);
  };

  const toggledeletemodal = () => {
    setDeleteModal(!deletemodal);
  };

  const toggleEditmodal = (id) => {
    setEditModal(!modal);
    getspecificUser(id);
    console.log(id);
  };

  // console.log(editUserInfo);

  useEffect(() => {
    getusers();
    getRoles();
    getspecificUser(id);
  }, [id]);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = usersData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  document.title = "Team | Pushtishangar";

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
          grandParent="Profile"
            parent="Team"
            child="Users"
            grandChild="All users"
            title
            pageTitle
          />
          <Card>
            <Row>
              <Col lg={12}>
                <CardHeader>
                  <h4 className="card-title mb-0">Users</h4>
                </CardHeader>
                <CardBody>
                  <div id="">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search..."
                              onKeyUp={(e) => searchList(e.target.value)}
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
                            onClick={togglemodal}
                            // to="/adduser"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add
                          </Link>
                        </div>
                      </Col>
                    </Row>
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
                            <th scope="col" style={{ width: "40px" }}>
                              <div className="form-check">
                                <th className="name">Index</th>
                              </div>
                            </th>
                            <th className="name">Name</th>
                            <th className="Image">Photo</th>
                            <th className="Email" style={{ width: "170px" }}>
                              Email
                            </th>
                            <th className="roles">Roles</th>
                            <th className="status">Status</th>
                            <th className="action">Action</th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {currentItems?currentItems.map((user, key) => (
                            <tr key={user._id}>
                              <th scope="row">
                                <div className="form-check">
                                  <td className="name">{key + 1}</td>
                                </div>
                              </th>
                              <td className="name">{user.name}</td>
                              <td className="Image">
                                <div
                                  style={{
                                    maxWidth: "50px",
                                    maxHeight: "50px",
                                    overflow: "hidden",
                                    display: "inline-block",
                                  }}
                                >
                                  <img
                                    src={`${url}/${user.photo}`}
                                    alt="userImage"
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="Email" style={{ width: "170px" }}>
                                {user.email}
                              </td>
                              <td className="roles">{user.roles}</td>
                              <td className="status">
                                {user.active === true ? (
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
                              <td className="action">
                                <button
                                  className="btn btn-soft-info btn-sm me-2"
                                  onClick={() => toggleEditmodal(user._id)}
                                >
                                  <i className="ri-pencil-line"></i>
                                </button>
                                <button
                                  className="btn btn-soft-danger btn-sm"
                                  onClick={() => {
                                    toggledeletemodal();
                                    setUserToDelete(user);
                                  }}
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </td>
                              {/* Add other columns here as needed */}
                              <td>{/* Add edit and remove buttons here */}</td>
                            </tr>
                          )):null}
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
                      length: Math.ceil(usersData.length / ITEMS_PER_PAGE),
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
                            Math.ceil(usersData.length / ITEMS_PER_PAGE)
                              ? prev
                              : prev + 1
                          )
                        }
                      />
                    </PaginationItem>
                  </Pagination>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>

      {/* modal Add Address */}
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
            Add User
          </h5>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              photo: "",
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              roles: "",
              active: true,
            }}
            validationSchema={addUserValidationSchema}
            onSubmit={async (values, { resetForm }) => {
              await handleSaveUserData(values);
              resetForm();
              togglemodal();
              toast.success("User Added Successfully", { autoClose: 3000 });
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
                  <Label for="profile-photo" className="form-label">
                    Profile Photo*
                  </Label>
                  <input
                    type="file"
                    className="form-control"
                    id="profile-photo"
                    name="photo"
                    accept=".jpg, .jpeg, .png"
                    onChange={(event) => {
                      setFieldValue("photo", event.currentTarget.files[0]);
                    }}
                    onBlur={handleBlur}
                    // value={values.photo}
                  />
                  <p className="error" style={{ color: "red" }}>
                    {errors.photo && touched.photo && errors.photo}
                  </p>
                </div>
                {profilePhoto && (
                  <div>
                    <img
                      src={URL.createObjectURL(profilePhoto)}
                      alt="Selected Profile Photo"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        display: "block",
                      }}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <Label for="addaddress-Name" className="form-label">
                    Name*
                  </Label>
                  <Field
                    type="text"
                    className="form-control"
                    id="Name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <p className="error" style={{ color: "red" }}>
                    {errors.name && touched.name && errors.name}
                  </p>
                </div>

                <div className="mb-3">
                  <Label for="Email" className="form-label">
                    Email*
                  </Label>
                  <Field
                    type="email"
                    className="form-control"
                    id="Email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <p className="error" style={{ color: "red" }}>
                    {errors.email && touched.email && errors.email}
                  </p>
                </div>
                <div className="mb-3">
                  <Label for="password" className="form-label">
                    Password*
                  </Label>
                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <p className="error" style={{ color: "red" }}>
                    {errors.password && touched.password && errors.password}
                  </p>
                </div>
                <div className="mb-3">
                  <Label for="confirmPassword" className="form-label">
                    Confirm Password*
                  </Label>
                  <Field
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  <p className="error" style={{ color: "red" }}>
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </p>
                </div>
                <div className="mb-3">
                  <Label for="state" className="form-label">
                    Roles*
                  </Label>
                  <Field
                    as="select"
                    className="form-select"
                    id="state"
                    name="roles"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.roles}
                  >
                    <option value="">Select a role</option>
                    {Roles.map((role) => (
                      <option key={role.role} value={role.role}>
                        {role.role}
                      </option>
                    ))}
                  </Field>
                  <p className="error" style={{ color: "red" }}>
                    {errors.roles && touched.roles && errors.roles}
                  </p>
                </div>
                <div className="mb-3">
                  <Label for="status" className="form-label">
                    Status
                  </Label>
                  <div>
                    <div className="form-check form-check-inline">
                      <Field
                        type="checkbox"
                        className="form-check-input"
                        id="activeStatus"
                        name="active"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.active}
                      />
                      <Label
                        className="form-check-label"
                        htmlFor="activeStatus"
                      >
                        Active
                      </Label>
                    </div>
                  </div>
                  <p className="error" style={{ color: "red" }}>
                    {errors.active && touched.active && errors.active}
                  </p>
                </div>

                <ModalFooter>
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      setModal(!modal);
                    }}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>

      {/* Modal Edit Address */}
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
            Edit User
          </h5>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={(e) => handleUpdate(e)}>
            <div className="mb-3">
              <Label for="profile-photo" className="form-label">
                Profile Photo*
              </Label>
              <input
                type="file"
                className="form-control"
                id="profile-photo"
                accept=".jpg, .jpeg, .png" // Add accepted image formats
                // value={`${url}/${UserInfo.photo}`}
                onChange={handlePhotoChange} // Call a function to handle the file upload
              />
            </div>

            <div className="mb-3">
              <Label for="addaddress-Name" className="form-label">
                Name
              </Label>
              <Input
                type="text"
                className="form-control"
                id="Name"
                placeholder="Enter Name"
                name="name"
                value={editUserInfo.name}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>

            <div className="mb-3">
              <Label for="state" className="form-label">
                Roles
              </Label>
              <select
                className="form-select"
                id="state"
                name="roles"
                value={editUserInfo.roles}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                {Roles.map((role) => {
                  return (
                    <option key={role.role} value={role.role}>
                      {role.role}
                    </option>
                  );
                })}
              </select>
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
                    checked={editUserInfo.active}
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
                Are you Sure You want to Remove this user ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            
            <button
              type="button"
              className="btn w-sm btn-danger"
              onClick={() => {
                handleDeleteUser(UserToDelete);
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

export default NewTeam;
