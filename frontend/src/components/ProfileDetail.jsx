import React, { useState, useEffect, useMemo, useRef } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UpdateUser } from "../services/UserService";
import { GetCurrentUser } from "../services/UserService";
import JoditEditor from "jodit-react";

export default function ProfileDetail({ userId }) {
  const [currentUser, setUser] = useState();
  const [modalShow, setModelShow] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  async function getUserData() {
    const response = await GetCurrentUser(userId);
    setUser(response);
    if (currentUser) {
      setValue("about", currentUser.about);
    }
  }

  const editor = useRef(null);
  const [content, setContent] = useState();
  const config = useMemo(
    () => ({
      readonly: false,
      defaultActionOnPaste: "insert_only_text",
      placeholder: "Start typing...",
      buttons:
        "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript",
    }),
    []
  );

  const onHandleChange = () => {
    setModelShow(!modalShow);
  };

  const onSubmitHandle = async (data) => {
    await UpdateUser(currentUser.userId, data).then(() => {
      getUserData();
      setModelShow(!modalShow);
    });
  };

  useEffect(() => {
    getUserData();
    if (currentUser) setContent(currentUser.about);
  }, [modalShow]);

  return (
    <>
      {currentUser ? (
        <>
          <Col>
            <Row>
              <Col sm={2} xs={4}>
                <Image
                  src={`http://localhost:3001/imagesProfile/${currentUser.profileImg}`}
                  alt="Profile"
                  fluid={true}
                  className=" rounded"
                />
              </Col>
              <Col sm={10} xs={8}>
                <h2 className="m-0">{currentUser.username}</h2>
                <h5 className="mb-4 text-muted">{currentUser.description}</h5>
                <h6 className="text-muted m-0">About</h6>
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

          <Modal show={modalShow} size={"xl"} onHide={onHandleChange}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Profile Image</Form.Label>
                      <input
                        type="file"
                        id="profileImg"
                        className="form-control"
                        {...register("profileImg")}
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
                      <Form.Label>Description</Form.Label>
                      <input
                        type="text"
                        id="formDescription"
                        defaultValue={currentUser.description}
                        className="form-control"
                        {...register("description")}
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
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) => {
                      setValue("about", newContent);
                    }}
                  />
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit(onSubmitHandle)}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
