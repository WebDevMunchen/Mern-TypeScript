import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../types/CustomError";

export const authnenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { access_token: token } = req.cookies;

    if (!token) {
      const error: CustomError = new Error("Forbidden!") as CustomError;
      error.statusCode = 409;
      throw error;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };

    (req as any).user = payload;

    next();
  } catch (error) {
     next(error)
  }
};
