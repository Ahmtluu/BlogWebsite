import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserLogin } from "../services/UserService";
import { cookies } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/loginBackground.svg";
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
    <Col
      style={{
        height: "100vh",
        widht: "100vh",
        backgroundImage: `url(${backgroundImage})`,
      }}
      className=" d-flex flex-column justify-content-center align-items-center "
    >
      <Row className="">
        <Container
          style={{
            border: "solid",
            borderWidth: "5px",
            borderRadius: "15px",
            borderColor: `rgba(73, 85, 121, 0.2)`,
            width: "300px",
          }}
        >
          <Container className="pt-4">
            <h2 className="text-center pb-4">Hoşgeldin!</h2>
          </Container>
          <Form onSubmit={handleSubmit(OnSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Adresi</Form.Label>
              <input
                type="text"
                className="form-control"
                {...register("email")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <input
                type="password"
                className="form-control"
                {...register("password")}
              />
            </Form.Group>

            <Container className="d-flex justify-content-end p-0 mb-2">
              <Button variant="dark" type="submit" className="w-50">
                Login
              </Button>
            </Container>
          </Form>
        </Container>
      </Row>
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
  );
}
export default Login;
