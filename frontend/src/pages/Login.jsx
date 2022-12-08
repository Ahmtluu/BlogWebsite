import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import loginImage from "../assets/images/loginImage.jpg";

export default function Login() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  };
  return (
    <Container>
      <Row>
        <Col md={6}>
          <img src={loginImage} alt="Image" class="img-fluid" />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <Container
            fluid={true}
            style={{
              paddingTop: "32px",
              width: "500px",
              height: "360px",
              margin: "0px",
            }}
          >
            <div class="mb-2">
              <h3>Welcome</h3>
            </div>
            <form action="/login" method="post">
              <div class="form-group first mb-4">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  style={{
                    width: "50%",
                  }}
                />
              </div>
              <div class="form-group last mb-4">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  style={{
                    width: "50%",
                  }}
                />
              </div>

              <input
                type="submit"
                value="Log In"
                class="btn text-white btn-block btn-primary"
                style={{
                  width: "40%",
                }}
              />
            </form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
