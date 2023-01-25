import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import jumbotronImage from "../assets/images/jumbotronImage.png";

export default function CustomCarrousel() {
  const styles = {
    imageContainer: {
      overflow: "hidden",
      borderRadius: "10px",
      height: "90vh",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  };

  return (
    <Row className="mx-4">
      <Col md={7} className="d-flex flex-column align-items-center  justify-content-center ">
        <h1 className="display-3 fst-italic bold  ">
          Cours Après Tes Rêves...
        </h1>
      </Col>
      <Col md={5}>
        <Container fluid style={styles.imageContainer}>
          <Image style={styles.image} src={jumbotronImage} />
        </Container>
      </Col>
    </Row>
  );
}
