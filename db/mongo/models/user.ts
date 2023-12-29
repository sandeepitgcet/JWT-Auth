import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

interface IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: 6,
    },

    firstName: {
      type: String,
      required: false,
    },

    lastName: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id,
      role: this.role,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
