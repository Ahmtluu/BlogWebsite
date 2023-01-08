import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isLoggedIn }) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="login" replace="true" />;
};
export default ProtectedRoutes;
