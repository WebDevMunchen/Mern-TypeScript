import { useForm, type SubmitHandler } from "react-hook-form";
import { axiosClient } from "../utils/axiosClient";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    axiosClient
      .post("/user/login", data)
      .then(() => {
        console.log("Logged in!");
      })
      .catch((error) => {
        console.log(error);
      });
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
