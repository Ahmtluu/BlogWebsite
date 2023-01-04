import axios from "axios";
import { cookies } from "./UserService";

const config ={
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}


//Get all POST
const GetAllPosts = async () => {
  try {
    return await axios
    .get("/posts")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
  } catch (error) {
    console.log(error)
  }
 
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
const PostCreate = (formData, currentUser) => {
  const authKey = cookies.get("jwt_authorization");
  const config = {
    headers: { Authorization: `Bearer ${authKey}` },
  };
  return axios.post(
    "/posts",
    {
      title: formData.title,
      cover: formData.cover,
      content: formData.content,
      category: formData.category,
      createdBy: {
        _id: currentUser.sub,
        username: currentUser.username,
        profileImg: currentUser.profileImage,
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
console.log(formData,config,currentUser, postId )
};
//Post delete
const PostDelete = async (id) => {
  const authKey = cookies.get("jwt_authorization");
  const config = {
    headers: { Authorization: `Bearer ${authKey}` },
  };
  return await axios.delete(`/posts/${id}`, config);
};

export { GetAllPosts, GetPost, PostCreate, PostUpdate, PostDelete };
