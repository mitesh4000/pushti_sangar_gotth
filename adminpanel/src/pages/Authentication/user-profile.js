import React, { useState, useEffect, useContext } from "react";
import { isEmpty } from "lodash";

import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";


// actions

import SignContext from "../../contextAPI/Context/SignContext";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const url = `${process.env.REACT_APP_BASE_URL}`;
  const { id } = useParams();
  const { updateUser, getSpecificUser } = useContext(SignContext);
  const [UserInfo, setUserInfo] = useState({ roles: [], status: "" });
  const [Error, setError] = useState("");
  const [Success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "roles") {
      setUserInfo({ ...UserInfo, [e.target.name]: [e.target.value] });
    } else if (e.target.name === "status") {
      setUserInfo({ ...UserInfo, status: e.target.value });
    } else {
      setUserInfo({ ...UserInfo, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getspecificUser(id);
    const res = await updateUser(UserInfo, id);
    console.log(res);
    if (res.success) {
      setSuccess(res.msg)
      setTimeout(() => {
        // navigate("/users");
      }, 1000);
    } else {
      setError(res.msg);
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  const getspecificUser = async (id) => {
    const res = await getSpecificUser(id);
    if (res.success) {
      setUserInfo(res);
    } else {
      console.log(res.msg);
    }
  };

  useEffect(() => {
    getspecificUser(id);
  }, []);

  document.title = "Pushtishangar";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              {Error && Error ? <Alert color="danger">{Error}</Alert> : null}
              {Success ? (
                <Alert color="success">Username Updated To {UserInfo.name}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="mx-3">
                      <img
                        src={`${url}/${UserInfo.photo}`}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{UserInfo.name}</h5>
                        <p className="mb-1">Email Id : {UserInfo.email}</p>
                        <p className="mb-0">Id No : {UserInfo._id}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form onSubmit={(e) => handleSubmit(e)}
                className="form-horizontal"
              >
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    type="text"
                    className="form-control mt-1"
                    id="name"
                    placeholder="name"
                    name="name"
                    value={UserInfo.name}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update User Name
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
