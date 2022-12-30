import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Col, Form, Row, Button } from "react-bootstrap";
import Select from "react-select";
import Categories from "./Categories";

export default function CustomModal({
  item,
  mShow,
  hide,
  name,
  onSubmitHandle,
}) {
  const { setValue, handleSubmit } = useForm();

  return (
    <Modal show={mShow} size={"xl"} onHide={hide}>
      <Modal.Header>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="w-100">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Cover</Form.Label>
                <input
                  type="file"
                  id="formCover"
                  className="form-control"
                  onChange={(e) => {
                    setValue("cover", e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <input
                  type="title"
                  id="formTitle"
                  defaultValue={item.title}
                  className="form-control"
                  onLoad={(e) => {
                   console.log(e)
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Select
                  onChange={(e) => {
                    setValue("category", e.value);
                  }}
                  options={Categories}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <textarea
              className="form-control"
              defaultValue={item.content}
              onChange={(e) => {
                setValue("content", e.target.value);
              }}
              id="formAboutArea"
              rows="3"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hide}>
          Close
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit(onSubmitHandle)}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
