import "dotenv/config";
import "./db";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user-route";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/user", userRouter);

app.use(errorHandler)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
