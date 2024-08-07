import PostModel from "../models/posts.js"
import UserModel from "../models/users.js"
import { v2 as cloudinary } from "cloudinary";

// Create a Post
export const createPost = async (req, res) => {
    try {
        console.log("Creating Post");

        const { userId, description } = req.body

        const foundUser = await UserModel.findById(userId)

        let fileLink = null;
        if (req.file) {
            // Handle the Cloudinary upload
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "image",
                        folder: "social_media_app",
                    },
                    (error, result) => {
                        if (error) {
                            reject(new Error("Unable to upload"));
                        } else {
                            resolve(result);
                        }
                    }
                );
                stream.end(req.file.buffer);
            });

            fileLink = result.secure_url;
        }

        console.log("File: ", fileLink);

        const newPost = new PostModel({
            userId, firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            location: foundUser.location,
            description, fileLink,
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
        const posts = await PostModel.find().sort({ createdAt: -1 })

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