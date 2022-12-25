import Container from "react-bootstrap/Container";
import { Navbar, Dropdown, Nav, NavDropdown } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { UserLogout } from "../services/UserService";
import { useNavigate } from "react-router-dom";
import { cookies } from "../services/UserService";

function CustomNavbar() {
  const pathname = window.location.pathname;
  const [currentScrollHeight, setCurrentScrollHeight] = useState(0);
  const navigate = useNavigate();
  let isLoggedIn = cookies.get("isAuth");

  useEffect(() => {
    window.onscroll = () => {
      const newScrollHeight = Math.ceil(window.scrollY);
      setCurrentScrollHeight(newScrollHeight);
    };
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
      expand="lg"
      sticky="top"
      variant={currentScrollHeight < 20 ? "light" : "dark"}
    >
      <Container>
        <Navbar.Brand href="/">AhmtMtlu</Navbar.Brand>

        {isLoggedIn ? (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <NavDropdown title="Actions" active={true}>
                  {pathname.includes("/profile/") ? (
                    <div></div>
                  ) : (
                    <>
                      <Dropdown.Item href="/profile/AhmtMtlu">
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Divider />
                    </>
                  )}

                  <Dropdown.Item
                    onClick={() => {
                      cookies.remove("jwt_authorization", { path: "/" });
                      cookies.remove("isAuth", { path: "/" });
                      navigate("/");
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  );
}
export default CustomNavbar;
