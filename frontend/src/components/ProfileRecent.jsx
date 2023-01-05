import React, { useState, useEffect,lazy } from "react";
import { Button, Row, Col, Card, Container } from "react-bootstrap";
import { GetAllPosts, PostDelete } from "../services/PostService";
import { FaSync } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export default function ProfileRecent({ currentUser, getProfileData }) {

  const [userPosts, setUserPosts] = useState();
  const [selectedPost, setPost] = useState({});

  let navigate= useNavigate()
  const getReleativePost = async () => {
    const response = await GetAllPosts();
    setUserPosts(response);
  };

  const deleteSelectedPost=async (id)=>{
    await PostDelete(id).then(()=>{
      getReleativePost();
    })
   
  }

  useEffect(() => {
    getReleativePost();
    if(userPosts) console.log(`http://localhost:3001/postImages/${userPosts[0].cover}`) 

  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="lead fw-normal mb-0">Recent Posts</p>
        <div className="d-flex">
          {" "}
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={(e)=>{
             navigate("/posts/add_new")
            }}
          >
            Add new
          </button>
        </div>
      </div>
      <Row>
        {userPosts && userPosts.length>0 ?
          userPosts.map((post) => {
            return (
              <Col md={4} key={post._id}>
                <Card className="mb-2" style={{
                  width:"100%"
                }}>
                <Link to={`/posts/${post._id}`} className="link" relative="path">
                  <Card.Img style={{
                    width:"100%",
                    height:"225px",
                    overflow:"hidden"
                  }} variant="top" src={`http://localhost:3001/postImages/${post.cover}`}/>

                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    
                  </Card.Body>
                  </Link>
                  <Card.Footer>
                  <Container className="d-flex justify-content-evenly">
                      {" "}
                      <Button
                        variant="dark"
                        className="d-flex align-items-center justify-content-around w-25 no-border"
                        onClick={(e) => {
                          navigate(`/posts/${post._id}/update`,{
                            state:{
                              post:post
                            }
                          })
                        }}
                      >
                        <FaSync />
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        className="d-flex align-items-center justify-content-around w-25"
                        onClick={(e) => {
                         deleteSelectedPost(post._id)
                        }}
                      >
                        <FaTrash />
                        Delete{" "}
                      </Button>
                    </Container>
                  </Card.Footer>
      
                </Card>
  
              </Col>
            );
          }):<Container>Henüz bir paylaşım yapmadın!</Container>}
      </Row>
    </>
  );
}
