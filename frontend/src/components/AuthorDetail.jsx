import React from "react";
import { Col, Row, Image, Container } from "react-bootstrap";
import { CircularProgress } from "react-loading-indicators";

export default function AuthorDetail({ currentAuthor }) {
  return currentAuthor ? (
    <>
      <Col>
        <Row>
          <Col md={4} lg={3} className="d-flex justify-content-center align-items-center">
            <Image
              src={`http://localhost:3001/imagesProfile/${currentAuthor.profileImg}`}
              alt="Profile"
              height={300} width={250}
              className=" m-1 rounded"
            />
          </Col>
          <Col md={8} lg={9} className="d-flex flex-column justify-content-center">
            <h2 className="m-0 text-center text-lg-start">{currentAuthor.username}</h2>
            <h5 className="mb-4 text-center text-lg-start text-muted">{currentAuthor.description}</h5>
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
