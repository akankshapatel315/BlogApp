import "./App.css";
import { Header } from "./Components/Header/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/SignIn/Login";
import { Register } from "./Signup/Register";
import { ToastContainer } from "react-bootstrap";
import { AllBlogs } from "./Components/Blog/AllBlogs";
import { Blog } from "./Components/Blog/Blog";
import { MyBlog } from "./Components/Blog/MyBlog";

const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/allBlogs"
            element={
              <PrivateRoute>
                <Blog />
              </PrivateRoute>
            }
          />
          <Route
            path="/myBlogs"
            element={
              <PrivateRoute>
                <MyBlog />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
