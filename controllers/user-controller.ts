import { Request, Response, NextFunction } from "express";
import User from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";
import { CustomError } from "../types/CustomError";
import { asyncWrapper } from "../utils/asyncWrapper";

export const registerUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { password, email, role } = req.body;

    const lowercasedEmail = email.toLowerCase();

    const findUser = await User.findOne({ email: lowercasedEmail });

    if (findUser) {
      const error: CustomError = new Error(
        "User not already exists!"
      ) as CustomError;
      error.statusCode = 400;
      throw error;
    }

    const user = await User.create({ password, email, role });

    res.status(201).json({ email: user.email, role: user.role });
  }
);

export const login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const error: CustomError = new Error("User not found!") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      const error: CustomError = new Error(
        "Incorrect password!"
      ) as CustomError;
      error.statusCode = 409;
      throw error;
    }

    const payload = { email: user.email, role: user.role, id: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "480m",
    });

    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 28800000 })
      .json(payload);
  }
);

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res
    .cookie("access_token", "", { httpOnly: true, maxAge: 0 })
    .json({ message: "Logged out!" });
};

export const getProfile = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = (req as AuthenticatedRequest).user;

    const userProfile = await User.findById(id);

    if (!userProfile) {
      const error: CustomError = new Error("User not found!") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(userProfile);
  }
);

export const getUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      const error: CustomError = new Error("User not found!") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(user);
  }
);

export const updateUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { email, role } = req.body;

    const user = await User.findById(id);

    if (!user) {
      const error: CustomError = new Error("User not found!") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    const updatedFields = {
      email,
      role,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json(updatedUser);
  }
);

export const deleteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      const error: CustomError = new Error("User not found!") as CustomError;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "User deleted!" });
  }
);
