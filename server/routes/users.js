import express from "express";
import { getUser, friendsList, addRemoveFriends, getAllUsers } from "../controllers/users.js"

import { verifyToken } from "../middlewares/auth.js"

const userRouter = express.Router()

userRouter.get("/", getAllUsers)

userRouter.get("/:id", verifyToken, getUser)
userRouter.get("/:id/friends", verifyToken, friendsList)

userRouter.patch("/:id/:friendId", verifyToken, addRemoveFriends)

export default userRouter