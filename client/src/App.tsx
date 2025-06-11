import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Protected from "./protected/Protected";
import ProtectedComponent from "./components/Protected";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/" element={<Protected />}>
          <Route path="/protected" element={<ProtectedComponent />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
