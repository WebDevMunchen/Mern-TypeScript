import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Profile() {
  const authContext = useContext(AuthContext);

  const user = authContext?.user;

  return (
    <>
      <h2>Profile</h2>
      {user ? (
        <>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </>
      ) : (
        <p>User not logged in</p>
      )}
    </>
  );
}
