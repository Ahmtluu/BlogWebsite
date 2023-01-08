import React, { useState } from "react";
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { Container, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import Categories from "../components/Categories";

export default function PostUpdate() {
  const location = useLocation();
  const currentPost = location.state.post;
  const [post, setPost] = useState(currentPost);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const postContent = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setValue("content", postContent);
  };

  function onSubmit(data) {
    console.log(data);
  }

  return post ? (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="w-100">
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
                onChange={(event) => setValue("category", event.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        </Form.Group>
        <input type="submit" className="btn btn-primary" />
      </Form>
    </Container>
  ) : (
    <div>loading</div>
  );
}
