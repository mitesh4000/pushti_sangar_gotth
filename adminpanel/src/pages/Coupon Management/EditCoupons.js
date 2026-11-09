import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  CardHeader,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";
import { useParams } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const EditCoupons = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { GetSpecificCouponbyId, UpdateCoupon } = useContext(SignContext);
  const [CouponData, setCouponData] = useState({
    name: "",
    type: "",
    start: new Date(),
    expiry: new Date(),
    discount: 0,
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseFloat(value)
        : value;

    setCouponData({
      ...CouponData,
      [name]: newValue,
    });
  };

  const handleDateChange = (date) => {
    // Update the state with the selected date
    setCouponData({
      ...CouponData,
      expiry: date,
    });
  };

  const handleStartDateChange = (date) => {
    // Update the state with the selected date
    setCouponData({
      ...CouponData,
      start: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await UpdateCoupon(CouponData, id);
    console.log(id);

    console.log(res);
    if (res.success) {
      // Handle success
      // For example, display a success message and reset the form
      console.log("Coupon updated successfully");
      setCouponData({});
      navigate("/coupons");
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
    }
  };

  const getspecificCouponbyId = async (id) => {
    const res = await GetSpecificCouponbyId(id);
    if (res.success) {
      const apiData = res.coupon;

      const convertedData = { ...apiData };

      convertedData.start = new Date(apiData.start.split("T")[0]);
      convertedData.expiry = new Date(apiData.expiry.split("T")[0]);

      setCouponData(convertedData);
    }
  };

  useEffect(() => {
    getspecificCouponbyId(id);
  }, [id]);

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
        <BreadCrumb parent="setup" child="Coupons" grandChild="Edit Coupons" />
          <Row>
            <Col lg={12}>
              <Form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <h4 className="card-title mb-0">Edit Coupon</h4>
                  </CardHeader>
                  <div className="card-body">
                    <div className="live-preview">
                      <Row className="align-items-center g-3">
                        <Col lg={4}>
                          <Label className="form-label" htmlFor="category">
                            Coupon Name
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="name"
                            placeholder="Coupon-Name"
                            value={CouponData.name}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col lg={2}>
                          <Label className="form-label" htmlFor="category">
                            Coupon Type
                          </Label>
                          <select
                            className="form-select"
                            name="type"
                            value={CouponData.type}
                            onChange={handleChange}
                          >
                            <option value="%">%</option>
                            <option value="₹">₹</option>
                          </select>
                        </Col>

                        <Col lg={2}>
                          <div>
                            <Label className="form-label" htmlFor="category">
                              Discount
                            </Label>
                            <Input
                              className="form-control"
                              type="number"
                              name="discount"
                              placeholder="add Discount"
                              value={CouponData.discount}
                              onChange={handleChange}
                            />
                          </div>
                        </Col>
                        <Col lg={2}>
                          <div>
                            <Label className="form-label" htmlFor="startDate">
                              Start Date
                            </Label>
                            <DatePicker
                              className="form-control"
                              name="startDate"
                              selected={CouponData.start}
                              onChange={(date) => handleStartDateChange(date)}
                              placeholderText="Select a date"
                            />
                          </div>
                        </Col>
                        <Col lg={2}>
                          <Label className="form-label g-2" htmlFor="category">
                            Valid Till
                          </Label>
                          <DatePicker
                            className="form-control"
                            selected={CouponData.expiry}
                            onChange={(date) => handleDateChange(date)}
                            placeholderText="Select a date"
                          />
                        </Col>
                      </Row>

                     


                      <Row className="align-items-last justify-content-end mt-4">
                      <Col lg={2} style={{alignSelf:"center"}}>
                          <div >
                            <Input
                              type="checkbox"
                              id="isActive"
                              label="Is Active"
                              name="active"
                              checked={CouponData.active}
                              onChange={handleChange}
                            />
                            <label className="me-2">Is Active</label>
                          </div>
                        </Col>
                            
                        
                            <Col lg={1} style={{marginRight:"30px"}}>
                            <button
                                type="submit"
                                className="btn btn-success w-sm"
                                //   onClick={togglesuccessmodal}
                              >
                                Update
                              </button>
                            </Col>

                              <Col lg={1}>
                              <button
                                type="button"
                                className="btn btn-soft-danger"
                                onClick={()=>{navigate("/coupons");}}
                              >
                                Cancel
                              </button>
                            </Col>
                          </Row>

                    </div>
                  </div>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default EditCoupons;
