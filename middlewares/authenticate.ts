import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authnenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { access_token: token } = req.cookies;

    if (!token) {
      res.status(409).json({ message: "Forbidden!" });
      return;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };

    (req as any).user = payload;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
};
