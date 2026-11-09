import React, { useEffect, useMemo, useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormFeedback,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import Cleave from "cleave.js/react";

import { useFormik } from "formik";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import JoditEditor from "jodit-react";
import {
  addCategory,
  addProduct,
  getCategory,
  getSubCategory,
  getSubSubCategory,
} from "../../../helpers/backend_helper";
import Dropzone from "react-dropzone";

import { Link, useNavigate } from "react-router-dom";

const EcommerceNewAddProduct = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [subCatDropbind, setSubCatDropbind] = useState([]);
  const [subSubCategoryData, setSubSubCategoryData] = useState([]);
  const [subSubCatDropbind, setSubSubCatDropbind] = useState([]);
  const [recordForSubmit, setrecordForSubmit] = useState(null);
  const [errorBanner, setErrorBanner] = useState("");
  const [successBanner, setSuccessBanner] = useState("");
  const [buttnLoading, setButtnLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [selectedFiles, setselectedFiles] = useState([]);

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  function handleAcceptedFiles(files) {
    productForm.setFieldValue("imageGallery", files);
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        // formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  const fetchData = async () => {
    try {
      const res = await getCategory();
      setCategoryData(res);

      const res2 = await getSubCategory();
      setSubCategoryData(res2);

      const res3 = await getSubSubCategory();
      setSubSubCategoryData(res3);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handelCategorySelect = (e) => {
    const data = subCategoryData.filter(
      (item) => item.Category === e.target.value
    );
    setSubCatDropbind(data);
  };

  const handelSubCategorySelect = (event) => {
    console.log(subSubCategoryData);

    const data = subSubCategoryData.filter(
      (item) => item.SubCategory === event.target.value
    );
    setSubSubCatDropbind(data);
    console.log(subSubCatDropbind);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const productForm = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      original: "",
      discounted: "",
      category: "",
      subCategory: "",
      subSubCategory: "",
      stock: "",
      sku: "",
      isProductPopular: true,
      isProductNew: true,
      isActive: true,
      description: "",
      imageGallery: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("required"),
      original: Yup.number().typeError("Must be a number").required("required"),
      stock: Yup.number().typeError("Must be a number").required("required"),
      discounted: Yup.number()
        .typeError("Must be a number")
        .required("required"),
      sku: Yup.string().required("required"),
      category: Yup.string().required("required"),
      subCategory: Yup.string().required("required"),
      subSubCategory: Yup.string().nullable(),
      description: Yup.string().required("required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("original", values.original);
      formData.append("discounted", values.discounted);
      formData.append("category", values.category);
      formData.append("subCategory", values.subCategory);
      formData.append("subSubCategory", values.subSubCategory);
      formData.append("stock", values.stock);
      formData.append("sku", values.sku);
      formData.append("isProductPopular", values.isProductPopular);
      formData.append("isProductNew", values.isProductNew);
      formData.append("isActive", values.isActive);
      formData.append("description", values.description);
      for (let i = 0; i < values.imageGallery.length; i++) {
        formData.append("imageGallery", values.imageGallery[i]);
      }

      try {
        await addProduct(formData);
        console.log(formData);
        fetchData();
        // toggle();
      } catch (error) {
        console.log(formData);

        console.log("Error submitting the form data:", error);
      }
    },
  });

  const handleEditorChange = (content) => {
    productForm.setFieldValue("description", content);
  };

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add Product" pageTitle="Products" />
          <Row>
            <Col lg={12}>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  productForm.handleSubmit();
                  return false;
                }}
              >
                <Card>
                  <div className="card-body">
                    <div className="live-preview">
                      <Row className="align-items-center g-3">
                        {/* Cateogry */}
                        <Col sm={4}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="category-select"
                            >
                              Category
                            </label>
                            <select
                              className="form-select"
                              id="category"
                              name="category"
                              aria-label="category"
                              onBlur={productForm.handleBlur}
                              value={productForm.values.category || ""}
                              onChange={(e) => {
                                productForm.handleChange(e);
                                handelCategorySelect(e);
                              }}
                            >
                              <option value={null}>--select--</option>
                              {categoryData
                                ? categoryData.map((category) => (
                                    <option
                                      key={category._id}
                                      value={category._id}
                                    >
                                      {category.name}
                                    </option>
                                  ))
                                : null}
                            </select>
                            {productForm.touched.category &&
                            productForm.errors.category ? (
                              <FormFeedback type="invalid">
                                {productForm.errors.category}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        {/* Sub Category */}
                        <Col sm={4}>
                          <div className="mb-3">
                            <label className="form-label" htmlFor="subCategory">
                              SubCategory
                            </label>
                            <select
                              className="form-select"
                              id="subCategory"
                              name="subCategory"
                              aria-label="subCategory"
                              onBlur={productForm.handleBlur}
                              value={productForm.values.subCategory || ""}
                              onChange={(e) => {
                                productForm.handleChange(e);
                                handelSubCategorySelect(e);
                              }}
                              invalid={
                                productForm.errors.subCategory &&
                                productForm.touched.subCategory
                                  ? true
                                  : false
                              }
                            >
                              {/* Populate the options dynamically */}
                              <option value={null}>--select--</option>
                              {subCatDropbind
                                ? subCatDropbind.map((item) => (
                                    <option key={item._id} value={item._id}>
                                      {item.name}
                                    </option>
                                  ))
                                : null}
                            </select>
                            {productForm.touched.subCategory &&
                            productForm.errors.subCategory ? (
                              <FormFeedback type="invalid">
                                {productForm.errors.subCategory}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        {/* Sub Sub Category */}
                        <Col sm={4}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="subSubCategory"
                            >
                              SubSubCategory
                            </label>
                            <select
                              className="form-select"
                              id="subSubCategory"
                              name="subSubCategory"
                              aria-label="Category"
                              onBlur={productForm.handleBlur}
                              value={productForm.values.subSubCategory}
                              onChange={(e) => {
                                productForm.handleChange(e);
                               
                              }}
                              invalid={
                                productForm.errors.subSubCategory &&
                                productForm.touched.subSubCategory
                                  ? true
                                  : false
                              }
                            >
                              {/* Populate the options dynamically */}
                              <option value="">--select--</option>

                              {subSubCatDropbind
                                ? subSubCatDropbind.map((item) => (
                                    <option key={item._id} value={item._id}>
                                      {item.name}
                                    </option>
                                  ))
                                : null}
                            </select>
                            {productForm.touched.subSubCategory &&
                            productForm.errors.subSubCategory ? (
                              <FormFeedback type="invalid">
                                {productForm.errors.subSubCategory}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Row className="align-items-center g-3">
                        {/* Ttile */}
                        <Col sm={6}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="product-orders-input"
                            >
                              Product Title
                            </label>
                            <div className="input-group mb-3">
                              <Input
                                type="text"
                                id="name"
                                placeholder="Enter Title"
                                name="name"
                                aria-label="name"
                                value={productForm.name}
                                onChange={productForm.handleChange}
                                onBlur={productForm.handleBlur}
                                invalid={
                                  productForm.errors.name &&
                                  productForm.touched.name
                                    ? true
                                    : false
                                }
                              />
                              {productForm.errors.name &&
                              productForm.touched.name ? (
                                <FormFeedback type="invalid">
                                  {productForm.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>

                        <Row className="align-items-center g-1 mx-2">
                          {/* Price */}
                          <Col sm={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="product-price-input"
                              >
                                Price
                              </label>
                              <div className="input-group mb-3">
                                <span
                                  className="input-group-text"
                                  id="product-price-addon"
                                >
                                  ₹
                                </span>

                                <Input
                                  placeholder="Enter price"
                                  options={{
                                    numeral: true,
                                    numeralThousandsGroupStyle: "thousand",
                                  }}
                                  id="price"
                                  name="original"
                                  className="form-control"
                                  value={productForm.original}
                                  onChange={productForm.handleChange}
                                  onBlur={productForm.handleBlur}
                                  invalid={
                                    productForm.errors.original &&
                                    productForm.touched.original
                                      ? true
                                      : false
                                  }
                                />

                                {productForm.errors.original &&
                                productForm.touched.original ? (
                                  <FormFeedback type="invalid">
                                    {productForm.errors.original}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                          {/* Discounted Price */}
                          <Col sm={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="product-price-input"
                              >
                                Discounted Price
                              </label>
                              <div className="input-group mb-3">
                                <span
                                  className="input-group-text"
                                  id="discounted"
                                >
                                  ₹
                                </span>
                                <Input
                                  placeholder="Enter price"
                                  options={{
                                    numeral: true,
                                    numeralThousandsGroupStyle: "thousand",
                                  }}
                                  id="price"
                                  name="discounted"
                                  className="form-control"
                                  value={productForm.discounted}
                                  onChange={productForm.handleChange}
                                  onBlur={productForm.handleBlur}
                                  invalid={
                                    productForm.errors.discounted &&
                                    productForm.touched.discounted
                                      ? true
                                      : false
                                  }
                                />
                                {productForm.errors.discounted &&
                                productForm.touched.discounted ? (
                                  <FormFeedback type="invalid">
                                    {productForm.errors.discounted}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                          {/* Stocks */}
                          <Col sm={6}>
                            <div className="mb-3">
                              <label className="form-label" htmlFor="stock">
                                Stocks
                              </label>
                              <div className="input-group mb-3">
                                <Cleave
                                  placeholder="enter stock"
                                  options={{
                                    numeral: true,
                                    numeralThousandsGroupStyle: "thousand",
                                  }}
                                  id="stock"
                                  name="stock"
                                  className="form-control"
                                  value={productForm.stock}
                                  onChange={productForm.handleChange}
                                  onBlur={productForm.handleBlur}
                                  invalid={
                                    productForm.errors.stock &&
                                    productForm.touched.stock
                                      ? true
                                      : false
                                  }
                                />
                                {productForm.errors.stock &&
                                productForm.touched.stock ? (
                                  <FormFeedback type="invalid">
                                    {productForm.errors.stock}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                          {/* SKU */}
                          <Col sm={6}>
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="product-orders-input"
                              >
                                SKU
                              </label>
                              <div className="input-group mb-3">
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="sku"
                                  placeholder="Enter Title"
                                  name="sku"
                                  aria-label="sku"
                                  aria-describedby="product-orders-addon"
                                  value={productForm.sku}
                                  onChange={productForm.handleChange}
                                  onBlur={productForm.handleBlur}
                                  invalid={
                                    productForm.errors.sku &&
                                    productForm.touched.sku
                                      ? true
                                      : false
                                  }
                                />
                                {productForm.errors.sku &&
                                productForm.touched.sku ? (
                                  <FormFeedback type="invalid">
                                    {productForm.errors.sku}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </div>
                          </Col>
                        </Row>

                        {/* Attributes checkboxes */}
                        <Row className="align-items-center">
                          <Col sm={2}>
                            <div className="mb-3 form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="isProductPopular"
                                name="isProductPopular"
                                checked={productForm.isProductPopular}
                                onChange={productForm.handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="isProductPopular"
                              >
                                Is Popular Product
                              </label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div className="mb-3 form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="isProductNew"
                                name="isProductNew"
                                checked={productForm.isProductNew}
                                onChange={productForm.handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="isProductNew"
                              >
                                Is New Product
                              </label>
                            </div>
                          </Col>
                          <Col sm={2}>
                            <div className="mb-3 form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="isActive"
                                name="isActive"
                                checked={productForm.isActive}
                                onChange={productForm.handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="isActive"
                              >
                                Is Active
                              </label>
                            </div>
                          </Col>
                        </Row>

                        {/* Description */}
                        <Col lg={12}>
                          <div className="mb-3">
                            <Label>Product Description</Label>
                            <JoditEditor
                              config={config}
                              tabIndex={1}
                              id="description"
                              name="description"
                              value={productForm.description}
                              onChange={handleEditorChange}
                              onBlur={productForm.handleBlur}
                              invalid={
                                productForm.errors.description &&
                                productForm.touched.description
                                  ? true
                                  : false
                              }
                            />
                            {productForm.errors.description &&
                            productForm.touched.description ? (
                              <FormFeedback type="invalid">
                                {productForm.errors.description}
                              </FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>

                      <Row className="align-items-center g-3">
                        <Col sm={12}>
                          <div>
                            <h5 className="fs-14 mb-1">Product Gallery</h5>
                            <p className="text-muted">
                              Add Product Gallery Images.
                            </p>

                            <Dropzone
                              onDrop={(acceptedFiles) => {
                                handleAcceptedFiles(acceptedFiles);
                              }}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div className="dropzone dz-clickable">
                                  <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                  >
                                    <input
                                      {...getInputProps()}
                                      accept="image/*"
                                      name="imageGallery"
                                      multiple
                                    />
                                    <div className="mb-3">
                                      <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                                    </div>
                                    <h5>Drop files here or click to upload.</h5>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            <div
                              className="list-unstyled mb-0"
                              id="file-previews"
                            >
                              {selectedFiles.map((f, i) => {
                                return (
                                  <Card
                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                    key={i + "-file"}
                                  >
                                    <div className="p-2">
                                      <Row className="align-items-center">
                                        <Col className="col-auto">
                                          <img
                                            data-dz-thumbnail=""
                                            height="80"
                                            className="avatar-sm rounded bg-light"
                                            alt={f.name}
                                            src={f.preview}
                                          />
                                        </Col>
                                        <Col>
                                          <Link
                                            to="#"
                                            className="text-muted font-weight-bold"
                                          >
                                            {f.name}
                                          </Link>
                                          <p className="mb-0">
                                            <strong>{f.formattedSize}</strong>
                                          </p>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Card>
                                );
                              })}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Card>

                <div className="text-center mb-3 me-4">
                  <button type="submit" className="btn btn-primary w-lg">
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

export default EcommerceNewAddProduct;
