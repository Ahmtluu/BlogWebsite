import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import Categories from "../components/Categories";
import { useForm } from "react-hook-form";
import { CreatePost } from "../services/PostService";
import { cookies } from "../services/UserService";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";

import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

export default function PostAdd() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  let usernavigate = useNavigate();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/doc/,
      placeholder: "Start typings...",
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),

    []
  );

  const onSubmit = (data) => {
    var token = cookies.get("jwt_authorization");
    var currentUser = jwt_decode(token);
    try {
      CreatePost(data, currentUser);
      usernavigate(`/profile/${currentUser.sub}`);
    } catch (error) {
      console.log(error);
    }
  };

  /* TODO:Form Validation */

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="flex-row-reverse">
          <Col lg={6} className="d-flex justify-content-end">
            <Button variant="secondary" type="submit" className="w-25">
              Add
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Cover Image</Form.Label>
              <input
                type="file"
                id="cover"
                className="form-control"
                {...register("cover")}
              />
              {errors.name && errors.name.type === "required" && (
                <span>This is required</span>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <input
                type="title"
                id="formTitle"
                className="form-control"
                {...register("title", { required: true })}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Select
                options={Categories}
                defaultValue={Categories.filter(
                  (category) => category.value === Categories[0].value
                )}
                onChange={(event) => setValue("category", event.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onChange={(newContent) => {
              setValue("content", newContent);
            }}
          />
        </Form.Group>
      </Form>
    </Container>
  );
}
