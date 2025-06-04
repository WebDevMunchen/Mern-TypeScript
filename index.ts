import "dotenv/config";
import "./db";

import express from "express";
import cors from "cors";
import userRouter from "./routes/user-route";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
