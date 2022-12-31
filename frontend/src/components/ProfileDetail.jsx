import React, { useState} from "react";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UpdateUser } from "../services/UserService";
import 'react-18-image-lightbox/style.css';
import "./ProfileDetail.css";

export default function ProfileDetail({ currentUser, getProfileData }) {
  const { register, handleSubmit } = useForm();
  const [modalShow, setModelShow] = useState(false);
  const [imageModalShow, setImageShow] = useState(false);

  const onHandleChange = () => {
    setModelShow(!modalShow);
  };
  const onImageHandleChange=()=>{
    setImageShow(!imageModalShow)

  }

  const onSubmitHandle = async (data) => {
    UpdateUser(currentUser.userId, data);
    getProfileData();
    setModelShow(!modalShow);
  };


  return (
    <Container>
      {currentUser && (
        <>
          <div
            className="rounded-top text-white d-flex flex-row"
            style={{ backgroundColor: "#000", height: "200px" }}
          >
            <div
              className="ms-4 mt-5 d-flex flex-column"
              style={{ width: "150px" }}
            >
     
                <Button className=" mt-4 mb-2 p-0 bg-dark shadow-none btn-link rounded" onClick={onImageHandleChange}>
                  {" "}
                  <img
                    src={`http://localhost:3001/images/${currentUser.profileImg}`}
                    alt="Profile"
                    className="image"
                    style={{ width: "100%", height: "100%", }}
                  />
                </Button>
     

              <Button
                type="button"
                className="btn btn-dark"
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
        </>
      )}

      <Modal show={modalShow} size={"xl"} onHide={onHandleChange}>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="w-50">
              <Col>
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
              <Col>
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
              <Col>
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

            <Form.Group className="mb-3">
              <Form.Label>About</Form.Label>
              <textarea
                defaultValue={currentUser.about}
                className="form-control"
                id="formAboutArea"
                {...register("about")}
                rows="3"
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
