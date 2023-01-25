import React, { useState, useEffect, useMemo, useRef } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UpdateUser } from "../services/UserService";
import JoditEditor from "jodit-react";

export default function ProfileDetail({ user }) {
  const [modalShow, setModelShow] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  const editor = useRef(null);
  const [content, setContent] = useState();

  useEffect(() => {
    setContent(user.about);
    setValue("about", user.about);
  }, [modalShow]);

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

  const onSubmitHandle = async (formD) => {
    await UpdateUser(user.userId, formD).then(() => {
      setModelShow(!modalShow);
    });
  };

  return (
    <>
      <Col>
        <Row>
          <Col sm={2} xs={4}>
            <Image
              src={`http://localhost:3001/imagesProfile/${user.profileImg}`}
              alt="Profile"
              fluid={true}
              className=" rounded"
            />
          </Col>
          <Col sm={10} xs={8}>
            <h2 className="m-0">{user.username}</h2>
            <h5 className="mb-4 text-muted">{user.description}</h5>
            <h6 className="text-muted m-0">About</h6>
            <p
              className="font-italic mb-1"
              dangerouslySetInnerHTML={{ __html: user.about }}
            />
            <Button
              type="button"
              className="btn btn-dark mt-2"
              onClick={onHandleChange}
            >
              Edit profile
            </Button>
          </Col>
        </Row>
      </Col>

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
                    defaultValue={user.username}
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
                    defaultValue={user.fullName}
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
                    defaultValue={user.description}
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
                    defaultValue={user.email}
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
  );
}
