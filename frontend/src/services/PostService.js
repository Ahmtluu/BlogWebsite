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
const PostUpdate = (postEntry, id, currentUser) => {
  const authKey = cookies.get("jwt_authorization");
  const config = {
    headers: { Authorization: `Bearer ${authKey}` },
  };
  return axios.patch(
    `/post/${id}`,
    {
      title: postEntry.title,
      cover: postEntry.cover,
      content: postEntry.content,
      createdBy: currentUser.createdBy,
    },
    config  
  );
};
//Post delete
const PostDelete = (id) => {
  const authKey = cookies.get("jwt_token");
  const config = {
    headers: { Authorization: `Bearer ${authKey}` },
  };
  return axios.post(`/post/${id}`, config);
};

export { GetAllPosts, GetPost, PostCreate, PostUpdate, PostDelete };
