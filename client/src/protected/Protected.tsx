import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const authContext = useContext(AuthContext);

  return (
    <>
      {!authContext?.isLoading && (
        <>{authContext?.user ? <Outlet /> : <Navigate to={"/login"} />}</>
      )}
    </>
  );
}
