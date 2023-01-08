import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Container,
  Image,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { UpdateUser } from "../services/UserService";

export default function ProfileDetail({ currentUser, getProfileData }) {
  const _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw);

  const { register, handleSubmit, setValue } = useForm();
  const [modalShow, setModelShow] = useState(false);
  const [editorState, setEditorState] = useState(contentState);

  const onHandleChange = () => {
    setModelShow(!modalShow);
  };

  const onSubmitHandle = async (data) => {
    UpdateUser(currentUser.userId, data);
    getProfileData();
    setModelShow(!modalShow);
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const about = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setValue("about", about);
  };

  return (
    <Container>
      {currentUser && (
        <>
          <Row>
            <Col md={4}>
              {" "}
              <Image
                src={`http://localhost:3001/profileImages/${currentUser.profileImg}`}
                alt="Profile"
                className="image"
                style={{ width: "100%", height: "100%" }}
              />
            </Col>
            <Col md={8}>
              <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                <p
                  className="font-italic mb-1"
                  dangerouslySetInnerHTML={{ __html: currentUser.about }}
                />
              </div>
            </Col>
          </Row>
          <div
            className="rounded-top text-white d-flex flex-row"
            style={{ backgroundColor: "#000", height: "200px" }}
          >
            <div
              className="ms-4 mt-5 d-flex flex-column"
              style={{ width: "150px" }}
            >
              <Button
                type="button"
                className="btn btn-dark mt-2"
                onClick={onHandleChange}
              >
                Edit profile
              </Button>
            </div>
            <div className="ms-3" style={{ marginTop: "150px" }}>
              <h5>{currentUser.username}</h5>
            </div>
          </div>
          <div
            className="p-4 text-black"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div className="d-flex justify-content-end text-center py-1">
              <div>
                <p className="mb-1 h5">253</p>
                <p className="small text-muted mb-0">Total Posts</p>
              </div>
            </div>
          </div>
          <div className="mb-5 mt-4">
            <p className="lead fw-normal mb-2">About</p>
          </div>
        </>
      )}
      <Modal show={modalShow} size={"xl"} onHide={onHandleChange}>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="d-flex flex-row">
              <Form.Group className="mb-3">
                <Form.Label>Profile Image</Form.Label>
                <input
                  type="file"
                  id="profileImg"
                  className="form-control"
                  {...register("profileImg")}
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <input
                      type="text"
                      id="formFullName"
                      defaultValue={currentUser.fullName}
                      className="form-control"
                      {...register("fullName")}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <input
                      type="text"
                      id="formUsername"
                      defaultValue={currentUser.username}
                      className="form-control"
                      {...register("username")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {" "}
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <input
                      type="email"
                      id="formEmail"
                      defaultValue={currentUser.email}
                      className="form-control"
                      {...register("email")}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <input
                      type="password"
                      id="formPassword"
                      className="form-control"
                      {...register("password")}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>About</Form.Label>
              <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleChange}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmitHandle)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
