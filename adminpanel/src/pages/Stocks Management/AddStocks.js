import React, { useContext, useEffect, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import UiContent from "../../Components/Common/UiContent";
import { Card, Col, Container, Form, Input, Label, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Formik } from "formik";

const AddStocks = ({ refreshTable, StockForUpdate,setStockForUpdate }) => {
  const { AddStocks, getProducts, UpdateStocks } = useContext(SignContext);

  const [Product, setProduct] = useState([]);
  const [editingStockId, setEditingStockId] = useState(null);
  const [selectedForUpdate, setSelectedForUpdate] = useState(null);
  const [SelectedProductId, setSelectedProductId] = useState("");

  const handleSavedStocks = async (Values) => {
    // if (StockForUpdate) {
    //   const res = await UpdateStocks(StockForUpdate._id, Values);
      
    //   if (res.success) {
    //     refreshTable();
    //     setSelectedProductId("");

    //     setEditingStockId(null);
    //   } else {
    //     console.error("Error updating stock:", res.msg);
    //   }
    // } else {
      const res = await AddStocks(Values);
      if (res.success) {
        refreshTable();
        setSelectedProductId("");
      } else {
        console.error("Error adding stock:", res.msg);
      }
    
  };

  const Getproducts = async () => {
    const res = await getProducts();
    setProduct(
      res.products.map((item) => {
        return { value: item._id, label: item.sku };
      })
    );
  };

  useEffect(() => {
    Getproducts();
    setSelectedForUpdate(StockForUpdate);
    const filteredProduct = Product.filter(
      (item) => item.value === StockForUpdate.ProductId
    );

    setSelectedProductId(filteredProduct);
    console.log(filteredProduct);
    console.log(StockForUpdate);
    console.log(Product);
  }, [StockForUpdate]);

  const validationSchema = Yup.object().shape({
    ProductId: Yup.string().required("Select a product"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .required("Enter the quantity")
      .positive("Quantity must be a positive number"),
    currentPricePerUnit: Yup.number()
      .typeError("Price must be a number")
      .required("Enter the current price")
      .positive("Price must be a positive number"),
    date: Yup.date().required("Select a date"),
  });

  document.title = "Stocks";

  return (
    <>
      <Row>
        <Col lg={12}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              ProductId: SelectedProductId.value || "",
              quantity: (selectedForUpdate && selectedForUpdate.quantity) || "",
              currentPricePerUnit:
                (selectedForUpdate && selectedForUpdate.currentPricePerUnit) ||
                "",
              date:
                (selectedForUpdate &&
                  new Date(selectedForUpdate.date.split("T")[0])) ||
                null,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              await handleSavedStocks(values);
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
              isValid,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="align-items-center g-3">
                  <Col lg={4} md={6}>
                    <Label className="form-label" htmlFor="category">
                      select product with SKU*
                    </Label>
                    <Select
                      value={SelectedProductId}
                      onChange={(selectedOption) => {
                        setSelectedProductId(selectedOption);
                        // handleChange("ProductId")(selectedOption);
                      }}
                      options={Product}
                    />
                  </Col>
                

                  <Col lg={2}>
                    <Label className="form-label" htmlFor="category">
                      Add Quantity*
                    </Label>
                    <Input
                      className="form-control"
                      name="quantity"
                      type="number"
                      placeholder="add quantity"
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col lg={2}>
                    <Label className="form-label" htmlFor="category">
                      Add Current Price*
                    </Label>
                    <Input
                      className="form-control"
                      type="number"
                      name="currentPricePerUnit"
                      placeholder="add current price"
                      value={values.currentPricePerUnit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                  <Col lg={2}>
                    <Label className="form-label" htmlFor="category">
                      Date
                    </Label>
                    <DatePicker
                      className="form-control"
                      selected={values.date}
                      onChange={(date) => setFieldValue("date", date)}
                      placeholderText="Select a date"
                    />
                  </Col>
                  <Col lg={1}>
                    <div className="text-center">
                    {/* <button
                       
                        type="submit"
                        className="btn btn-soft-danger w-sm mt-4"
                        onClick={setStockForUpdate(null)}
                      >
                        Cancel
                      </button> */}
                      <button
                        disabled={isSubmitting || !isValid}
                        type="submit"
                        className="btn btn-primary w-sm mt-4"
                        //   onClick={togglesuccessmodal}
                      >
                        Submit
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  );
};

export default AddStocks;
