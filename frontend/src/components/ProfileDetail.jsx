import React, { useState, useEffect } from "react";
import profileImage from "../assets/images/profileImage.png";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { cookies } from "../services/UserService";
import { UpdateUser } from "../services/UserService";

export default function ProfileDetail({ currentUser }) {
  const { register, handleSubmit } = useForm();
  const [show, setShow] = useState(false);

  let isLoggedIn = cookies.get("isAuth");
  console.log(currentUser);

  const onHandleChange = () => {
    setShow(!show);
  };

  const onSubmitHandle = async (data) => {
    UpdateUser(currentUser.userId, data);
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
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Profile Image</Form.Label>
                  <input
                    type="file"
                    className="form-control"
                    {...register("profileImg")}
                  />
                </Form.Group>
              </Col>
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
            </Row>
            <Row>
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
    </>
  );
}
