import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import { upload } from "./auth.js";
import {createPost, getUserPosts, likePost, getFeedPost} from "../controllers/posts.js"

const postRouter = Router()

postRouter.post("/", verifyToken, upload.single("file"), createPost)

postRouter.get("/", verifyToken, getFeedPost)

postRouter.get("/:userId/posts", verifyToken, getUserPosts)

postRouter.patch("/:id/like", verifyToken, likePost)

export default postRouter