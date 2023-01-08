import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Categories from "../components/Categories";
import { useForm } from "react-hook-form";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { PostCreate } from "../services/PostService";
import { cookies } from "../services/UserService";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";

export default function PostAdd() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  let usernavigate = useNavigate();

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

  const onSubmit = async (data) => {
    var token = cookies.get("jwt_authorization");
    var currentUser = jwt_decode(token);
    await PostCreate(data, currentUser).then(() => {
      usernavigate(`/profile/${currentUser.sub}`);
    });
  };

  return (
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
  );
}
