import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import {
  signUpValidationChain,
  validateLogin,
} from "./controllers/controllers.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  })
);

app.post("/users", signUpValidationChain);
app.post("/login", validateLogin);

app.listen(3000);
