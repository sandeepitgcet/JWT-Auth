import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/mongo/mongoConfig";
import authRoutes from "./routes/authRoutes";
import { notFound, errorHandle } from "./middlewares/errorHandler";
connectDB();
const app = express();

dotenv.config({ path: "./.env" });
const port = parseInt(process.env.PORT!);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth/", authRoutes);
app.use(notFound);
app.use(errorHandle);

app.listen(port, () => console.log("Server up and running at port", port));
