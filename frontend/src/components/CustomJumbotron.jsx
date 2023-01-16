import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import jumbotronImage from "../assets/images/jumbotronImage.png";

export default function CustomCarrousel() {
  const styles = {
    imageContainer: {
      overflow: "hidden",
      borderRadius: "10px",
      height: "100vh",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  };

  return (
    <Row className="mx-2">
      <Col md={6} className="align-self-center">
        <h1 className="display-3 fst-italic bold  ">
          Cours Après Tes Rêves...
        </h1>
        <p className="lead my-3">
          Multiple lines of text that form the lede, informing new readers
          quickly and efficiently about what’s most interesting in this post’s
          contents.
        </p>
      </Col>
      <Col md={6}>
        <Container fluid style={styles.imageContainer}>
          <Image style={styles.image} src={jumbotronImage} />
        </Container>
      </Col>
    </Row>
  );
}
