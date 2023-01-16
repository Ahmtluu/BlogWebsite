import React from "react";
import { Col, Image, Row, Button, Card, Divider } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./CustomSinglePost.css";
export default function CustomSinglePost({
  title,
  cover,
  postId,
  content,
  category,
  authorProfileImage,
  authorName,
  updatedAt,
}) {
  let navigator = useNavigate();
  updatedAt = updatedAt.substring(0, 10);

  const style = {
    card: {
      maxWidth: 300,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
      },
    },
  };

  return (
    <>
      <Col md={6} lg={4} className="mb-4">
        <Card style={{ minHeight: "25rem" }}>
          <Link to={`/posts/${postId}`} className="link" relative="path">
            <Card.Img
              variant="top"
              src={`http://localhost:3001/imagesPost/${cover}`}
            />{" "}
          </Link>
          <Card.Body>
            <Button
              variant="secondary"
              onClick={() => {
                /*TODO:lowerCase category */
                navigator(`categories/${category}`);
              }}
            >
              {category}
            </Button>
            <Link to={`/posts/${postId}`} className="link" relative="path">
              <Card.Title dangerouslySetInnerHTML={{ __html: title }} />
            </Link>
            <Card.Text
              dangerouslySetInnerHTML={{ __html: content }}
              className="text "
              style={{}}
            />
          </Card.Body>
          <Card.Footer className="text-muted" style={{ minHeight: "3rem" }}>
            {" "}
            <Link to={`/author/${authorName}`} className="link" relative="path">
              <Row className="d-flex flex-row align-items-center justify-content-start">
                <Col xs={2} className="px-1">
                  {" "}
                  {authorProfileImage ? (
                    <div className="avatarImageColumn">
                      <img
                        className="avatarImage"
                        alt="cover"
                        src={`http://localhost:3001/imagesProfile/${authorProfileImage}`}
                      ></img>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </Col>

                <Col xs={10}>
                  <h6 className="m-0">{authorName}</h6>
                  <span className="text-muted">{updatedAt}</span>
                </Col>
              </Row>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
}
