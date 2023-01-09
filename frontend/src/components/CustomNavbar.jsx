import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { Navbar, Dropdown, Nav, NavDropdown } from "react-bootstrap";
import { cookies } from "../services/UserService";
import jwt_decode from "jwt-decode";
import { GetCurrentUser } from "../services/UserService";

function CustomNavbar() {
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  let isLoggedIn = cookies.get("isAuth");

  const [currentScrollHeight, setCurrentScrollHeight] = useState(0);
  const [currentUser, setUser] = useState();

  const getCurrentId = async () => {
    if (isLoggedIn) {
      const token = cookies.get("jwt_authorization");
      const decoded = jwt_decode(token);
      await GetCurrentUser(decoded.sub).then((response) => {
        setUser(response);
      });
    }
  };

  useEffect(() => {
    window.onscroll = () => {
      const newScrollHeight = Math.ceil(window.scrollY);
      setCurrentScrollHeight(newScrollHeight);
    };
    getCurrentId();
  }, []);

  const opacity = Math.min(currentScrollHeight / 50, 1);
  const duration = 300;
  const navbar = {
    backgroundColor: `rgba(73, 85, 121, ${opacity})`,
    transition: `${duration}ms ease-in-out`,
  };
  return (
    <Navbar
      style={navbar}
      expand="md"
      sticky="top"
      variant={currentScrollHeight < 20 ? "light" : "dark"}
    >
      <Container>
        <Navbar.Brand href="/">Met'utia</Navbar.Brand>


            <Navbar.Toggle aria-controls="basic-navbar-nav " />
            <Navbar.Collapse className="justify-content-end">
              <Nav className="m-0">
              {currentUser ?
                <NavDropdown title={currentUser.username}>
                  {pathname.includes("/profile") ? (
                    <div></div>
                  ) : (
                    <>
                      <Dropdown.Item href={`/profile/${currentUser.userId}`}>
                        Profil
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </>
                  )}

                  <Dropdown.Item
                    onClick={() => {
                      cookies.remove("jwt_authorization", { path: "/" });
                      cookies.remove("isAuth", { path: "/" });
                      setUser();
                      navigate("/");
                    }}
                  >
                    Çıkış
                  </Dropdown.Item>
                </NavDropdown>
                 : <Navbar.Text>
                  <Link to="/login" className="text-decoration-none">Login</Link>
                
               </Navbar.Text>
        }
              </Nav>
            </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default CustomNavbar;
