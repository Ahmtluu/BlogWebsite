import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { cookies } from "../services/UserService";
import { useForm } from "react-hook-form";
import { PostCreate } from "../services/PostService";

export default function ProfileRecent({ currentUser, getProfileData }) {
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();

  let isLoggedIn = cookies.get("isAuth");

  const onHandleChange = () => {
    setShow(!show);
  };

  const onSubmitHandle = async (formData) => {
    PostCreate(formData, currentUser);
    getProfileData();
    setShow(!show);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <p className="lead fw-normal mb-0">Recent Posts</p>
      {isLoggedIn ? (
        <div className="d-flex">
          {" "}
          <button
            type="button"
            className="btn btn-outline-dark"
            data-mdb-ripple-color="dark"
            onClick={onHandleChange}
          >
            Add new
          </button>
        </div>
      ) : (
        <></>
      )}

      <Modal show={show} size={"xl"} onHide={onHandleChange}>
        <Modal.Header>
          <Modal.Title>Create New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="w-100">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Cover</Form.Label>
                  <input
                    type="text"
                    id="formTitle"
                    className="form-control"
                    {...register("cover")}
                  />
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
                    {...register("title")}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <input
                    type="text"
                    id="formCategory"
                    className="form-control"
                    {...register("category")}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <textarea
                className="form-control"
                id="formAboutArea"
                {...register("content")}
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
    </div>
  );
}
