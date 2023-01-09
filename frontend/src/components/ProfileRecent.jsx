import React, { useState, useEffect, lazy } from "react";
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import { GetAllPosts, DeletePost } from "../services/PostService";
import { FaSync } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function ProfileRecent({user}) {
  const [userPosts, setUserPosts] = useState();

  let navigate = useNavigate();
  const getReleativePost = async () => {
    const response = await GetAllPosts();
    setUserPosts(response);
  };

  const deleteSelectedPost = async (id) => {
    await DeletePost(id).then(() => {
      getReleativePost();
    });
  };

  useEffect(() => {
    getReleativePost();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
        <p className="lead fw-normal mb-0">Your All Posts</p>
        <div className="d-flex">
          {" "}
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={(e) => {
              navigate("/posts/add_new");
            }}
          >
            Add new
          </button>
        </div>
      </div>
      <Row>
        {userPosts ? (
          userPosts.length > 0 ? (
            userPosts.map((post) => {
              return (
                <Col md={4} key={post._id}>
                  <Card
                    className="mb-4"
                    style={{
                      width: "100%",
                    }}
                  >
                    <Link
                      to={`/posts/${post._id}`}
                      className="link"
                      relative="path"
                    >
                      <Card.Img
                        style={{
                          width: "100%",
                          height: "225px",
                          overflow: "hidden",
                        }}
                        variant="top"
                        src={`http://localhost:3001/imagesPost/${post.cover}`}
                      />

                      <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                      </Card.Body>
                    </Link>
                    <Card.Footer>
                      <Container className="d-flex justify-content-evenly">
                        {" "}
                        <Button
                          variant="dark"
                          className="d-flex align-items-center"
                          onClick={(e) => {
                            navigate(`/posts/${post._id}/update`, {
                              state: {
                                post: post,
                                User:user
                              },
                            });
                          }}
                        >
                          <FaSync className="m-1" />
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          className="d-flex align-items-center"
                          onClick={(e) => {
                            deleteSelectedPost(post._id);
                          }}
                        >
                          <FaTrash className="m-1" />
                          Delete{" "}
                        </Button>
                      </Container>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Container>Henüz bir paylaşım yapmadın!</Container>
          )
        ) : (
          <Container>Loading</Container>
        )}
      </Row>
    </>
  );
}
