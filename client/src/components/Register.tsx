import { useForm, type SubmitHandler } from "react-hook-form";
import { axiosClient } from "../utils/axiosClient";
import type { LoginData } from "../context/types";

// type Inputs = {
//   email: string;
//   password: string;
// };

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    axiosClient
      .post("/user/registerUser", data)
      .then(() => {
        console.log("Success!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
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
