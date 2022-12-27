import { is } from "immutable";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isLoggedIn }) => {
  return isLoggedIn === "false" ? (
    <Navigate to="login" replace="true" />
  ) : (
    <Outlet />
  );
};
export default ProtectedRoutes;
