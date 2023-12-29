"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../db/mongo/models/user"));
const asyncHandler = express_async_handler_1.default;
const signup = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Signup route");
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (user) {
        res.status(400);
        throw new Error("User already exists");
    }
    const newUser = yield user_1.default.create(req.body);
    res.status(201).json({
        statusCode: 201,
        message: "User created successfully",
        data: newUser,
    });
}));
exports.signup = signup;
const signin = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Signin route");
}));
exports.signin = signin;
