import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isLoggedIn }) => {

  const pathname = window.location.pathname;
  
  if(pathname.includes("login") && isLoggedIn) return <Navigate to="/" replace="true" />
  if(pathname.includes("login")) return <Outlet/>
  return isLoggedIn ? <Outlet /> : <Navigate to="login" replace="true" />;
  
};
export default ProtectedRoutes;
