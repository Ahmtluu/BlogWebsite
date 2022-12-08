import React, { Component } from "react";
import { Table, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CustomPostTable() {
  const navigate = useNavigate();
  return (
    <>
      <Container className="mb-2">
        <Row>
          <Col md={7}>
            {" "}
            <h2 class="m-0"></h2>
          </Col>
          <Col md={5} className="d-flex">
            <form class="d-flex" role="search" style={{ width: "70%" }}>
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <button
              class="btn btn-primary mx-2"
              style={{ width: "35%" }}
              type="submit"
            >
              Add
            </button>
          </Col>
        </Row>
      </Container>

      <Container className="">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "5%" }}>Date</th>
              <th style={{ width: "5%" }}>Category</th>
              <th style={{ width: "20%" }}>Title</th>
              <th style={{ width: "50%" }}>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>06.12.2022</td>
              <td>JavaScript</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td className="m-0 p-0">
                <button
                  onClick={() => {
                    navigate("/post/edit/1");
                  }}
                  class="btn btn-warning"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  type="submit"
                >
                  <i class="fa fa-edit"></i>
                </button>
              </td>

              <td className="m-0 p-0">
                <button
                  class="btn btn-danger"
                  onClick={() => {
                    /// findOne and delete
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  type="submit"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </>
  );
}
