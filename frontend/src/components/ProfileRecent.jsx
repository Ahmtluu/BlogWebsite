import React, { useState, useEffect, lazy } from "react";
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import { GetAllPosts, DeletePost } from "../services/PostService";
import { FaSync } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { CircularProgress } from "react-loading-indicators";

export default function ProfileRecent({ user }) {
  const [userPosts, setUserPosts] = useState();

  let navigate = useNavigate();
  const getReleativePost = async () => {
    const response = await GetAllPosts();
    var filteredPosts = response.filter(function (post) {
      return post.author.username == user.username;
    });
    setUserPosts(filteredPosts);
  };

  const deleteSelectedPost = async (id) => {
    await DeletePost(id).then(() => {
      getReleativePost();
    });
  };

  useEffect(() => {
    getReleativePost();
  }, [user]);

  return (
    <>
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
          <p
            className="lead fw-normal mb-0"
            style={{
              color: "#495579",
            }}
          >
            Your All Posts
          </p>
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
                  <Col md={6} lg={4} key={post._id}>
                    <Card
                      style={{
                        minHeight: "24rem",
                        marginBottom: "8px",
                      }}
                    >
                      <Link
                        to={`/posts/${post._id}`}
                        className="link"
                        relative="path"
                      >
                        <Card.Img
                          variant="top"
                          src={`http://localhost:3001/imagesPost/${post.cover}`}
                        />{" "}
                      </Link>
                      <Card.Body>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            /*TODO:lowerCase category */
                            navigator(`categories/${post.category}`);
                          }}
                        >
                          {post.category}
                        </Button>
                        <Link
                          to={`/posts/${post._id}`}
                          className="link"
                          relative="path"
                        >
                          <Card.Title
                            className="mt-1"
                            dangerouslySetInnerHTML={{ __html: post.title }}
                          />
                        </Link>
                        <Card.Text
                          dangerouslySetInnerHTML={{ __html: post.content }}
                          className="text "
                          style={{}}
                        />
                      </Card.Body>
                      <Card.Footer className="text-muted bg-white">
                        <Container className="d-flex justify-content-evenly">
                          {" "}
                          <Button
                            variant="dark"
                            className="d-flex align-items-center"
                            onClick={(e) => {
                              navigate(`/posts/${post._id}/update`, {
                                state: {
                                  post: post,
                                  User: user,
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
            <Container className="d-flex justify-content-center">
              <CircularProgress size="small" variant="dotted" color="#495579" />
            </Container>
          )}
        </Row>
      </Container>
    </>
  );
}

/*



*/
