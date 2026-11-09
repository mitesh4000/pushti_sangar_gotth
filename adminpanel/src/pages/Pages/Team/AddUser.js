import React, { useContext, useState } from "react";
import SignContext from "../../../contextAPI/Context/SignContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Card, Col, Container, Input, Label, Row } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import UiContent from "../../../Components/Common/UiContent";

const AddUser = () => {
  const { registerUser, GetRoles } = useContext(SignContext);
  const [UserData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
    roles: "",
    status: "",
  });
  const [Roles, setRoles] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState("");

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
          value.name.endsWith(".jpeg") ||
          value.name.endsWith(".jpg") ||
          value.name.endsWith(".png")
        );
      })
      .required("Photo is required"),
    // status: Yup.string().required("Status is required"),
  });

  const getRoles = async () => {
    const res = await GetRoles();
    console.log(res);
    setRoles(res);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setUserData({
      ...UserData,
      [name]: newValue,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setProfilePhoto(file);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const res = await registerUser(UserData, profilePhoto);
    console.log(res);
    if (res.success) {
      toast.success("User Added Successfully", { autoClose: 3000 });
    }
    setSubmitting(false);
  };

  document.title = "Add User";

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add User" pageTitle="Team" />
          <Row>
            <Col lg={12}>
              <Formik
                initialValues={{
                  photo: "",
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  roles: "",
                  status: "",
                }}
                validationSchema={addUserValidationSchema}
              >
                {({ isSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    <Card>
                      <div className="card-body">
                        <div className="live-preview">
                          <Row className="align-items-center g-3">
                            <Col sm={6}>
                              <div className="mb-3">
                                <Label
                                  for="profile-photo"
                                  className="form-label"
                                >
                                  Profile Photo
                                </Label>
                                <input
                                  type="file"
                                  className="form-control"
                                  id="profile-photo"
                                  name="photo"
                                  accept=".jpg, .jpeg, .png"
                                  onChange={handlePhotoChange}
                                />
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div className="mb-3">
                                <Label
                                  for="addaddress-Name"
                                  className="form-label"
                                >
                                  Name*
                                </Label>
                                <Field
                                  type="text"
                                  className="form-control"
                                  id="Name"
                                  name="name"
                                  value={UserData.name}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div className="mb-3">
                                <Label for="Email" className="form-label">
                                  Email*
                                </Label>
                                <Field
                                  type="email"
                                  className="form-control"
                                  id="Email"
                                  name="email"
                                  value={UserData.email}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div className="mb-3">
                                <Label for="password" className="form-label">
                                  Password*
                                </Label>
                                <Field
                                  type="password"
                                  className="form-control"
                                  id="password"
                                  name="password"
                                  value={UserData.password}
                                  onChange={(e) => {
                                    handleChange(e);
                                  }}
                                />
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddUser;
