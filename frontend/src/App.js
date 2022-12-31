import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import AboutMe from "./pages/AboutMe";
import Profile from "./pages/Profile";
import CustomNavbar from "./components/CustomNavbar";
import ProtectedRoutes from "./ProtectedRoutes";
import CategorisedPost from "./pages/CategorisedPost";
import Author from "./pages/Author";
import { cookies } from "./services/UserService";

import { useLocation } from "react-router-dom";

function App() {
  let location = useLocation();
  let isLoggedIn = cookies.get("isAuth");
  return (
    <>
      {location.pathname !== "/login" ? <CustomNavbar /> : <></>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="posts/:_id" element={<PostDetail />} />
        <Route path="categories/:title" element={<CategorisedPost />} />
        <Route path="login" element={<Login />} />
        <Route path="aboutme" element={<AboutMe />} />
        <Route path="author/:username" element={<Author />} />
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
