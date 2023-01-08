import React from "react";
import { Col, Image, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./CustomSinglePost.css";
export default function CustomSinglePost({
  title,
  cover,
  postId,
  content,
  category,
  creatorProfileImage,
  creatorName,
  createdAt,
}) {
  let navigator = useNavigate();
  createdAt = createdAt.substring(0, 10);
  return (
    <>
      <Col md={6} className="mb-4 animate__animated animate__fadeInUp">
        <Link to={`/posts/${postId}`} className="link" relative="path">
          <div className="imageContainer">
            <Image
              className="cardImage img-fluid"
              alt="cover"
              src={`http://localhost:3001/postImages/${cover}`}
            />
          </div>
        </Link>
        <Button
          className="mt-2 mb-2"
          variant="secondary"
          onClick={() => {
            navigator(`categories/${category}`);
          }}
        >
          {category}
        </Button>
        <Link to={`/posts/${postId}`} className="link" relative="path">
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
          <p className="text" dangerouslySetInnerHTML={{ __html: content }}></p>
        </Link>
        <Link to={`/author/${creatorName}`} className="link" relative="path">
          <Row className="mb-2">
            <Col md="auto">
              {" "}
              {creatorProfileImage ? (
                <div className="avatarImageColumn">
                  <img
                    className="avatarImage"
                    alt="cover"
                    src={`http://localhost:3001/profileImages/${creatorProfileImage}`}
                  ></img>
                </div>
              ) : (
                <div></div>
              )}
            </Col>
            <Col md="auto" className="">
              <h6 className="m-0">{creatorName}</h6>
              <span className="text-muted">{createdAt}</span>
            </Col>
          </Row>
        </Link>
      </Col>
    </>
  );
}
