import User from "../models/User.js";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import  generateToken  from "../utils/generateToken.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.username, email: user.email,},
    });
  } catch (error) {
    res.status(500).json({ message: "server error." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password jj" });
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error ", error)
    res.status(500).json({ message: "Server Error " });
  }
};


export const logout = async function name(params:type) {
  
}