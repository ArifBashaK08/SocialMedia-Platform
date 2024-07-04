import express from "express";
import { signUp, signIn } from "../controllers/auth.js";


const authRouter = express.Router();

authRouter.post("/signin", signIn);

export default authRouter;
