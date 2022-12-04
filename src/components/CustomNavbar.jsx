import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import React, { Component } from "react";

export default class CustomNavbar extends Component {
  constructor() {
    super();
    this.state = { opacity: 0, currentScrollHeight: 0 };
  }

  componentDidMount() {
    window.onscroll = () => {
      const newScrollHeight = Math.ceil(window.scrollY);
      this.setState({ currentScrollHeight: newScrollHeight });
    };
  }

  render() {
    const opacity = Math.min(this.state.currentScrollHeight / 100, 1);
    const duration = 300;
    const navbar = {
      backgroundColor: `rgba(43,58,85, ${opacity})`,
      transition: `${duration}ms ease-in-out`,
    };

    return (
      <Navbar
        style={navbar}
        expand="lg"
        sticky="top"
        variant={this.state.currentScrollHeight < 20 ? "light" : "dark"}
      >
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    );
  }
}
