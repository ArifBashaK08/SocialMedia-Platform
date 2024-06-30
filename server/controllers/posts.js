import PostModel from "../models/posts.js"
import UserModel from "../models/users.js"

// Create a Post
export const createPost = async (req, res) => {
    try {
        const { userId, description, file } = req.body

        const foundUser = await UserModel.findById(userId)

        console.log("Found User - ", foundUser);

        const newPost = new PostModel({
            userId, firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            location: foundUser.location,
            description, fileLink: file,
            imgLink: foundUser.imgLink,
            likes: {},
            comments: []
        })

        await newPost.save()
        const posts = await PostModel.find()

        return res.status(201).json(posts)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// Get all posts
export const getFeedPost = async (req, res) => {
    try {
        const posts = await PostModel.find()

        return res.status(200).json(posts)
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

// Get user posts
export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params

        const posts = await PostModel.find({ userId })

        return res.status(200).json(posts)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// Update Likes
export const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body

        const post = await PostModel.findById(id)
        const isLiked = post.likes.get(userId)

        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await PostModel.findByIdAndUpdate(id,
            { $set: { likes: post.likes } },
            { new: true }
        )

        return res.status(200).json(updatedPost)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}