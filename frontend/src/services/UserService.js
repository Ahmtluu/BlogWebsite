import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const UserLogin = (dummyData) => {
  try {
    return axios.post(`/user/login`, {
      email: dummyData.email,
      password: dummyData.password,
    });
  } catch (error) {
    return error;
  }
};
//User update
const UpdateUser = async (id, dummyData) => {
  const token = cookies.get("jwt_authorization");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyparameters = {
    username: dummyData.username,
    email: dummyData.email,
    about: dummyData.about,
    password: dummyData.password,
  };
  return await axios
    .patch(`/user/${id}`, bodyparameters, config)
    .catch((err) => {
      console.log(err);
    });
};

//Get Current User
const GetCurrentUser = async (userId) => {
  return await axios
    .get(`/user/${userId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export { UserLogin, GetCurrentUser, UpdateUser, cookies };
