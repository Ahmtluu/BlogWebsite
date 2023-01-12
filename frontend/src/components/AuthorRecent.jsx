import React, { useState, useEffect } from "react";
import { Row, Container, Col, Button, Image } from "react-bootstrap";
import { GetAllPosts } from "../services/PostService";
import { Link } from "react-router-dom";
import { CircularProgress } from "react-loading-indicators";

export default function AuthorRecent({ currentAuthor }) {
  const [authorPosts, setAuthorPost] = useState();

  async function getAuthorPost() {
    //TODO Filter author posts
    const response = await GetAllPosts();
    console.log(response);
    setAuthorPost(response);
  }

  useEffect(() => {
    getAuthorPost();
  }, []);

  return (
    currentAuthor && (
      <>
        <div className="d-flex justify-content-between align-items-center mb-2 mt-4">
          <p
            className="lead fw-normal mb-0"
            style={{
              color: "#495579",
            }}
          >
            {currentAuthor.username}'s Posts
          </p>
        </div>
        <Row>
          {authorPosts ? (
            authorPosts.length > 0 ? (
              authorPosts.map((post) => {
                return (
                  <Col md={4} className="mb-4">
                    <Link
                      to={`/posts/${post._id}`}
                      className="link"
                      relative="path"
                    >
                      <div className="imageContainer">
                        <Image
                          className="cardImage img-fluid"
                          alt="cover"
                          src={`http://localhost:3001/imagesPost/${post.cover}`}
                        />
                      </div>
                    </Link>
                    <Button
                      className="mt-2 mb-2"
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
                      <h2 dangerouslySetInnerHTML={{ __html: post.title }}></h2>
                      <p
                        className="text"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      ></p>
                    </Link>
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
      </>
    )
  );
}
