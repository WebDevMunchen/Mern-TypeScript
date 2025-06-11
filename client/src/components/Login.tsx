import { useForm, type SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import type { LoginData } from "../context/types";

export default function Login() {
  const authContext = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    authContext?.login(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
      <input
        type="email"
        placeholder="max.musterman@net.com"
        {...register("email", { required: true })}
      />
      {errors.email && <span>This field is required</span>}

      <input
        type="password"
        placeholder="******"
        {...register("password", { required: true })}
      />
      {errors.password && <span>This field is required</span>}

      <input type="submit" />
    </form>
  );
}
