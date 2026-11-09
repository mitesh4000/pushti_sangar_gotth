import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SignContext from "../../contextAPI/Context/SignContext";
import { Card, Col, Container, Form, Input, Label, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const EditStocks = () => {
  const { id } = useParams();
  const { GetSpecificStocks, UpdateStocks ,getProducts } = useContext(SignContext);
  const [StocksData, setStocksData] = useState({
    ProductId: "",
    quantity: "",
    currentPricePerUnit: "",
  });
  const [Product, setProduct] = useState([]);

  const Getproducts = async () => {
    const res = await getProducts();
    console.log(res);
    setProduct(res.products);
  };

  const getspecificStocks = async (id) => {
    const res = await GetSpecificStocks(id);
    console.log(res);
    if (res.success) {
      setStocksData(res.stock);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setStocksData({
      ...StocksData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await UpdateStocks(StocksData, id);
    console.log(res);
    if (res.success) {
      // Handle success
      // For example, display a success message and reset the form
      console.log("Content updated successfully");
      setStocksData({
        ProductId: "",
        quantity: "",
        currentPricePerUnit: "",
      });
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
    }
  };


  
  useEffect(() => {
    Getproducts();
    getspecificStocks(id);
  }, [id]);


  return (
  <>
     <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Stocks" pageTitle="Stocks" />
          <Row>
            <Col lg={12}>
              <Form onSubmit={handleSubmit}>
                <Card>
                  <div className="card-body">
                    <div className="live-preview">
                      <Row className="align-items-center g-3">
                        <Col lg={6}>
                          <Label className="form-label" htmlFor="category">
                            Select Product
                          </Label>
                          <select
                            className="form-select"
                            id="state"
                            name="ProductId"
                            value={StocksData.ProductId}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                          >
                            {Product.map((product) => {
                              return (
                                <option key={product._id} value={product._id}>
                                  {product.name}
                                </option>
                              );
                            })}
                          </select>
                        </Col>
                        <Col lg={6}>
                          <Label className="form-label" htmlFor="category">
                            Add Quantity
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="quantity"
                            placeholder="add quantity"
                            value={StocksData.quantity}
                            onChange={handleChange}
                          />
                        </Col>
                      </Row>
                      <Row className="align-items-center g-3">
                        <Col lg={6}>
                          <div className="mt-3">
                            <Label className="form-label" htmlFor="category">
                              Add Current Price
                            </Label>
                            <Input
                              className="form-control"
                              type="text"
                              name="currentPricePerUnit"
                              placeholder="add current price"
                              value={StocksData.currentPricePerUnit}
                              onChange={handleChange}
                            />
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
                    Submit
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
  </>
  );
};

export default EditStocks;
