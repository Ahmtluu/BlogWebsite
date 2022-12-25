import React, { useState, useEffect } from "react";
import profileImage from "../assets/images/profileImage.png";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { cookies } from "../services/UserService";

export default function ProfileDetail({ currentUser }) {
  const [show, setShow] = useState(false);

  let isLoggedIn = cookies.get("isAuth");

  const onHandleChange = () => {
    setShow(!show);
  };

  return (
    <>
      {currentUser ? (
        <>
          <div
            className="rounded-top text-white d-flex flex-row"
            style={{ backgroundColor: "#000", height: "200px" }}
          >
            <div
              className="ms-4 mt-5 d-flex flex-column"
              style={{ width: "150px" }}
            >
              <img
                src={`http://localhost:3001/images/${currentUser.profileImage}`}
                alt="Generic placeholder image"
                className="img-fluid img-thumbnail mt-4 mb-2"
                style={{ width: "150px", zIndex: "1" }}
              />
              {isLoggedIn ? (
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-mdb-ripple-color="dark"
                  onClick={onHandleChange}
                  style={{ zIndex: "1" }}
                >
                  Edit profile
                </button>
              ) : (
                <></>
              )}
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
      ) : (
        <></>
      )}
      <Modal show={show} size={"xl"} onHide={onHandleChange}>
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable={true}>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="email" placeholder="Username" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="password" placeholder="Full Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Col>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleChange}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
