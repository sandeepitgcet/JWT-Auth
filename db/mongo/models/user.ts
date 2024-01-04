import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { createHash } from "crypto";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

interface IUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  passwordHash?: string;
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

    passwordHash: {
      type: String,
      required: false,
    },

    accessToken: {
      type: String,
      required: false,
    },

    refreshToken: {
      type: String,
      required: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    methods: {
      generateAuthToken: function (expiresIn = "15m") {
        const token = jwt.sign(
          {
            _id: this._id,
            role: this.role,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
          },
          process.env.JWT_SECRET!,
          { expiresIn: expiresIn }
        );
        return token;
      },

      comparePassword: async function (candidatePassword: string) {
        const hash = createHash("sha256")
          .update(candidatePassword)
          .digest("hex");
        return hash === this.passwordHash;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  console.log("pre save");
  const user = this as IUser;
  const hash = createHash("sha256").update(user.password).digest("hex");
  user.passwordHash = hash;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
