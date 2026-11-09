import React, { useContext, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import UiContent from "../../Components/Common/UiContent";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Card, CardHeader, Col, Container, Input, Row } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddGalleryCat = () => {
  const { createGalleryCat } = useContext(SignContext);
  const navigate = useNavigate();
  const [GalleryData, setGalleryData] = useState({
    gallaryCategoryTitle: "",
    description: "",
    imagePath: "",
    active: true,
  });
  const [ImagePath, setImagePath] = useState("");

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   const newValue = type === "checkbox" ? checked : value;

  //   setGalleryData({
  //     ...GalleryData,
  //     [name]: newValue,
  //   });
  // };

  // const handlePhotoChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   setImagePath(file);
  // };

  const validationSchema = Yup.object().shape({
    gallaryCategoryTitle: Yup.string().required(
      "GalleryCategory Title is required"
    ),
    description: Yup.string().required("Description is required"),
    imagePath: Yup.mixed().required("Image is required"),
  });

  const handleSavedcat = async (Values) => {
    const res = await createGalleryCat(Values);

    console.log(res);
    if (res.success) {
      // Handle success
      navigate("/gallerycatcontent");
      console.log("Content added successfully");
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
    }
  };

  document.title = "Add Gallery Category | Gallery";

  return (
    <>
      <UiContent />
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            grandParent="Setup"
            parent="Gallery"
            child="Add-Gallery  Category"
          />
          <Row>
            <Col lg={12}>
              <Formik
                initialValues={{
                  gallaryCategoryTitle: "",
                  description: "",
                  imagePath: "",
                  active: true,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  await handleSavedcat(values);
                  resetForm();
                  // togglemodal();
                  toast.success("Category Added Successfully", {
                    autoClose: 3000,
                  });
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
                    <Card>
                      <CardHeader>
                        <Row className="g-1 m-1">
                          <Col className="col-sm">
                            <div className="d-flex justify-content-sm-between">
                              <h2 className="card-title mb-0 justify-content-sm-start">
                                <strong>Add Gallery Category</strong>
                              </h2>
                            
                            </div>
                          </Col>
                        </Row>
                      </CardHeader>
                      <div className="card-body">
                        <div className="live-preview">
                          <Row className="align-items-center g-3">
                            <Col sm={6}>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="product-orders-input"
                                >
                                  GalleryCategory Title
                                </label>
                                <div className="mb-3">
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="product-orders-input"
                                    placeholder="Enter Title"
                                    name="gallaryCategoryTitle"
                                    aria-label="orders"
                                    aria-describedby="product-orders-addon"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.gallaryCategoryTitle}
                                  />
                                  <p className="error text-danger">
                                    {errors.gallaryCategoryTitle &&
                                      touched.gallaryCategoryTitle &&
                                      errors.gallaryCategoryTitle}
                                  </p>
                                </div>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="product-orders-input"
                                >
                                  Description
                                </label>
                                <div className="mb-3">
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="product-orders-input"
                                    placeholder="Enter Description"
                                    name="description"
                                    aria-label="orders"
                                    aria-describedby="product-orders-addon"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                  />
                                  <p className="error text-danger">
                                    {errors.description &&
                                      touched.description &&
                                      errors.description}
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row className="align-items-center g-3">
                            <Col sm={6}>
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="product-orders-input"
                                >
                                  GalleryCategory Image
                                </label>
                                <div className="mb-3">
                                  <Input
                                    type="file"
                                    className="form-control"
                                    id="profile-photo"
                                    accept=".jpg, .jpeg, .png" // Add accepted image formats
                                    onChange={(event) => {
                                      setFieldValue(
                                        "imagePath",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                    onBlur={handleBlur}
                                  />
                                  <p className="error text-danger">
                                    {errors.imagePath &&
                                      touched.imagePath &&
                                      errors.imagePath}
                                  </p>
                                </div>
                              </div>
                            </Col>
                            <Col sm={6}>
                              <div className="mt-3">
                                <Input
                                  type="checkbox"
                                  id="isActive"
                                  label="Is Active"
                                  name="active"
                                  checked={values.active}
                                  onChange={handleChange}
                                />
                                <label className="me-2">Is Active</label>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                    <Row className="align-items-last justify-content-end">
                    <Col lg={1} style={{marginRight:'20px'}}>
                    <div className="text-end mb-3">
                      <button
                        type="submit"
                        className="btn btn-success w-sm"
                        //   onClick={togglesuccessmodal}
                      >
                        Submit
                      </button>
                    </div>
                    </Col>
                    <Col lg={1}>
                    <div className="text-end mb-3" style={{marginRight:'20px'}}>
                      <button
                        type="button"
                        className="btn btn-danger w-sm"
                        onClick={() => {
                          navigate("/gallerycatcontent");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    </Col>
                    </Row>
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

export default AddGalleryCat;
