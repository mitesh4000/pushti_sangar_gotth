import React, { useContext, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import UiContent from "../../Components/Common/UiContent";
import {
  Card,
  Col,
  Container,
  CardHeader,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

const AddCoupons = () => {
  const { CreateCoupon } = useContext(SignContext);
  const navigate = useNavigate();
  // const [CouponData, setCouponData] = useState({
  //   name: "",
  //   type: "",
  //   start: "",
  //   expiry: "",
  //   discount: "",
  //   active: "",
  // });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Coupon Name is required"),
    type: Yup.string().required("Coupon Type is required"),
    discount: Yup.number().required("Discount is required"),
    start: Yup.date().required("Start Date is required"),
    expiry: Yup.date().required("Expiry Date is required"),
  });

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   const newValue = type === "checkbox" ? checked : value;

  //   setCouponData({
  //     ...CouponData,
  //     [name]: newValue,
  //   });
  // };

  // const handleDateChange = (date) => {
  //   // Update the state with the selected date
  //   setCouponData({
  //     ...CouponData,
  //     expiry: date,
  //   });
  // };

  // const handleStartDateChange = (date) => {
  //   // Update the state with the selected date
  //   setCouponData({
  //     ...CouponData,
  //     start: date,
  //   });
  // };

  const handleSavedCoupon = async (Values) => {
    const res = await CreateCoupon(Values);
    console.log(res);
    if (res.success) {
      toast.success("Coupon Added Successfully", { autoClose: 3000 });
      console.log("Coupon added successfully");
      navigate("/coupons");
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
      toast.error("Coupon add failed", { autoClose: 3000 });
    }
  };

  document.title = "Add Coupon | Content";

  return (
    <>
      <UiContent />
      <ToastContainer closeButton={false} />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb parent="setup" child="Coupons" grandChild="Add Coupons" />
          <Row>
            <Col lg={12}>
              <Formik
                initialValues={{
                  name: "",
                  type: "",
                  start: "",
                  expiry: "",
                  discount: "",
                  active: true,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  await handleSavedCoupon(values);
                  resetForm();
                  // togglemodal();
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
                        <h4 className="card-title mb-0">Add Coupons</h4>
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
                                placeholder="add Coupon-Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <p className="error text-danger">
                                {errors.name && touched.name && errors.name}
                              </p>
                            </Col>
                            <Col lg={2}>
                              <Label className="form-label" htmlFor="category">
                                Coupon Type
                              </Label>
                              <select
                                className="form-select"
                                name="type"
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">Select Type</option>
                                <option value="%">%</option>
                                <option value="₹">₹</option>
                              </select>
                              <p className="error text-danger">
                                {errors.type && touched.type && errors.type}
                              </p>
                            </Col>

                            <Col lg={2}>
                              <Label className="form-label" htmlFor="category">
                                Discount
                              </Label>
                              <Input
                                className="form-control"
                                type="number"
                                name="discount"
                                placeholder="add Discount"
                                value={values.discount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <p className="error text-danger">
                                {errors.discount &&
                                  touched.discount &&
                                  errors.discount}
                              </p>
                            </Col>
                            <Col lg={2}>
                              <Label className="form-label" htmlFor="category">
                                Start Date
                              </Label>
                              <DatePicker
                                className="form-control"
                                selected={values.start}
                                onChange={(date) =>
                                  setFieldValue("start", date)
                                }
                                placeholderText="Select a date"
                              />
                              <p className="error text-danger">
                                {errors.start && touched.start && errors.start}
                              </p>
                            </Col>
                            <Col lg={2}>
                              <Label
                                className="form-label g-2"
                                htmlFor="category"
                              >
                                Valid Till
                              </Label>
                              <DatePicker
                                className="form-control"
                                selected={values.expiry}
                                onChange={(date) =>
                                  setFieldValue("expiry", date)
                                }
                                placeholderText="Select a date"
                              />
                              <p className="error text-danger">
                                {errors.expiry &&
                                  touched.expiry &&
                                  errors.expiry}
                              </p>
                            </Col>

                            <div className="text-end mb-3"></div>
                          </Row>

                          <Row className="align-items-last justify-content-end">
                            <Col lg={1}>
                              <div className="mt-2">
                                <Input
                                  type="checkbox"
                                  id="isActive"
                                  label="Is Active"
                                  name="active"
                                  checked={values.active}
                                  onChange={handleChange}
                                  // onBlur={handleBlur}
                                />

                                <Label
                                  className="form-label g-2"
                                  htmlFor="active"
                                >
                                  Is Active
                                </Label>
                              </div>
                            </Col>

                            <Col lg={1} style={{marginRight:'30px'}}>
                              <button
                                type="submit"
                                className="btn btn-success w-sm"
                                //   onClick={togglesuccessmodal}
                              >
                                Submit
                              </button>
                            </Col>

                            <Col lg={1}>
                              <button
                                type="button"
                                className="btn btn-soft-danger"
                                onClick={() => {
                                  navigate("/coupons");
                                }}
                              >
                                Cancel
                              </button>
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

export default AddCoupons;
