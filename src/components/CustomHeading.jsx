import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomSingleHead from "./CustomSingleHead";

export default class CustomHeading extends Component {
  render() {
    return (
      <>
        <Container>
          <h2 class="pb-2  mt-4 border-bottom">Features with title</h2>
          <Row className="d-flex justify-content-around m-4 py-2">
            <CustomSingleHead
              heading="Heading"
              content="Some representative placeholder content for the three columns of text below the carousel. This is the first column."
              buttonText="View details &raquo"
            />
            <CustomSingleHead
              heading="Heading"
              content="And lastly this, the third column of representative placeholder content."
              buttonText="View details &raquo"
            />
            <CustomSingleHead
              heading="Heading"
              content="And lastly this, the third column of representative placeholder content."
              buttonText="View details &raquo"
            />
          </Row>
        </Container>
      </>
    );
  }
}
