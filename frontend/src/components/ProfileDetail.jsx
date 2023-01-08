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
  const { register, handleSubmit, setValue } = useForm();
  const [modalShow, setModelShow] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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
    const userAbout = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    setValue("about", userAbout);
  };

  return (
    <Container>
      {currentUser && (
        <>
          <Col xs={8}>
            <Row>
              <Col xs={4}>
                <Image
                  src={`http://localhost:3001/profileImages/${currentUser.profileImg}`}
                  alt="Profile"
                  fluid={true}
                  className=" rounded"
                />
              </Col>
              <Col xs={8}>
                <h3 className="m-0">{currentUser.username}</h3>
                <p>Jr. Full Stack (MERN) & React Native Dev</p>
                <h6 className="text-muted">About</h6>
                <p
                  className="font-italic mb-1"
                  dangerouslySetInnerHTML={{ __html: currentUser.about }}
                />
              </Col>
            </Row>
          </Col>

          <Button
            type="button"
            className="btn btn-dark mt-2"
            onClick={onHandleChange}
          >
            Edit profile
          </Button>
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
