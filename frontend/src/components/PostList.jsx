import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import CustomSinglePost from "./CustomSinglePost";
import { CircularProgress } from "react-loading-indicators";
import { useFetchAllPostsQuery } from "../features/posts/postApiSlice";


function PostList() {

  const {data=[], isFetching} = useFetchAllPostsQuery()



  return (
    <>
      {isFetching ? (
       <Container className="d-flex justify-content-center">
         <CircularProgress size="small" variant="dotted" color="#495579" />
       </Container>
      ) : (
        <Container>

        <Row>
          {data.map((post) => {
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
                
        </Container>
      )}
    </>
  );
}

export default PostList;
