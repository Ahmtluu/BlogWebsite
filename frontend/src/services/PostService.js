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
const GetPost = async (id) => {
  return await axios
    .get(`/post/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
//Post create
const PostCreate = (postEntry) => {
  const authKey = cookies.get("jwt_token");
  const config = {
    headers: { Authorization: `Bearer ${authKey}` },
  };
  return axios.post(
    "/post",
    {
      title: postEntry.title,
      cover: postEntry.cover,
      content: postEntry.content,
      createdBy: postEntry.createdBy,
    },
    config
  );
};
//Post update
const PostUpdate = (postEntry, id) => {
  const authKey = cookies.get("jwt_token");
  const config = {
    headers: { Authorization: `Bearer ${authKey}` },
  };
  return axios.patch(
    `/post/${id}`,
    {
      title: postEntry.title,
      cover: postEntry.cover,
      content: postEntry.content,
      createdBy: postEntry.createdBy,
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
