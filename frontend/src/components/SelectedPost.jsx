import React from 'react'
import { Container } from 'react-bootstrap'

export default function SelectedPost({currentPost}) {
  return (
    <Container>
    <h5>{currentPost.title}</h5>
    <p>{currentPost.content}</p>
  </Container>
  )
}
