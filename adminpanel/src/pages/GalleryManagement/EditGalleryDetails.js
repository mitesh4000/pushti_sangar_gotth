import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SignContext from '../../contextAPI/Context/SignContext';
import { Card, Col, CardHeader,Container, Form, Input, Row } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import UiContent from '../../Components/Common/UiContent';

const EditGalleryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { GetSpecificGalleryDetails, updateGalleryDetails , GetGalleryCat } = useContext(SignContext);
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

  const getspecificgalleryDetailsbyId = async (id) => {
    const res = await GetSpecificGalleryDetails(id);
    console.log(res);
    if (res.success) {
      setGalleryDetData(res.recordExists);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setGalleryDetData({
      ...GalleryDetData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateGalleryDetails(GalleryDetData , ImagePath , id);
    console.log(id);

    console.log(res);
    if (res.success) {
      // Handle success
      // For example, display a success message and reset the form
      navigate("/gallerycontent");
      console.log("Content updated successfully");
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImagePath(file);
  };


  useEffect(() => {
    getspecificgalleryDetailsbyId(id);
    Getgallerycat();
  }, [id]);

  document.title = "Update Gallery-Details | Gallery";

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
         
          <BreadCrumb grandParent="Setup" parent="Gallery" child="Edit GalleryDetails" />
          <Row>
            <Col lg={12}>
              <Form 
              onSubmit={handleSubmit}
              >
                <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                <h4 className="card-title mb-0">Edit Gallery Details</h4>
                    
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
                            <div className="input-group mb-3">
                              <Input
                                type="text"
                                className="form-control"
                                id="product-orders-input"
                                placeholder="Enter Title"
                                name="imageTitle"
                                aria-label="orders"
                                aria-describedby="product-orders-addon"
                                value={GalleryDetData.imageTitle}
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
                                value={GalleryDetData.description}
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
                              Image Path
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
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="gallery-category-select"
                            >
                              Gallery Category Title
                            </label>
                            <div className="input-group mb-3">
                              <select
                                className="form-select"
                                id="gallery-category-select"
                                name="galleryCategory"
                                value={GalleryDetData.galleryCategory}
                                onChange={handleChange}
                              >
                                
                                {GalleryCategory.map((category) => (
                                  <option
                                    key={category.gallaryCategoryTitle}
                                    value={category.gallaryCategoryTitle}
                                  >
                                    {category.gallaryCategoryTitle}
                                  </option>
                                ))}
                              </select>
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
                              checked={GalleryDetData.active}
                              onChange={handleChange}
                            />
                            <label className="me-2">Is Active</label>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>
                <div className="text-end mb-3">
                  <button
                    type="submit"
                    className="btn btn-success w-sm"
                    //   onClick={togglesuccessmodal}
                  >
                    Update
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default EditGalleryDetails