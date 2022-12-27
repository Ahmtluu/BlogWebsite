import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import AboutMe from "./pages/AboutMe";
import PostEdit from "./pages/PostEdit";
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
  console.log(isLoggedIn);
  return (
    <>
      {location.pathname !== "/login" ? <CustomNavbar /> : <></>}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="posts/:postId" element={<PostDetail />} />
        <Route path="categories/:title" element={<CategorisedPost />} />
        <Route path="login" element={<Login />} />
        <Route path="aboutme" element={<AboutMe />} />
        <Route path="author/:username" element={<Author />} />
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path="posts/edit/:id" element={<PostEdit />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
