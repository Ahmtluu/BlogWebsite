import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import CustomSinglePost from "./CustomSinglePost";
import { GetAllPosts } from "../services/PostService";
import { CircularProgress } from "react-loading-indicators";

function CustomPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetAllPosts();
      setPosts(response);
    };
    fetchData();
  }, []);


  return (
    <>
      {posts && posts.length > 0 ? (
        <Container>
          <Row className="d-flex justify-content-between align-items-md-stretch py-2">
            {posts.map((post) => {
                return (
                  <CustomSinglePost
                    key={post._id}
                    postId={post._id}
                    title={post.title}
                    content={post.content}
                    category={post.category}
                    createdBy={post.createdBy}
                    cover={post.cover}
                    createdAt={post.createdDate}
                  />
                );

            })}
          </Row>
        </Container>
      ) : (
         <Container className="d-flex justify-content-center">
          <CircularProgress size="small" variant="dotted" color="#495579"/>
          </Container>
      )}
    </>
  );
}

export default CustomPosts;

