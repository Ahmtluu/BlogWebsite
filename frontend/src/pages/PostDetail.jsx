import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { GetPost } from "../services/PostService";
import { Image } from "react-bootstrap";
import { CircularProgress } from "react-loading-indicators";

function PostDetail() {
  const [currentPost, setCurrentPost] = useState();
  let params = useParams();
  let id = params._id;

  useEffect(() => {
    const getSelectedPost = async () => {
      const response = await GetPost(id);
      setCurrentPost(response);
    };
    getSelectedPost();
  });

  if (!currentPost) {
    return (
      <Container className="d-flex justify-content-center mt-2">
        <CircularProgress size="small" variant="dotted" color="#495579" />
      </Container>
    );
  }
  return (
    <Container>
      <h5>{currentPost.title}</h5>
      {}
      <div dangerouslySetInnerHTML={{ __html: currentPost.content }}></div>
    </Container>
  );
}
export default PostDetail;
