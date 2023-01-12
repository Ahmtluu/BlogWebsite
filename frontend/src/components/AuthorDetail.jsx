import React from "react";
import { Col, Row, Image, Container } from "react-bootstrap";
import { CircularProgress } from "react-loading-indicators";

export default function AuthorDetail({ currentAuthor }) {
  return currentAuthor ? (
    <>
      <Col>
        <Row>
          <Col sm={2} xs={4}>
            <Image
              src={`http://localhost:3001/imagesProfile/${currentAuthor.profileImg}`}
              alt="Profile"
              fluid={true}
              className=" rounded"
            />
          </Col>
          <Col sm={10} xs={8}>
            <h2 className="m-0">{currentAuthor.username}</h2>
            <h5 className="mb-4">{currentAuthor.description}</h5>
            <h6 className="text-muted m-0">About</h6>
            <p
              className="font-italic mb-1"
              dangerouslySetInnerHTML={{ __html: currentAuthor.about }}
            />
          </Col>
        </Row>
      </Col>
    </>
  ) : (
    <Container className="d-flex justify-content-center">
      <CircularProgress size="small" variant="dotted" color="#495579" />
    </Container>
  );
}
