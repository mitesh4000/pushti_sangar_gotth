import React, { useContext, useMemo, useState } from "react";
import UiContent from "../../Components/Common/UiContent";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  Form,
  CardHeader,
} from "reactstrap";
import JoditEditor from "jodit-react";
import SignContext from "../../contextAPI/Context/SignContext";
import { toast, ToastContainer } from "react-toastify";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const AddContent = () => {
  const { addContent } = useContext(SignContext);
  const navigate = useNavigate();
  const [ContentData, setContentData] = useState({
    contentType: "",
    content: "",
    active: true,
  });
  const [editorContent, setEditorContent] = useState("");

  const validationSchema = Yup.object().shape({
    contentType: Yup.string().required("Content-Type is required"),
    content: Yup.string().required("Content is required"),
  });

  const handleEditorChange = (newContent) => {
    // Step 3: Implement a function to update the editor content
    setEditorContent(newContent);

    // Also update the content field in the ContentData state
    setContentData({
      ...ContentData,
      content: newContent,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setContentData({
      ...ContentData,
      [name]: newValue,
    });
  };

  const handleSavedContent = async (Values) => {
    const res = await addContent(Values);
    console.log(res);
    if (res.success) {
      // Handle success
      toast.success("Content Added Successfully", { autoClose: 3000 });
      navigate("/contentmanage");
      console.log("Content added successfully");
    } else {
      // Handle error
      console.error("Error adding content:", res.msg);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  document.title = "Add Content | Content";

  return (
    <>
      <UiContent />
      <ToastContainer />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb grandParent="Setup" parent="CMS" child="Add Content" />
          <Row>
            <Col lg={12}>
              <Formik
                initialValues={{
                  contentType: "",
                  content: "",
                  active: true,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                  await handleSavedContent(values);
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
                      <CardHeader className="d-flex justify-content-between align-items-center">
                        <h4 className="card-title mb-0">All Content</h4>
                      </CardHeader>
                      <div className="card-body">
                        <div className="live-preview">
                          <Row className="align-items-center g-3">
                            <Col lg={12}>
                              <Label className="form-label" htmlFor="category">
                                Content-Type
                              </Label>
                              <Input
                                className="form-control"
                                type="text"
                                name="contentType"
                                placeholder="add Content-Type"
                                value={values.contentType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <p className="error text-danger">
                                {errors.contentType &&
                                  touched.contentType &&
                                  errors.contentType}
                              </p>
                            </Col>
                          </Row>
                          <Row className="align-items-center g-3">
                            <Col lg={12}>
                              <div className="mt-3">
                                <Label
                                  htmlFor="contentinput"
                                  className="form-label"
                                >
                                  Enter Contents
                                </Label>
                                <JoditEditor
                                  config={config}
                                  tabIndex={1}
                                  id="content"
                                  name="content"
                                  value={values.content}
                                  onChange={(content) =>
                                    setFieldValue("content", content)
                                  }
                                  onBlur={handleBlur}
                                />
                                <p className="error text-danger">
                                  {errors.content &&
                                    touched.content &&
                                    errors.content}
                                </p>
                              </div>

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
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddContent;
