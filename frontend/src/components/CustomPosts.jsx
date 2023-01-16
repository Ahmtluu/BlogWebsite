import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import CustomSinglePost from "./CustomSinglePost";
import { GetAllPosts } from "../services/PostService";
import { CircularProgress } from "react-loading-indicators";

function CustomPosts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetAllPosts();
      setPosts(response);
    };

    fetchData();
  }, []);

  return (
    <>
      {posts ? (
        <Row className="mx-2">
          {posts.map((post) => {
            return (
              <CustomSinglePost
                key={post._id}
                postId={post._id}
                title={post.title}
                content={post.content}
                category={post.category}
                authorName={post.author.username}
                authorProfileImage={post.author.profileImg}
                cover={post.cover}
                updatedAt={post.updatedAt}
              />
            );
          })}
        </Row>
      ) : (
        <Container className="d-flex justify-content-center">
          <CircularProgress size="small" variant="dotted" color="#495579" />
        </Container>
      )}
    </>
  );
}

export default CustomPosts;
