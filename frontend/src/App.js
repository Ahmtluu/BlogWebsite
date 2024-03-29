import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NavigationBar from "./components/NavigationBar";
import ProtectedRoutes from "./ProtectedRoutes";
import CategorisedPost from "./pages/CategorisedPost";
import Author from "./pages/Author";
import { cookies } from "./services/UserService";
import { useLocation } from "react-router-dom";
import PostUpdate from "./pages/PostUpdate";
import PostAdd from "./pages/PostAdd";
import "animate.css";

function App() {
  let location = useLocation();
  let isLoggedIn = cookies.get("isAuth");
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="posts/:_id" element={<PostDetail />} />
        <Route path="categories/:title" element={<CategorisedPost />} />
        <Route path="author/:username" element={<Author />} />

        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path="login" element={<Login />} />
          <Route path="posts/:_id/update" element={<PostUpdate />} />
          <Route path="posts/add_new" element={<PostAdd />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
