import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams();
  return (
    <Container>
      <div>Post {id} </div>
    </Container>
  );
}
