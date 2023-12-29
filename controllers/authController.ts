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
    res.status(201).json({
      statusCode: 201,
      message: "User created successfully",
      data: newUser,
    });
  }
);

const signin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Signin route");
    if (!req.body.email || !req.body.password) {
      res.status(400);
      throw new Error("Email and password are required");
    }
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    const token = user?.generateAuthToken();
  }
);

export { signup, signin };
