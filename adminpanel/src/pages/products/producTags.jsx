import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { Col } from "reactstrap";

const ProducTags = (props) => {
  return (
    <Col md={12}>
      <div>
        <label className="form-label" htmlFor="tags">
          Add tags for searching
        </label>

        <TagsInput
          value={props.data}
          onChange={(item) => {
            props.sendTagsToParent(item);
          }}
          name="tags"
          placeHolder="enter tags"
        />
        {/* <em>press enter or comma to add new tag</em> */}
      </div>
    </Col>
  );
};

export default ProducTags;
