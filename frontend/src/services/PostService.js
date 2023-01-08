import axios from "axios";
import { cookies, GetCurrentUser } from "./UserService";

const config ={
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}


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
const PostCreate = async (data, user) => {
  const authKey = cookies.get("jwt_authorization");
  const config = {
    headers: { Authorization: `Bearer ${authKey}` },
  };

  const currentUser = await GetCurrentUser(user.sub)

  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("content", data.content)
  formData.append("cover", data.cover[0]);
  formData.append("category", data.category);
  formData.append("creatorName", currentUser.username);
  formData.append("creatorProfileImage", currentUser.profileImg);
  
  return axios.post(
    "/posts",
    formData,
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
