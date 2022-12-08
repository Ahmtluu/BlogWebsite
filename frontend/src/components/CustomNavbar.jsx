import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import React, { Component, useState, useEffect } from "react";

export default function CustomNavbar() {
  const [currentScrollHeight, setCurrentScrollHeight] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      const newScrollHeight = Math.ceil(window.scrollY);
      setCurrentScrollHeight(newScrollHeight);
    };
  }, []);

  const opacity = Math.min(currentScrollHeight / 100, 1);
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
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
}
