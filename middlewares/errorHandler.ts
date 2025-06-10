import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/CustomError";

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);

  res
    .status(err.statusCode || 500)
    .send(
      err.statusCode && err.message ? err.message : "Something went wrong!"
    );
};
