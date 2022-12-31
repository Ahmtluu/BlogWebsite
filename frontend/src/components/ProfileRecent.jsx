import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";

import { PostCreate } from "../services/PostService";

import { GetAllPosts, PostDelete,PostUpdate } from "../services/PostService";
import { FaSync } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import CustomModal from "./CustomModal";

export default function ProfileRecent({ currentUser, getProfileData }) {
  const [addNewShow, setAddNewShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [userPosts, setUserPosts] = useState();
  const [selectedPost, setPost]=useState({})

  useEffect(() => {
    getReleativePost();
  }, []);

  const onAddPostHandle = () => {
    setAddNewShow(!addNewShow);
  };
  const onUpdatePostHandle = () => {
    
    setUpdateShow(!updateShow);

  };

  const getReleativePost = async () => {
    await GetAllPosts().then((response) => {
      setUserPosts(response);
    });
  };

  const onPostDelete = async (id) => {
    await PostDelete(id).then(() => {
      getReleativePost();
    });
  };

  const onPostUpdateSubmit= async (formData, postId) => {
    PostUpdate(formData, currentUser, postId);
    getReleativePost();
   
  };

  const onPostSubmit= async (formData) => {
    PostCreate(formData, currentUser);
    getReleativePost();
    setAddNewShow(!addNewShow);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="lead fw-normal mb-0">Recent Posts</p>
        <div className="d-flex">
          {" "}
          <button
            type="button"
            className="btn btn-outline-dark"
            data-mdb-ripple-color="dark"
            onClick={onAddPostHandle}
          >
            Add new
          </button>
          <CustomModal
            item=""
            mShow={addNewShow}
            hide={onAddPostHandle}
            name="Add New"
            onSubmitHandle={onPostSubmit}
          />
        </div>
      </div>
      <Row>
        {userPosts &&
          userPosts.map((post) => {
            return (
              <Col md={6} key={post._id}>
                <Card className="mb-2">
                  <Card.Img variant="top" src="https://picsum.photos/536/354" />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Container className="d-flex justify-content-evenly">
                      {" "}
                      <Button
                        variant="dark"
                        className="d-flex align-items-center justify-content-around w-25 no-border"
                        onClick={(e) => {
                          setPost(post)
                          onUpdatePostHandle()
                        }}
                      >
                        <FaSync />
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        className="d-flex align-items-center justify-content-around w-25"
                        onClick={(e) => {
                          onPostDelete(post._id);
                        }}
                      >
                        <FaTrash />
                        Delete{" "}
                      </Button>
                    </Container>
                  </Card.Body>
                </Card>
                <CustomModal
            item={selectedPost}
            mShow={updateShow}
            hide={onUpdatePostHandle}
            name={selectedPost.title}
            onSubmitHandle={onPostUpdateSubmit}
          />
              </Col>
            );
          })}
      </Row>
    </>
  );
}
