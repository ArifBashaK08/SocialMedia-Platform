import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import postRouter from "./routes/posts.js";

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

//============ ROUTES ============//

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
