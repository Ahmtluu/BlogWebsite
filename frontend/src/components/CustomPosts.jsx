import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import CustomSinglePost from "./CustomSinglePost";
import { GetAllPosts } from "../services/PostService";

function CustomPosts() {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const response = await GetAllPosts();
    setPosts(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container>
        {" "}
        <h2 className="pb-2 mt-4 border-bottom">Features with title</h2>
      </Container>
      {posts ? (
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

{
  /*

<Container
            style={{
              width: "35%",
            }}
            className="mb-2"
          >
            <Link
              to={`blog/1`}
              style={{ textDecoration: "none", color: "black" }}
              className="bg-dark"
            >
              {" "}
              <CustomSinglePost
                title="Heading"
                content="Some representative placeholder content for the three columns of text below the carousel. This is the first column."
                buttonText="View details &raquo"
              />
            </Link>
          </Container>




*/
}
