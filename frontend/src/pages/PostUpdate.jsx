import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Select from "react-select";
import Categories from "../components/Categories";
import { UpdatePost } from "../services/PostService";

import JoditEditor from "jodit-react";
import "../components/EditorStyle.css";

export default function PostUpdate() {
  const location = useLocation();
  const currentPost = location.state.post;
  const user = location.state.User;
  const [post, setPost] = useState(currentPost);

  const editor = useRef(null);
  const [content, setContent] = useState(post.content);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  const userNavigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      await UpdatePost(data, post._id, user).then(() =>
        userNavigate(`/profile/${user.userId}`)
      );
    } catch (error) {
      /**TODO send error to user */
      console.log(error);
    }
  }

  useEffect(() => {
    setValue("category", post.category);
  }, [post]);

  /**TODO:Form Validation */
  return post ? (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="flex-row-reverse">
          <Col lg={6} className="d-flex justify-content-end">
            <Button variant="secondary" type="submit" className="w-25">
              Update
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
                defaultValue={post.title}
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
                  (category) => category.value === post.category
                )}
                onChange={(event) => {
                  setValue("category", event.value);
                }}
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
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setValue("content", newContent);
            }}
          />
        </Form.Group>
      </Form>
    </Container>
  ) : (
    <div>loading</div>
  );
}
