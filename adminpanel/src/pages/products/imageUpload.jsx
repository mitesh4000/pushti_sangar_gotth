import React, { useCallback, useState, useMemo, useEffect } from "react";
import Dropzone from "react-dropzone";

import {
  Card,
  CardBody,
  Col,
  Row,
 
} from "reactstrap";
import { Link} from "react-router-dom";

const ImageUpload = ({getSelectedImages,images}) => {
  const [selectedFiles, setselectedFiles] = useState([]);
  function handleAcceptedFiles(files) {
    const updatedSelectedFiles = selectedFiles.concat(files);

    // productForm.setFieldValue("imageGallery", updatedSelectedFiles);
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setselectedFiles(updatedSelectedFiles);
    getSelectedImages(images?updatedSelectedFiles:null)
  }

  useEffect(() => {
    console.log(images);
    // const updatedSelectedFiles = images.map(item => `${process.env.REACT_APP_BASE_URL}/products/${item}`);
    setselectedFiles(images);
  }, [images]); 
  



  return (

        <React.Fragment>
        <Row className="align-items-center g-3">
          <Col sm={12}>
            <div>
              <h5 className="fs-14 mb-1">Product Gallery</h5>
              <p className="text-muted">Add Atleast 4 Product Images.</p>

              <Dropzone
                onDrop={(acceptedFiles) => {
                  handleAcceptedFiles(acceptedFiles);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone dz-clickable">
                    <div className="dz-message needsclick" {...getRootProps()}>
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
              <div className="list-unstyled mb-0" id="file-previews">
                {selectedFiles.map((f, i) => {
                  return (
                    <Card
                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                      key={i + "-file"}
                    >
                      <div className="p-2">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                         { typeof f === "string"?<img
                              data-dz-thumbnail=""
                              height="80"
                              className="avatar-sm rounded bg-light"
                              alt={f.name}
                              src={`${process.env.REACT_APP_BASE_URL}/products/${f}`}

                            />:<img
                            data-dz-thumbnail=""
                            height="80"
                            className="avatar-sm rounded bg-light"
                            alt={f.name}
                            src={f.preview}

                          />}
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
                          <Col className="col-auto">
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={(e) => {
                                const updatedSelectedFiles = [...selectedFiles];
                                updatedSelectedFiles.splice(i, 1); // Remove the element at index i
                                setselectedFiles(updatedSelectedFiles); // Update the state
                                getSelectedImages(updatedSelectedFiles)
                              }}
                            >
                              <i className="ri-delete-bin-5-fill align-bottom" />
                            </button>
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
       
        </React.Fragment>
        

  );
};

export default ImageUpload;
