import express from "express";
import {
  deleteUser,
  getUser,
  registerUser,
  updateUser,
} from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.route("/registerUser").post(registerUser);
userRouter.route("/updateUser/:id").put(updateUser);
userRouter.route("/deleteUser/:id").delete(deleteUser);
userRouter.route("/getUser/:id").get(getUser);

export default userRouter;
