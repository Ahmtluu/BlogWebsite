import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { GetPost } from "../services/PostService";

function PostDetail() {
  const [currentPost, setCurrentPost] = useState();
  let { postId } = useParams();

  const fetchPost = async () => {
    const response = await GetPost(postId);
    setCurrentPost(response);
  };
  useEffect(() => {
    fetchPost();
  }, []);

  {
    return currentPost != null ? (
      <Container>
        <h5>{currentPost.title}</h5>
        <p>{currentPost.content}</p>
      </Container>
    ) : (
      <div>Loading</div>
    );
  }
}
export default PostDetail;
