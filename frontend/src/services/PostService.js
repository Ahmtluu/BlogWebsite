import axios from "axios";
import { cookies } from "./UserService";

const authKey = cookies.get("jwt_authorization");
const config = {
  headers: {
    Authorization: `Bearer ${authKey}`,
    "Content-Type": "multipart/form-data",
  },
};

//Get all POST
const GetAllPosts = async () => {
  return await axios
    .get("/posts")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

//Get Single POST
const GetPost = async (id) => {
  return await axios
    .get(`/posts/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
//Post create
const CreatePost = async (data, currentUser) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("cover", data.cover[0]);
  formData.append("category", data.category);
  formData.append("author", currentUser.sub);

  return await axios.post(`/posts`, formData, config);
};

//Post update
const UpdatePost = (data, postId) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("cover", data.cover[0]);
  formData.append("category", data.category);
  return axios.patch(`/posts/${postId}`, formData, config);
};

//Post delete
const DeletePost = (id) => {
  return axios.delete(`/posts/${id}`, config);
};

export { GetAllPosts, GetPost, CreatePost, UpdatePost, DeletePost };
