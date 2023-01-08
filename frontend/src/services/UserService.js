import axios from "axios";
import Cookies from "universal-cookie";

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

  const formData = new FormData();
  formData.append("username",dummyData.username );
  formData.append("fullName",dummyData.fullName);
  formData.append("email",dummyData.email);
  formData.append("about",dummyData.about);
  if(dummyData.profileImg) formData.append("profileImg", dummyData.profileImg[0]);
  if(dummyData.password) formData.append("password",dummyData.password );
  return await axios
    .patch(`/user/${id}`, formData, config)
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
