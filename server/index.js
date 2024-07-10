import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { signUp } from "./controllers/auth.js";
import { verifyToken } from "./middlewares/auth.js";

//============ CONFIGURATIONS ============//

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//============ CLOUD STORAGE ============//

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRETKEY,
});

const storage = multer.memoryStorage();

export const upload = multer({ storage });

//============ ROUTES ============//
app.get("/", (req, res) => {
    res.status(200).send("Hello, server is working!")
})
app.post("/signup", upload.single("profilePic"), signUp);
app.post("/posts", verifyToken, upload.single("file"), (req, res, next) => {
    console.log(req.body); // Log the body fields
    console.log(req.file); // Log the file field
    next();
}, createPost)

app.use("/auth", authRouter);
app.use("/users", userRouter)
app.use("/posts", postRouter)

//============ MONGODB CONNECTION ============//

const port = process.env.PORT || 3002;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port,
            () => console.log(`Server is connected on PORT : ${port}`)
        );

    })
    .catch((err) => console.error("Error connecting DB - ", err.message));
