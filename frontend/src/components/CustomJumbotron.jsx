import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import jumbotronImage from "../assets/images/jumbotronImage.png";

export default function CustomCarrousel() {
  const styles = {
    imageContainer: {
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
        <Col md={7} className="align-self-center m-0 p-1">
          <h1 className="display-3 fst-italic mt-4 bold ">
            Cours Après Tes Rêves...
          </h1>
          <p className="lead my-3">
            Multiple lines of text that form the lede, informing new readers
            quickly and efficiently about what’s most interesting in this post’s
            contents.
          </p>
        </Col>
        <Col md={5}>
          <Container fluid style={styles.imageContainer}>
            <Image style={styles.image} src={jumbotronImage} />
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
