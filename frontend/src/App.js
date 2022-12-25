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

function App() {
  const pathname = window.location.pathname;
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="posts/:postId" element={<PostDetail />} />
        <Route path="categories/:title" element={<CategorisedPost />} />
        <Route path="login" element={<Login />} />
        <Route path="aboutme" element={<AboutMe />} />
        <Route path="author/:username" element={<Author />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="posts/edit/:id" element={<PostEdit />} />
          <Route path="profile/:username" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
