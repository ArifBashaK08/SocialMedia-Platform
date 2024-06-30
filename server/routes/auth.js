import express from "express";
import { signUp, signIn } from "../controllers/auth.js";
import * as dotenv from "dotenv";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

//============ CLOUD STORAGE ============//

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETKEY,
});

const storage = multer.memoryStorage();

export const upload = multer({ storage });

const authRouter = express.Router();

authRouter.post("/signup", upload.single("profilePic"), signUp);
authRouter.post("/signin", signIn);

export default authRouter;
