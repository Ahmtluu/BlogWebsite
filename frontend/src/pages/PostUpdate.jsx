import React,{useState} from 'react'
import { useLocation } from 'react-router'

export default function PostUpdate() {
  const location = useLocation();
  const currentPost= location.state.post;

  const [post, setPost] = useState(currentPost)

  
  return (
    post?<div>{post.title}</div>:<div>loading</div>
    
  )
}
