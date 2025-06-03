import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import UserModel from "../Models/User";
import dotenv from "dotenv";

dotenv.config();

const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      name,
      email,
      password,
    }: { name: string; email: string; password: string } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        message: "User already exists. Please login!",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "User not found", success: false });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      return res.status(403).json({
        message: "Email or password invalid.Please try again!",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRETKEY as string,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      message: "Login succuesfull",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err: any) {
    console.log("ERRRRRRRR login", err);
    return res.status(500).json({ message: err.message, success: false });
  }
};

export { signup, login };
