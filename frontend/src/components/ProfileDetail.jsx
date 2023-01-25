import React, { useState, useEffect, useMemo, useRef } from "react";
import { Modal, Button, Form, Row, Col, Image,Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UpdateUser } from "../services/UserService";
import JoditEditor from "jodit-react";
import ProfileImageUploader from "./ProfileImageUploader";

export default function ProfileDetail({ user }) {
  const [modalShow, setModelShow] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [imageModalShow, setImageShow]=useState(false);

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
  const onImageHandleChange=()=>{
    setImageShow(!imageModalShow);
  }


  return (
    <>
      <Col>
        <Row>
          <Col md={4} lg={3} className="d-flex justify-content-center align-items-center">
            <Button className="border-0 bg-white p-0 m-1 " onClick={onImageHandleChange}>
              <Image
              src={`http://localhost:3001/imagesProfile/${user.profileImg}`}
              alt="Profile"
              height={300} width={250}
              className="rounded"
            />  
            </Button>

          </Col>
          <Col md={8} lg={9} className="d-flex flex-column justify-content-center">
            <h2 className="m-0 text-center text-lg-start">{user.username}</h2>
            <h5 className="mb-4 text-center text-lg-start text-muted">{user.description}</h5>
            <h6 className="text-muted m-0">About</h6>
            <p
              className="font-italic mb-1"
              dangerouslySetInnerHTML={{ __html: user.about }}
            />
            <Button
              type="button"
              className="btn btn-dark mt-2 w-25"
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

<ProfileImageUploader imageShow={imageModalShow} currentImage={user.profileImg} onHandleChange={onImageHandleChange}/>
    </>
  );
}
