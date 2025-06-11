import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function Navbar() {
  const authContext = useContext(AuthContext);

  return (
    <nav>
      {!authContext?.isLoading && (
        <>
          <NavLink to={"/"}>Home</NavLink>
          {!authContext?.user ? (
            <>
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/register"}>Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to={"/protected"}>Protected</NavLink>
              <NavLink to={"/profile"}>Profile</NavLink>
              <button onClick={() => authContext?.logout()}>Logout</button>
            </>
          )}
        </>
      )}
    </nav>
  );
}
