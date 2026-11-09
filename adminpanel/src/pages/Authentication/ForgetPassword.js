import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";

//redux
// import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// Formik Validation
// import * as Yup from "yup";
// import { useFormik } from "formik";

// action
// import { userForgetPassword } from "../../store/actions";

// import images
// import profile from "../../assets/images/bg.png";
// import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

import withRouter from "../../Components/Common/withRouter";
import SignContext from "../../contextAPI/Context/SignContext";

const ForgetPasswordPage = (props) => {
  const { forgotPassword } = useContext(SignContext);
  const [UserInfo, setUserInfo] = useState({
    email: "",
  });
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");

  const handleChange = (e) => {
    setUserInfo({ ...UserInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await forgotPassword(UserInfo);
    if (res.success) {
      setSuccess(res.msg);
    } else {
      setError(res.msg);
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  document.title = "Pushtishangar";
  return (
    <ParticlesAuth>
      <div className="auth-page-content">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link
                    to="/"
                    className="d-inline-block auth-logo"
                    style={{ fontSize: "20px", color: "white" }}
                  >
                    {/* Shalin */}
                  </Link>
                </div>
                {/* <p className="mt-3 fs-15 fw-medium">
                  Premium Admin & Dashboard Template
                </p> */}
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center mainRowAdmin">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Forgot Password?</h5>
                    <p className="text-muted">Reset password</p>
                  </div>

                  <Alert
                    className={`alert-borderless ${
                      Success ? "alert-success" : "alert-warning"
                    } text-center mb-2 mx-2`}
                    role="alert"
                  >
                    {Success
                      ? Success
                      : "Enter your email and instructions will be sent to you!"}
                  </Alert>
                  <div className="p-2">
                    <Form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <Label className="form-label">Email</Label>
                        <Input
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          name="email"
                          value={UserInfo.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="text-center mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          Send Reset Link
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Wait, I remember my password...{" "}
                  <Link
                    to="/"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    {" "}
                    Click here{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
