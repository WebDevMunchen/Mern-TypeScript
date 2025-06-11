import { createContext, useEffect, useState } from "react";
import { axiosClient } from "../utils/axiosClient";
import { useNavigate } from "react-router-dom";
import type { AuthContextType, LoginData, User } from "./types";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/user/getProfile")
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (data: LoginData) => {
    axiosClient
      .post("/user/login", data)
      .then((response) => {
        setUser(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async () => {
    axiosClient
      .post("/user/logout")
      .then(() => {
        console.log("Logged out!");
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
