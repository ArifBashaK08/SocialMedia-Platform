import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {getUserPosts, likePost, getFeedPost} from "../controllers/posts.js"

const postRouter = Router()

postRouter.get("/", verifyToken, getFeedPost)

postRouter.get("/:userId/posts", verifyToken, getUserPosts)

postRouter.patch("/:id/like", verifyToken, likePost)

export default postRouter