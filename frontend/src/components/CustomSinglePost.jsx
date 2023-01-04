import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CustomSinglePost.css";
export default function CustomSinglePost({
  title,
  cover,
  postId,
  content,
  category,
  createdBy,
  createdAt
}) {

  createdAt = createdAt.substring(0, 10);

  return (
    <>
      <Col md={6} className="mb-4">
        <Link to={`/posts/${postId}`} className="link" relative="path">
          <div className="imageContainer">
            <Image className="cardImage img-fluid" alt="cover" src={cover} />
          </div>
        </Link>
        <Link to={`categories/${category}`} className="link" relative="path">
          <h6 className="mt-2">
            {category}
            <span className="text-muted"> - {createdAt}</span>
          </h6>
        </Link>
        <Link to={`/posts/${postId}`} className="link" relative="path">
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
          <p className="text" dangerouslySetInnerHTML={{ __html: content }}></p>
        </Link>
        <Link
          to={`/author/${createdBy.username}`}
          className="link"
          relative="path"
        >
          <Row className="mb-2">
            <Col md="auto">
              {" "}
              {createdBy.profileImg ? (
                <div className="avatarImageColumn">
                  <img
                    className="avatarImage"
                    alt="cover"
                    src={`http://localhost:3001/images/${createdBy.profileImg}`}
                  ></img>
                </div>
              ) : (
                <div></div>
              )}
            </Col>
            <Col md="auto" className="">
              <h6 className="m-0">{createdBy.username}</h6>
              <h6 className="text-muted">CEO and FOUNDER</h6>
            </Col>
          </Row>
        </Link>
                

      </Col>
    </>
  );
}
