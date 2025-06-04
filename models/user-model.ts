import { Schema, model } from "mongoose";

const userSchema = new Schema({
  password: { type: String, required: true, select: false },
  email: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  registeredClasses: { type: Schema.Types.ObjectId, ref: "Classe" },
});

const User = model("User", userSchema);

export default User;
