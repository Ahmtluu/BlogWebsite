import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { cookies } from "../services/UserService";

export default function ProfileRecent() {
  const [show, setShow] = useState(false);
  let isLoggedIn = cookies.get("isAuth");
  const onHandleChange = () => {
    setShow(!show);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <p className="lead fw-normal mb-0">Recent Posts</p>
      {isLoggedIn ? (
        <div className="d-flex">
          {" "}
          <button
            type="button"
            className="btn btn-outline-dark"
            data-mdb-ripple-color="dark"
            onClick={onHandleChange}
          >
            Add new
          </button>
        </div>
      ) : (
        <></>
      )}

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleChange}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
