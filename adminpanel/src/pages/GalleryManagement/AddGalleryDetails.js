import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import { Card, Col, Container,CardHeader, Form, Input, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

const AddGalleryDetails = () => {
  const { createGalleryDetails, GetGalleryCat } = useContext(SignContext);
  const navigate = useNavigate();
  const [GalleryDetData, setGalleryDetData] = useState({
    imageTitle: "",
    description: "",
    imagePath: "",
    galleryCategory: "",
    active: true,
  });
  const [ImagePath, setImagePath] = useState("");
  const [GalleryCategory, setGalleryCategory] = useState([]);

  const Getgallerycat = async () => {
    const res = await GetGalleryCat();
    console.log(res);
    setGalleryCategory(res.GalleryCat);
  };

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   const newValue = type === "checkbox" ? checked : value;

  //   setGalleryDetData({
  //     ...GalleryDetData,
  //     [name]: newValue,
  //   });
  // };

  // const handlePhotoChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   setImagePath(file);
  // };

  const handleSaveGalleryDet = async (Values) => {
    const res = await createGalleryDetails(Values);

    console.log(res);
    if (res.success) {
      navigate("/gallerycontent")
      console.log("Content added successfully");
      setGalleryDetData({
        imageTitle: "",
        description: "",
        imagePath: "",
        galleryCategory: "",
        active: true,
      });
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
    }
  };

  const validationSchema = Yup.object().shape({
    imageTitle: Yup.string().required("Image Title is required"),
    description: Yup.string().required("Description is required"),
    imagePath: Yup.mixed().required("Image Path is required"),
    galleryCategory: Yup.string().required("Gallery Category is required"),
  });

  useEffect(() => {
    Getgallerycat();
  }, []);

  document.title = "Add Gallery-Details | Gallery";

  return (
    <>
      <UiContent />
      <ToastContainer/>
      <div className="page-content">
        <Container fluid>
        <BreadCrumb grandParent="Setup" parent="Gallery" child="Add-Gallery Details" />
          <Row>
            <Col lg={12}>
              <Formik
                initialValues={{
                  imageTitle: "",
                  description: "",
                  imagePath: "",
                  galleryCategory: "",
                  active: true,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  await handleSaveGalleryDet(values);
                  resetForm();
                  // togglemodal();
                  toast.success("GalleryDetails Added Successfully", {
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
                    <CardHeader className="d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Add Gallery Details</h4>
                    
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
                                  Image Title
                                </label>
                                <div className="mb-3">
                                  <Input
                                    type="text"
                                    className="form-control"
                                    id="product-orders-input"
                                    placeholder="Enter Title"
                                    name="imageTitle"
                                    aria-label="orders"
                                    aria-describedby="product-orders-addon"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.imageTitle}
                                  />
                                  <p className="error text-danger">
                                    {errors.imageTitle &&
                                      touched.imageTitle &&
                                      errors.imageTitle}
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
                                  Image Path
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
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="gallery-category-select"
                                >
                                  Gallery Category Title
                                </label>
                                <div className="mb-3">
                                  <select
                                    className="form-select"
                                    id="gallery-category-select"
                                    name="galleryCategory"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.galleryCategory}
                                  >
                                    <option value="">Select a Category</option>
                                    {GalleryCategory.map((category) => (
                                      <option
                                        key={category.gallaryCategoryTitle}
                                        value={category._id}
                                      >
                                        {category.gallaryCategoryTitle}
                                      </option>
                                    ))}
                                  </select>
                                  <p className="error text-danger">
                                    {errors.galleryCategory &&
                                      touched.galleryCategory &&
                                      errors.galleryCategory}
                                  </p>
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row className="align-items-center g-3">
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
                          navigate("/gallerycontent");
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

export default AddGalleryDetails;
