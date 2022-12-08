import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomSinglePost from "./CustomSinglePost";

export default function CustomPosts() {
  return (
    <>
      <Container>
        {" "}
        <h2 class="pb-2 mt-4 border-bottom">Features with title</h2>
      </Container>
      <Container>
        <Row className="d-flex justify-content-between align-items-md-stretch py-2">
          <CustomSinglePost
            title="Heading"
            content="Some representative placeholder content for the three columns of text below the carousel. This is the first column."
          />
          <CustomSinglePost
            title="Heading"
            content="Some representative placeholder content for the three columns of text below the carousel. This is the first column."
          />
          <CustomSinglePost
            title="Heading"
            content="Some representative placeholder content for the three columns of text below the carousel. This is the first column."
          />
          <CustomSinglePost
            title="Heading"
            content="Some representative placeholder content for the three columns of text below the carousel. This is the first column."
          />
          <CustomSinglePost
            title="Heading"
            content="And lastly this, the third column of representative placeholder content."
          />
          <CustomSinglePost
            title="Heading"
            content="And lastly this, the third column of representative placeholder content."
            buttonText="View details &raquo"
          />
        </Row>
      </Container>
    </>
  );
}

{
  /*

<Container
            style={{
              width: "35%",
            }}
            className="mb-2"
          >
            <Link
              to={`blog/1`}
              style={{ textDecoration: "none", color: "black" }}
              className="bg-dark"
            >
              {" "}
              <CustomSinglePost
                title="Heading"
                content="Some representative placeholder content for the three columns of text below the carousel. This is the first column."
                buttonText="View details &raquo"
              />
            </Link>
          </Container>




*/
}
