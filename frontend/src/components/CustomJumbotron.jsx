import React, { Component } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import Figure from "react-bootstrap/Figure";

export default function CustomCarrousel() {
  const styles = {
    container: {
      width: "560px",
      height: "360px",
      overflow: "hidden",
      padding: "0px",
      borderRadius: "10px",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "fill",
    },
  };

  return (
    <Container>
      <Row>
        <Col lg={6} className="mt-4">
          <h1 className="display-4 fst-italic mt-4">
            Title of a longer featured blog post
          </h1>
          <p className="lead my-3">
            Multiple lines of text that form the lede, informing new readers
            quickly and efficiently about what’s most interesting in this post’s
            contents.
          </p>
          <p className="lead mb-0">
            <a href="#" class="text-white fw-bold">
              Continue reading...
            </a>
          </p>
        </Col>
        <Col lg={6}>
          <Container fluid style={styles.container}>
            <Image style={styles.image} src="https://picsum.photos/536/354" />
          </Container>
        </Col>
      </Row>

      <Row className="align-items-md-stretch mt-2">
        <Col md={6} className="mt-2">
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h2>Change the background</h2>
            <p>
              Swap the background-color utility and add a `.text-*` color
              utility to mix up the jumbotron look. Then, mix and match with
              additional component themes and more.
            </p>
          </div>
        </Col>
        <Col md={6} className="mt-2">
          <div className="h-100 p-5 bg-light border rounded-3">
            <h2>Add borders</h2>
            <p>
              Or, keep it light and add a border for some added definition to
              the boundaries of your content. Be sure to look under the hood at
              the source HTML here as we've adjusted the alignment and sizing of
              both column's content for equal-height.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
