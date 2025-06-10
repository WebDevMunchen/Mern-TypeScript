import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <nav className="navigation">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/login"}>Login</NavLink>
        <NavLink to={"/register"}>Register</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
