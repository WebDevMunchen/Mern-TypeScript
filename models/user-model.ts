import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  password: { type: String, required: true, select: false },
  email: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  registeredClasses: { type: Schema.Types.ObjectId, ref: "Classe" },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("email")) {
    this.email = this.email.toLowerCase();
  }
  next();
});

const User = model("User", userSchema);

export default User;
