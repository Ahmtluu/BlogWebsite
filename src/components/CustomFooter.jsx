import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class CustomFooter extends Component {
  render() {
    return (
      <Container>
        <div className="container">
          <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p className="col-md-4 mb-0 text-muted">Company, Inc</p>
            <a
              href="/"
              className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
            >
              <svg className="bi me-2" width="40" height="32">
                <use href="#bootstrap" />
              </svg>
            </a>

            <ul className="nav col-md-4 justify-content-end">
              <li className="nav-item">
                <h6 className="text-muted">
                  Created by AhmtMtlu with 💙 in 2022
                </h6>
              </li>
            </ul>
          </footer>
        </div>
      </Container>
    );
  }
}
