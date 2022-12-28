import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { GetPost } from "../services/PostService";

function PostDetail() {
  const [currentPost, setCurrentPost] = useState({});
  let params = useParams(); 
  let id = params._id;

  const getSelectedPost =  async () => {
     await GetPost(id).then((response)=>{
      setCurrentPost(response)
     });
    
  };

  useEffect(() => {
    getSelectedPost();
  },[]);

  {
    return Object.keys(currentPost).length > 0 ? (
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
