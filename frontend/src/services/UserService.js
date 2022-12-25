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

//Get Current User
const GetCurrentUser = async (username) => {
  return await axios
    .get(`/user/${username}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export { UserLogin, GetCurrentUser, cookies };
