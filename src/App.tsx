import "./App.css";
import { Header } from "./Components/Header/Header";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./Components/SignIn/Login";
import { Register } from "./Signup/Register";
import { ToastContainer } from "react-bootstrap";
import { AllBlogs } from "./Components/Blog/AllBlogs";


const PrivateRoute = ({ children }:any) => {
  const auth = false
  return auth ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="App">
       <ToastContainer/>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Register/>} />
          {/* <Route path="/myblogs" element={<PrivateRoute><AllBlog /></PrivateRoute>}/> */}
          <Route path="/allblogs" element={<PrivateRoute><AllBlogs /></PrivateRoute>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
