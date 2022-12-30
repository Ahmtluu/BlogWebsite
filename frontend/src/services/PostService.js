import axios from "axios";
import { cookies } from "./UserService";

//Get all POST
const GetAllPosts = async () => {
  return await axios
    .get("/post")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

//Get Single POST
const GetPost =  (id) => {
  return axios
    .get(`/post/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
//Post create
const PostCreate = (formData, currentUser) => {
  const authKey = cookies.get("jwt_authorization");
  const config = {
    headers: { Authorization: `Bearer ${authKey}` },
  };
  return axios.post(
    "/post",
    {
      title: formData.title,
      cover: formData.cover,
      content: formData.content,
      category: formData.category,
      createdBy: {
        _id: currentUser.userId,
        username: currentUser.username,
        profileImg: currentUser.profileImg,
      },
    },
    config
  );
};
//Post update
const PostUpdate = (formData, currentUser, postId) => {
  const authKey = cookies.get("jwt_authorization");
  const config = {
    headers: { Authorization: `Bearer ${authKey}` },
  };
console.log(formData)
};
//Post delete
const PostDelete = async (id) => {
  const authKey = cookies.get("jwt_authorization");
  const config = {
    headers: { Authorization: `Bearer ${authKey}` },
  };
  return await axios.delete(`/post/${id}`, config);
};

export { GetAllPosts, GetPost, PostCreate, PostUpdate, PostDelete };
