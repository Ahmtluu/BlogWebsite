import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { GetPost } from "../services/PostService";
import { Image } from "react-bootstrap";
import { CircularProgress } from "react-loading-indicators";
import { useFetchSinglePostQuery } from "../features/posts/postApiSlice";

function PostDetail() {
  const {_id} = useParams();
    const {data=[], isFetching} =useFetchSinglePostQuery(_id)
  return (
    isFetching ? <Container className="d-flex justify-content-center mt-2">
    <CircularProgress size="small" variant="dotted" color="#495579" />
  </Container>:
    <Container>
      <h5>{data.title}</h5>
      {}
      <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
    </Container>
  );
}
export default PostDetail;
