import React, { Component } from "react";
import { Col } from "react-bootstrap";

export default class CustomSingleHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col lg={3} className="">
        <svg
          class="bd-placeholder-img rounded-circle"
          width="140"
          height="140"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 140x140"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
        >
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#777" />
          <text x="50%" y="50%" fill="#777" dy=".3em">
            140x140
          </text>
        </svg>

        <h2 className="mt-1">{this.props.heading}</h2>
        <p>{this.props.content}</p>
        <p>
          <a class="btn btn-secondary" href="#">
            {this.props.buttonText}
          </a>
        </p>
      </Col>
    );
  }
}
