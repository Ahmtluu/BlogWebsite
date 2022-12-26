import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import loginImage from "../assets/images/loginImage.jpg";
import { useForm } from "react-hook-form";
import { UserLogin } from "../services/UserService";
import { cookies } from "../services/UserService";
import { useNavigate } from "react-router-dom";
function Login() {
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();

  const OnSubmit = async (data) => {
    await UserLogin(data).then((response) => {
      if (response.status === 201) {
        const jwt_token = response.data["access_token"];
        cookies.set("jwt_authorization", jwt_token);
        cookies.set("isAuth", true);
        navigate(`/`);
      } else {
        cookies.set("isAuth", false);
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <img src={loginImage} alt="Image" className="img-fluid" />
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
            <div className="mb-2">
              <h3>Welcome</h3>
            </div>
            <form onSubmit={handleSubmit(OnSubmit)}>
              <div className="form-group first mb-4">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("email")}
                  style={{
                    width: "50%",
                  }}
                />
              </div>
              <div className="form-group last mb-4">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...register("password")}
                  style={{
                    width: "50%",
                  }}
                />
              </div>

              <input
                type="submit"
                value="Log In"
                className="btn text-white btn-block btn-primary"
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
export default Login;
