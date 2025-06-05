import { Request, Response, NextFunction } from "express";
import User from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { password, email, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const findUser = await User.findOne({ email });

    if (findUser) {
      res.status(400).json({ message: "User already exists!" });
      return;
    }

    const user = await User.create({ password: hashedPassword, email, role });

    res.status(201).json({ email: user.email, role: user.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(409).json({ message: "Forbidden!" });
    }

    const payload = { email: user.email, role: user.role, id: user._id};

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "480m",
    });

    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 28800000 })
      .json(payload);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res
    .cookie("access_token", "", { httpOnly: true, maxAge: 0 })
    .json({ message: "Logged out!" });
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = (req as AuthenticatedRequest).user

    const userProfile = await User.findById(id);

    if (!userProfile) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const updatedFields = {
      email,
      role,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
};
