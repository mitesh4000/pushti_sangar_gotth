import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";
import { Card, CardBody, CardHeader, Col, Container, Form, Input, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditGalleryCat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { GetSpecificGalleryCatbyId, UpdateGalleryCat } =
    useContext(SignContext);
  const [GalleryData, setGalleryData] = useState({
    gallaryCategoryTitle: "",
    description: "",
    imagePath: "",
    active: true,
  });
  const [ImagePath, setImagePath] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setGalleryData({
      ...GalleryData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await UpdateGalleryCat(GalleryData, ImagePath, id);
    console.log(id);

    console.log(res);
    if (res.success) {
      // Handle success
      // For example, display a success message and reset the form
      navigate("/gallerycatcontent");
      console.log("Content updated successfully");
      setGalleryData({
        gallaryCategoryTitle: "",
        description: "",
        imagePath: "",
        active: true,
      });
      toast.success("Category Updated Successfully", {
        autoClose: 3000,
      });
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImagePath(file);
  };

  const getspecificgalleryCatbyId = async (id) => {
    const res = await GetSpecificGalleryCatbyId(id);
    console.log(res);
    if (res.success) {
      setGalleryData(res.recordExists);
    }
  };

  useEffect(() => {
    getspecificgalleryCatbyId(id);
  }, [id]);

  document.title = "Update Gallery-Category | Gallery";

  return (
    <>
      <UiContent />
      <ToastContainer/>
      <div className="page-content">
        <Container fluid>
        <BreadCrumb grandParent="Setup" parent="Gallery" child="Edit Gallery Category" />
        <Card>
        <CardHeader>
                        <Row className="g-1 m-1">
                          <Col className="col-sm">
                            <div className="d-flex justify-content-sm-between">
                              <h2 className="card-title mb-0 justify-content-sm-start">
                                <strong>Edit Gallery Category</strong>
                              </h2>
                            
                            </div>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                      <Row>
            <Col lg={12}>
              <Form onSubmit={handleSubmit}>
                <Card>

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
                            <div className="input-group mb-3">
                              <Input
                                type="text"
                                className="form-control"
                                id="product-orders-input"
                                placeholder="Enter Title"
                                name="gallaryCategoryTitle"
                                aria-label="orders"
                                aria-describedby="product-orders-addon"
                                value={GalleryData.gallaryCategoryTitle}
                                onChange={handleChange}
                              />
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
                            <div className="input-group mb-3">
                              <Input
                                type="text"
                                className="form-control"
                                id="product-orders-input"
                                placeholder="Enter Description"
                                name="description"
                                aria-label="orders"
                                aria-describedby="product-orders-addon"
                                value={GalleryData.description}
                                onChange={handleChange}
                              />
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
                              GalleryCategory Title
                            </label>
                            <div className="input-group mb-3">
                              <Input
                                type="file"
                                className="form-control"
                                id="profile-photo"
                                accept=".jpg, .jpeg, .png" // Add accepted image formats
                                onChange={handlePhotoChange} // Call a function to handle the file upload
                              />
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
                              checked={GalleryData.active}
                              onChange={handleChange}
                            />
                            <label className="me-2">Is Active</label>
                          </div>
                        </Col>
                      </Row>
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
                    Update
                  </button>
                </div>
                </Col>

                <Col lg={1}>
                    <div className=" mb-3" style={{marginRight:'40px'}}>
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
            </Col>
          </Row>
        </CardBody>
        </Card>
          
        </Container>
      </div>
    </>
  );
};

export default EditGalleryCat;
