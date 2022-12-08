import React, { Component } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { MDBInput, MDBCol, MDBRow, MDBFile } from "mdb-react-ui-kit";
import profileImage from "../assets/images/profileImage.png";

export default function CustomProfileForm() {
  return (
    <Row>
      <Col md={6}>
        <Container
          className="my-3 d-flex justify-content-center"
          style={{
            width: "300px",
            height: "300px",
            overflow: "hidden",
          }}
        >
          <img
            src={profileImage}
            className="rounded-circle "
            style={{
              width: "100%",
              height: "100%",
              boxFit: "contain",
            }}
            alt="Avatar"
          />
        </Container>
      </Col>
      <Col md={4}>
        <form>
          <MDBFile label="Profile Image" id="customFile" />
          <MDBRow className="mb-1 mt-4">
            <MDBCol>
              <MDBInput name="firstName" label="First name" />
            </MDBCol>
            <MDBCol>
              <MDBInput name="lastName" label="Last name" />
            </MDBCol>
          </MDBRow>
          <MDBInput
            className=""
            type="email"
            name="userEmail"
            label="Email address"
          />
          <MDBInput
            className="mt-1"
            type="password"
            name="userPassword"
            label="Password"
          />
          <MDBRow>
            <button class="btn btn-success  mx-2" type="submit">
              Update
            </button>
          </MDBRow>
        </form>
      </Col>
    </Row>
  );
}
