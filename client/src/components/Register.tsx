import { useForm, type SubmitHandler } from "react-hook-form"

type Inputs = {
  email: string
  password: string
}


export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="max.musterman@net.com"{...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}

      <input type="password" placeholder="******" {...register("password", {required: true})} />
      {errors.password && <span>This field is required</span>}


      <input type="submit" />
    </form>
  )
}