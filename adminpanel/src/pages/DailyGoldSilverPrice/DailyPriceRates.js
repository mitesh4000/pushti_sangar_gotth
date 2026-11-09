import React, { useContext, useEffect, useState } from "react";
import UiContent from "../../Components/Common/UiContent";
import { Card, Col, Container, CardHeader, Form, Label, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import SignContext from "../../contextAPI/Context/SignContext";
import { toast, ToastContainer } from "react-toastify";

const DailyPriceRates = () => {
  const { UpdatePrice, GetSpecificPricebyId, GetPriceUpdates } =
    useContext(SignContext);
  const [formData, setFormData] = useState({
    ProductType: "",
    price: "",
  });
  const [DailyPrice, setDailyPrice] = useState([]);

  const getPriceUpdates = async () => {
    const res = await GetPriceUpdates();
    console.log(res);
    setDailyPrice(res.prices);
  };

  const handleProductTypeChange = async (e) => {
    const selectedProductId = e.target.value;
    const selectedPrice = DailyPrice.find(
      (price) => price._id === selectedProductId
    );

    if (selectedPrice) {
      setFormData({
        ...formData,
        ProductType: selectedProductId,
        price: selectedPrice.price, // Prepopulate the price field
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idToUpdate = formData.ProductType;

    const res = await UpdatePrice(
      {
        price: formData.price,
      },
      idToUpdate
    );

    if (res.success) {
      toast.success(res.msg, { autoClose: 3000 });
      console.log("Price updated successfully", res);

      // Optionally, you can reload the prices after the update
      getPriceUpdates();
    }
  };

  useEffect(() => {
    getPriceUpdates();
    // getspecificUser(id);
  }, []);

  document.title = "Daily Rates";

  return (
    <>
      <UiContent />
      <ToastContainer closeButton={false} />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
          grandParent = "Setup"
            parent="Inventory"
            child="Daily Rates"
          />
          <Row>
            <Col lg={12}>
              <Form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <h4 className="card-title mb-0">Update Rates</h4>
                  </CardHeader>
                  <div className="card-body">
                    <div className="live-preview">
                      <Row className="g-3 justify-content-center">
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="ProductType">Product Type:</Label>
                            <select
                              className="form-select"
                              name="ProductType"
                              id="ProductType"
                              value={formData.ProductType}
                              onChange={handleProductTypeChange}
                            >
                              <option value="">Select Type</option>
                              {DailyPrice.map((price) => {
                                return (
                                  <option key={price._id} value={price._id}>
                                    {price.ProductType}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          {/* <div className="mb-3">
                            <Label htmlFor="unit">Unit:</Label>
                            <input
                              type="text"
                              id="unit"
                              name="unit"
                              value={formData.unit}
                              onChange={handleChange}
                            />
                          </div> */}
                          <div className="mb-3">
                            <Label htmlFor="price">Price per gram :</Label>
                            <input
                              className="form-control"
                              type="number"
                              id="price"
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="text-center mb-3">
                            <button
                              type="submit"
                              className="btn btn-success w-sm"
                              //   onClick={togglesuccessmodal}
                            >
                              Update
                            </button>
                          </div>
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

export default DailyPriceRates;
