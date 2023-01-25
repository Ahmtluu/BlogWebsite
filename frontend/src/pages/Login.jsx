import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserLogin } from "../services/UserService";
import { cookies } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/Login.gif";
function Login() {
  const { register, handleSubmit } = useForm();
  const [isDone, setStatus] = useState(true);
  let navigate = useNavigate();
  
  const OnSubmit = async (data) => {
    try {
      await UserLogin(data).then((response) => {
        const jwt_token = response.data["access_token"];
        cookies.set("jwt_authorization", jwt_token);
        cookies.set("isAuth", true);
        navigate(`/`);
      });
    } catch (error) {
      setStatus(false);
    }
  };

  return (

    <Container
      style={{
       
        weight: "100vw",
      }}
      className="d-flex align-items-center justify-content-center "
    >
      <Row className="align-items-center w-100 h-100 ">
        <Col
          md={6}
          className=" d-flex flex-column align-items-center justify-content-center"
        >
          <h3 className="text-start fw-bold mb-4">Welcome</h3>
          <Form
            onSubmit={handleSubmit(OnSubmit)}
            className="w-75 align-items-center "
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <input
                type="text"
                className="form-control"
                {...register("email")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <input
                type="password"
                className="form-control"
                {...register("password")}
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Login
            </Button>
          </Form>

          {isDone === false ? (
            <Row className="m-1 pt-2">
              <div className="alert alert-danger" role="alert">
                Girmiş olduğun email veya parola hatalı. Lütfen kontrol et.
              </div>
            </Row>
          ) : (
            <></>
          )}
        </Col>
        <Col md={6} className="h-100 d-flex flex-column align-items-center justify-content-center" style={{}}>
        <img src={backgroundImage} alt="loading..." />
</Col>
      </Row>
    </Container>
  );
}
export default Login;

/*          
          
          
          
          */
