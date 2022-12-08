import React, { Component } from "react";
import { Col, Image, Container, Row } from "react-bootstrap";
import profileImage from "../assets/images/profileImage.png";
import { Link } from "react-router-dom";

export default function CustomSinglePost({ title, content }) {
  const styles = {
    imageContainer: {
      width: "100%",
      height: "260px",
      overflow: "hidden",
      backgroundColor: "teal",
      padding: "0px",
      margin: "0px",
      borderRadius: "10px",
    },
    cardImage: {
      width: "100%",
      height: "100%",
      boxFit: "contain",
    },

    avatarImageColumn: {
      width: "48px",
      height: "48px",
      overflow: "hidden",
      borderRadius: "50px",
      padding: "0px",
      margin: "0px",
    },
    avatarImage: {
      width: "100%",
      height: "100%",
      boxFit: "contain",
    },
  };

  return (
    <>
      <Col md={6} lg={4} className="mb-4">
        <Container style={styles.imageContainer}>
          <Image
            style={styles.cardImage}
            className="img-fluid"
            src={"https://picsum.photos/536/354"}
          />
        </Container>
        <Link
          to={`categories/travel`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <h6 className="mt-2">
            Travel
            <span className="text-muted"> - July 2, 2022</span>
          </h6>
        </Link>
        <Link to={`blog/1`} style={{ textDecoration: "none", color: "black" }}>
          <h2>{title}</h2>
          <p>{content}</p>
        </Link>
        <Link
          to={`/profile`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Row className="d-flex px-3">
            <Container style={styles.avatarImageColumn}>
              <Image style={styles.avatarImage} src={profileImage}></Image>
            </Container>
            <Col className="flex-column justify-content-center align-items-center mt-1">
              <h6 className="m-0">Ahmet MUTLU</h6>
              <h6 className="text-muted">CEO and founder</h6>
            </Col>
          </Row>
        </Link>
      </Col>
    </>
  );
}
