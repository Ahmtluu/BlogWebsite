import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { cookies } from "./services/UserService";

const ProtectedRoutes = () => {
  let isLoggedIn = cookies.get("isAuth");
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace="true" />;
};
export default ProtectedRoutes;
