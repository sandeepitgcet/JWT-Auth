import expressAsyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import User from "../db/mongo/models/user";

const asyncHandler = expressAsyncHandler;

const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Signup route");
    if (!req.body.email || !req.body.password) {
      res.status(400);
      throw new Error("Email and password are required");
    }
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = await User.create(req.body);
    newUser.generateAuthToken();
    res.status(201).json({
      statusCode: 201,
      message: "User created successfully",
      data: newUser,
    });
  }
);

const signin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) {
      res.status(400);
      throw new Error("Email and password are required");
    }
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      res.status(400);
      throw new Error("Invalid password");
    }

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateAuthToken("30d");
    res.status(200).json({
      statusCode: 200,
      message: "User signed in successfully",
      data: { user, accessToken, refreshToken },
    });
  }
);

export { signup, signin };
