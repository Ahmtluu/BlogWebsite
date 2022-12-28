import React, { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { PostCreate } from "../services/PostService";
import Select from "react-select";
import Categories from "./Categories";
import { GetAllPosts } from "../services/PostService";

export default function ProfileRecent({ currentUser, getProfileData }) {
  const [show, setShow] = useState(false);
  const [userPosts, setUserPosts] = useState();
  const { setValue, handleSubmit } = useForm();
  const onHandleChange = () => {
    setShow(!show);
  };

  useEffect(() => {
    const getReleativePost = async () => {
      await GetAllPosts().then((response) => {
        setUserPosts(response);
      });
    };

    return () => {
      getReleativePost();
    };
  }, []);

  const onSubmitHandle = async (formData) => {
    PostCreate(formData, currentUser);
    getProfileData();
    setShow(!show);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="lead fw-normal mb-0">Recent Posts</p>

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
                      type="file"
                      id="formCover"
                      className="form-control"
                      onChange={(e) => {
                        setValue("cover", e.target.value);
                      }}
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
                      onChange={(e) => {
                        setValue("title", e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Select
                      onChange={(e) => {
                        setValue("category", e.value);
                      }}
                      options={Categories}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <textarea
                  className="form-control"
                  onChange={(e) => {
                    setValue("content", e.target.value);
                  }}
                  id="formAboutArea"
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
      <Row>
      {userPosts &&
      
        userPosts.map((post) => {
          return (
            
          <Col md={4}>
           <Card className="mb-2">
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text style={{
                  height:"125px"
                }}>
                 {post.content}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card></Col>
           
          );
        })}
        </Row>
    </>
  );
}
