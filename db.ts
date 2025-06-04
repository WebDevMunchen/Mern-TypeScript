import mongoose from "mongoose";

mongoose
  .connect(process.env.CONNECTION_STRING!)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
  });
