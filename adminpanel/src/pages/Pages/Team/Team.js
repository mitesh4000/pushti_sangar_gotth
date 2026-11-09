import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  Offcanvas,
  OffcanvasBody,
  Row,
  UncontrolledDropdown,
  FormFeedback,
  ModalHeader,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer } from "react-toastify";

//User Images
import profilebg from "../../../assets/images/profile-bg.jpg";
import userdummyimg from "../../../assets/images/users/user-dummy-img.jpg";

//Small Images
import smallImage9 from "../../../assets/images/small/img-9.jpg";
//redux
import { useSelector, useDispatch } from "react-redux";

//import action
import {
  getTeamData as onGetTeamData,
  deleteTeamData as onDeleteTeamData,
  addTeamData as onAddTeamData,
  updateTeamData as onUpdateTeamData,
} from "../../../store/actions";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import SignContext from "../../../contextAPI/Context/SignContext";

const Team = () => {
  document.title = "Team | Pushtishangar";
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { registerUser, getSpecificUser, getUsers, deleteUser, updateUser } =
    useContext(SignContext);
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const [usersData, setUsersData] = useState({});
  const navigate = useNavigate();
  const [UserInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    status: "",
  });
  const dispatch = useDispatch();

  const getusers = async () => {
    const res = await getUsers();
    console.log(res);
    // const transformedData = res.users.map((user, index) => ({
    //   ...user,
    //   id: index + 1,
    // }));
    setUsersData(res.users);
  };

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmed) {
      console.log(`Deleting user with ID ${userId}`);
      const res = await deleteUser(userId);
      if (res.success) {
        getusers();
        window.alert("User deleted successfully");
      }
    }
  };

  const { teamData } = useSelector((state) => ({
    teamData: state.Team.teamData,
  }));
  console.log(teamData);

  const [team, setTeam] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [teamList, setTeamlist] = useState([]);

  //Modal
  const [teamMem, setTeamMem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);

  // useEffect(() => {
  //   dispatch(onGetTeamData());
  // }, [dispatch]);

  //   useEffect(() => {
  //     setTeam(teamData);
  //     setTeamlist(teamData);
  //   }, [teamData]);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTeamMem(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  // Update To do
  const handleTeamClick = useCallback(
    (arg) => {
      const teamMem = arg;
      setTeamMem({
        id: teamMem.id,
        name: teamMem.name,
        designation: teamMem.designation,
        projectCount: teamMem.projectCount,
        taskCount: teamMem.taskCount,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  // Add To do
  const handleTeamClicks = () => {
    setTeamMem("");
    setModal(!modal);
    setIsEdit(false);
    toggle();
  };

  // delete
  const onClickData = (team) => {
    setTeam(team);
    setDeleteModal(true);
  };

  const handleDeleteTeamData = () => {
    if (team) {
      dispatch(onDeleteTeamData(team));
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    const list = document.querySelectorAll(".team-list");
    const buttonGroups = document.querySelectorAll(".filter-button");
    for (let i = 0; i < buttonGroups.length; i++) {
      buttonGroups[i].addEventListener("click", onButtonGroupClick);
    }

    function onButtonGroupClick(event) {
      if (
        event.target.id === "list-view-button" ||
        event.target.parentElement.id === "list-view-button"
      ) {
        document.getElementById("list-view-button").classList.add("active");
        document.getElementById("grid-view-button").classList.remove("active");
        list.forEach(function (el) {
          el.classList.add("list-view-filter");
          el.classList.remove("grid-view-filter");
        });
      } else {
        document.getElementById("grid-view-button").classList.add("active");
        document.getElementById("list-view-button").classList.remove("active");
        list.forEach(function (el) {
          el.classList.remove("list-view-filter");
          el.classList.add("grid-view-filter");
        });
      }
    }
  }, []);

  const favouriteBtn = (ele) => {
    if (ele.closest("button").classList.contains("active")) {
      ele.closest("button").classList.remove("active");
    } else {
      ele.closest("button").classList.add("active");
    }
  };

  // const searchList = (e) => {
  //   let inputVal = e.toLowerCase();

  //   const filterItems = (arr, query) => {
  //     return arr.filter((el) => {
  //       return el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  //     });
  //   };

  //   let filterData = filterItems(teamData, inputVal);
  //   setTeamlist(filterData);
  //   if (filterData.length === 0) {
  //     document.getElementById("noresult").style.display = "block";
  //     document.getElementById("teamlist").style.display = "none";
  //   } else {
  //     document.getElementById("noresult").style.display = "none";
  //     document.getElementById("teamlist").style.display = "block";
  //   }
  // };

  //OffCanvas
  const [isOpen, setIsOpen] = useState(false);
  const [sideBar, setSideBar] = useState([]);

  //Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggledropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (teamMem && teamMem.name) || "",
      designation: (teamMem && teamMem.designation) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter team Name"),
      designation: Yup.string().required("Please Enter Your designation"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateTeamData = {
          id: teamMem ? teamMem.id : 0,
          name: values.name,
          designation: values.designation,
          projectCount: values.projectCount,
          taskCount: values.taskCount,
        };
        // save edit Team data
        dispatch(onUpdateTeamData(updateTeamData));
        validation.resetForm();
      } else {
        const newTeamData = {
          id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          name: values.name,
          designation: values.designation,
          projectCount: 0,
          taskCount: 0,
          backgroundImg: smallImage9,
        };
        // save new TeamData
        dispatch(onAddTeamData(newTeamData));
        validation.resetForm();
      }
      toggle();
    },
  });

  useEffect(() => {
    getusers();
  }, []);

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteTeamData()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Team" pageTitle="Pages" />
          <Card>
            <CardBody>
              <Row className="g-2">
                {/* <Col sm={4}>
                  <div className="search-box">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Search for name or designation..."
                      onChange={(e) => searchList(e.target.value)}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col> */}
                <Col className="col-sm-auto ms-auto">
                  <div className="list-grid-nav hstack gap-1">
                    <Button
                      color="info"
                      id="grid-view-button"
                      className="btn btn-soft-info nav-link btn-icon fs-14 active filter-button"
                    >
                      <i className="ri-grid-fill"></i>
                    </Button>
                    <Button
                      color="info"
                      id="list-view-button"
                      className="btn btn-soft-info nav-link  btn-icon fs-14 filter-button"
                    >
                      <i className="ri-list-unordered"></i>
                    </Button>
                    <Dropdown isOpen={dropdownOpen} toggle={toggledropDown}>
                      <DropdownToggle
                        type="button"
                        className="btn btn-soft-info btn-icon fs-14"
                      >
                        <i className="ri-more-2-fill"></i>
                      </DropdownToggle>
                      <DropdownMenu>
                        <li>
                          <Link className="dropdown-item" to="#">
                            All
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            Last Week
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            Last Month
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="#">
                            Last Year
                          </Link>
                        </li>
                      </DropdownMenu>
                    </Dropdown>
                    <Button color="success" onClick={() => handleTeamClicks()}>
                      <i className="ri-add-fill me-1 align-bottom"></i> Add
                      Members
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Row>
            <Col lg={12}>
              <div id="teamlist">
                <Row className="team-list grid-view-filter">
                  {teamData.map((item, key) => (
                    <Col key={key}>
                      <Card className="team-box">
                        <div className="team-cover">
                          <img src={profilebg} alt="" className="img-fluid" />
                        </div>
                        <CardBody className="p-4">
                          <Row className="align-items-center team-row">
                            <Col className="team-settings">
                              <Row>
                                <Col>
                                  <div className="flex-shrink-0 me-2">
                                    <button
                                      type="button"
                                      className="btn btn-light btn-icon rounded-circle btn-sm favourite-btn"
                                      onClick={(e) => favouriteBtn(e.target)}
                                    >
                                      <i className="ri-star-fill fs-14"></i>
                                    </button>
                                  </div>
                                </Col>
                                <UncontrolledDropdown
                                  direction="start"
                                  className="col text-end"
                                >
                                  <DropdownToggle
                                    tag="a"
                                    id="dropdownMenuLink2"
                                    role="button"
                                  >
                                    <i className="ri-more-fill fs-17"></i>
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem
                                      className="dropdown-item edit-list"
                                      href="#addmemberModal"
                                      onClick={() => handleTeamClick(item)}
                                    >
                                      <i className="ri-pencil-line me-2 align-bottom text-muted"></i>
                                      Edit
                                    </DropdownItem>
                                    <DropdownItem
                                      className="dropdown-item remove-list"
                                      href="#removeMemberModal"
                                      onClick={() => onClickData(item)}
                                    >
                                      <i className="ri-delete-bin-5-line me-2 align-bottom text-muted"></i>
                                      Remove
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </Row>
                            </Col>
                            <Col lg={4} className="col">
                              <div className="team-profile-img">
                                <div className="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
                                  {item.photo != null ? (
                                    <img
                                      src={`${url}/${item.photo}`}
                                      alt=""
                                      className="img-fluid d-block rounded-circle"
                                      style={{
                                        height: "100%",
                                        width: "100%",
                                      }}
                                    />
                                  ) : (
                                    <div className="avatar-title text-uppercase border rounded-circle bg-light text-primary">
                                      {item.name.charAt(0) +
                                        item.name
                                          .split(" ")
                                          .slice(-1)
                                          .toString()
                                          .charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div className="team-content">
                                  <Link
                                    to="#"
                                    onClick={() => {
                                      setIsOpen(!isOpen);
                                      setSideBar(item);
                                    }}
                                  >
                                    <h5 className="fs-16 mb-1">{item.name}</h5>
                                  </Link>
                                  <p className="text-muted mb-0">
                                    {item.email}
                                  </p>
                                </div>
                              </div>
                            </Col>
                            <Col lg={4} className="col">
                              <Row className="text-muted text-center">
                                <Col
                                  xs={6}
                                  className="border-end border-end-dashed"
                                >
                                  <p className="mb-1">{item.roles}</p>
                                  {/* <p className="text-muted mb-0">Projects</p> */}
                                </Col>
                                <Col xs={6}>
                                  <p className="mb-1">{item.status}</p>
                                  {/* <p className="text-muted mb-0">Tasks</p> */}
                                </Col>
                              </Row>
                            </Col>
                            <Col lg={2} className="col">
                              <div className="text-end">
                                <Link
                                  to="/pages-profile"
                                  className="btn btn-light view-btn"
                                >
                                  View Profile
                                </Link>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}

                  {/* <Col lg={12}>
                    <div className="text-center mb-3">
                      <Link to="#" className="text-success">
                        <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>{" "}
                        Load More{" "}
                      </Link>
                    </div>
                  </Col> */}
                </Row>

                {/* Form for Add Users or Edit Users*/}
                <div
                  className="modal fade"
                  id="addmembers"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <Modal isOpen={modal} toggle={toggle} centered>
                      <ModalBody>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <input
                                type="hidden"
                                id="memberid-input"
                                className="form-control"
                                defaultValue=""
                              />
                              <div className="px-1 pt-1">
                                <div className="modal-team-cover position-relative mb-0 mt-n4 mx-n4 rounded-top overflow-hidden">
                                  <img
                                    src={smallImage9}
                                    alt=""
                                    id="cover-img"
                                    className="img-fluid"
                                  />

                                  <div className="d-flex position-absolute start-0 end-0 top-0 p-3">
                                    <div className="flex-grow-1">
                                      <h5
                                        className="modal-title text-white"
                                        id="createMemberLabel"
                                      >
                                        {!isEdit
                                          ? "Add New Members"
                                          : "Edit Member"}
                                      </h5>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <div className="d-flex gap-3 align-items-center">
                                        <div>
                                          <label
                                            htmlFor="cover-image-input"
                                            className="mb-0"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Select Cover Image"
                                          >
                                            <div className="avatar-xs">
                                              <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                <i className="ri-image-fill"></i>
                                              </div>
                                            </div>
                                          </label>
                                          <input
                                            className="form-control d-none"
                                            defaultValue=""
                                            id="cover-image-input"
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                          />
                                        </div>
                                        <button
                                          type="button"
                                          className="btn-close btn-close-white"
                                          onClick={() => setModal(false)}
                                          id="createMemberBtn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-center mb-4 mt-n5 pt-2">
                                <div className="position-relative d-inline-block">
                                  <div className="position-absolute bottom-0 end-0">
                                    <label
                                      htmlFor="member-image-input"
                                      className="mb-0"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="right"
                                      title="Select Member Image"
                                    >
                                      <div className="avatar-xs">
                                        <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                          <i className="ri-image-fill"></i>
                                        </div>
                                      </div>
                                    </label>
                                    <input
                                      className="form-control d-none"
                                      defaultValue=""
                                      id="member-image-input"
                                      type="file"
                                      accept="image/png, image/gif, image/jpeg"
                                    />
                                  </div>
                                  <div className="avatar-lg">
                                    <div className="avatar-title bg-light rounded-circle">
                                      <img
                                        src={userdummyimg}
                                        alt=" "
                                        id="member-img"
                                        className="avatar-md rounded-circle h-auto"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mb-3">
                                <Label
                                  htmlFor="teammembersName"
                                  className="form-label"
                                >
                                  Name
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="teammembersName"
                                  placeholder="Enter name"
                                  name="name"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.name || ""}
                                  invalid={
                                    validation.touched.name &&
                                    validation.errors.name
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.name &&
                                validation.errors.name ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.name}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="mb-3">
                                <Label
                                  htmlFor="designation"
                                  className="form-label"
                                >
                                  Designation
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="designation"
                                  placeholder="Enter designation"
                                  name="designation"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.designation || ""}
                                  invalid={
                                    validation.touched.designation &&
                                    validation.errors.designation
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.designation &&
                                validation.errors.designation ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.designation}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div className="hstack gap-2 justify-content-end">
                                <button
                                  type="button"
                                  className="btn btn-light"
                                  onClick={() => setModal(false)}
                                >
                                  Close
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  id="addNewMember"
                                >
                                  {!isEdit ? "Add Member" : "Save"}
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </ModalBody>
                    </Modal>
                  </div>
                </div>
              </div>
              <div
                className="py-4 mt-4 text-center"
                id="noresult"
                style={{ display: "none" }}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/msoeawqm.json"
                  trigger="loop"
                  colors="primary:#405189,secondary:#0ab39c"
                  style={{ width: "72px", height: "72px" }}
                ></lord-icon>
                <h5 className="mt-4">Sorry! No Result Found</h5>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Team;
