import React, { useState, useEffect,lazy } from "react";
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import { GetAllPosts, PostDelete } from "../services/PostService";
import { FaSync } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function ProfileRecent({ currentUser, getProfileData }) {

  const [userPosts, setUserPosts] = useState();
  const [selectedPost, setPost] = useState({});

  let navigate= useNavigate()
  const getReleativePost = async () => {
    const response = await GetAllPosts();
    setUserPosts(response);
  };

  useEffect(() => {
    getReleativePost();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="lead fw-normal mb-0">Recent Posts</p>
        <div className="d-flex">
          {" "}
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={(e)=>{
             navigate("/posts/add_new")
            }}
          >
            Add new
          </button>
        </div>
      </div>
      <Row>
        {userPosts &&
          userPosts.map((post) => {
            return (
              <Col md={6} key={post._id}>
                <Card className="mb-2">
                  <Card.Img variant="top" src="https://picsum.photos/536/354" />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Container className="d-flex justify-content-evenly">
                      {" "}
                      <Button
                        variant="dark"
                        className="d-flex align-items-center justify-content-around w-25 no-border"
                        onClick={(e) => {
                          navigate(`/posts/${post._id}/update`,{
                            state:{
                              post:post
                            }
                          })
                        }}
                      >
                        <FaSync />
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        className="d-flex align-items-center justify-content-around w-25"
                        onClick={(e) => {
                         
                        }}
                      >
                        <FaTrash />
                        Delete{" "}
                      </Button>
                    </Container>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
}
