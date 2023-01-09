import axios from "axios";
import { cookies, GetCurrentUser } from "./UserService";

const authKey = cookies.get("jwt_authorization");
const config = {
  headers: {
    Authorization: `Bearer ${authKey}` 
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
const CreatePost = async (data, user) => {

  const currentUser = await GetCurrentUser(user.sub);
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("cover", data.cover[0]);
  formData.append("category", data.category);
  formData.append("creatorName", currentUser.username);
  formData.append("creatorProfileImage", currentUser.profileImg);
  return axios.post("/posts", formData, config);
};

//Post update
const UpdatePost = async (data, postId, user) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("cover", data.cover[0]);
  formData.append("category", data.category);
  formData.append("creatorName", user.username);
  formData.append("creatorProfileImage", user.profileImg);

  return axios.patch(`/posts/${postId}`, formData, config);
};

//Post delete
const DeletePost = async (id) => {
  return await axios.delete(`/posts/${id}`, config);
};

export { GetAllPosts, GetPost, CreatePost, UpdatePost, DeletePost };
