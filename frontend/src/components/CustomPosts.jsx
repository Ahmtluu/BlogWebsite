import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import CustomSinglePost from "./CustomSinglePost";
import { GetAllPosts } from "../services/PostService";

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
      <Container>
        {" "}
        <h2 className="pb-2 mt-4 border-bottom">Features with title</h2>
      </Container>
      {posts.length > 0 ? (
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
                  />
                );

            })}
          </Row>
        </Container>
      ) : (
        <Container>Loading...</Container>
      )}
    </>
  );
}

export default CustomPosts;

