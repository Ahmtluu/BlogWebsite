import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import PostEdit from "./pages/PostEdit";
import Dashboard from "./pages/Dashboard";
import CustomNavbar from "./components/CustomNavbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App(props) {
  const pathname = window.location.pathname;
  return (
    <>
      <Router>
        {pathname !== "/login" ? <CustomNavbar /> : <></>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/edit/:id" element={<PostEdit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="blog/:id" element={<Post />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
