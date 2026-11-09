import React, { useContext, useEffect, useMemo, useState } from "react";
import SignContext from "../../contextAPI/Context/SignContext";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, Col, Container, Form, Input, Label, Row } from "reactstrap";
import JoditEditor from "jodit-react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import UiContent from "../../Components/Common/UiContent";

const EditContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { GetSpecificContent, UpdateContent } = useContext(SignContext);
  const [ContentData, setContentData] = useState({
    contentType: "",
    content: "",
    active: true,
  });
  const [editorContent, setEditorContent] = useState("");

  const getspecificContent = async (id) => {
    const res = await GetSpecificContent(id);
    console.log(res);
    if (res.success) {
      setContentData(res.content);
    }
  };

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await UpdateContent(ContentData, id);

    console.log(res);
    if (res.success) {
      // Handle success
      // For example, display a success message and reset the form
      console.log("Content updated successfully");
      setContentData({
        contentType: "",
        content: "",
        active: true,
      });
      navigate("/contentmanage");
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

  document.title = "Update Content | Content";

  useEffect(() => {
    getspecificContent(id);
  }, [id]);

  return (
    <>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb grandParent="Setup" parent="CMS" child="Edit Content" />
          <Row>
            <Col lg={12}>
              <Form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader className="d-flex justify-content-between align-items-center">
                    <h4 className="card-title mb-0">Edit Content</h4>
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
                            value={ContentData.contentType}
                            onChange={handleChange}
                          />
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
                              value={ContentData.content}
                              onChange={handleEditorChange}
                            />
                          </div>

                          <div className="mt-3">
                            <Input
                              type="checkbox"
                              id="isActive"
                              label="Is Active"
                              name="active"
                              checked={ContentData.active}
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
  );
};

export default EditContent;
