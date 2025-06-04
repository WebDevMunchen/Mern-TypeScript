import { Request, Response, NextFunction } from "express";
import User from "../models/user-model";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { password, email, role } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
      res.status(400).json({ message: "User already exists!" });
      return;
    }

    const user = await User.create({ password, email, role });

    res.status(201).json({ email: user.email, role: user.role });
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
