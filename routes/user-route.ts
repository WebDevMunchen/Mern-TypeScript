import express from "express";
import {
  deleteUser,
  getProfile,
  getUser,
  login,
  logout,
  registerUser,
  updateUser,
} from "../controllers/user-controller";

import { authnenticate } from "../middlewares/authenticate";

const userRouter = express.Router();

userRouter.route("/registerUser").post(registerUser);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/getProfile").get(authnenticate, getProfile);
userRouter.route("/updateUser/:id").put(updateUser);
userRouter.route("/deleteUser/:id").delete(deleteUser);
userRouter.route("/getUser/:id").get(getUser);

export default userRouter;
