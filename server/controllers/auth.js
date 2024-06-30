import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/users.js";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

//============ SIGNUP ROUTE ============//

export const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, location, occupation } = req.body;

        // Check required fields
        if (!firstName || !lastName || !email || !password || !location || !occupation) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        let imgLink;

        if (req.file) {
            // Upload to Cloudinary
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "user_profile_pics" },
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                uploadStream.end(req.file.buffer);
            });
            imgLink = result.secure_url;
        } else {
            // Use default image if no file uploaded
            imgLink = "https://your-default-image-url.com/default-profile-pic.jpg";
        }

        const profileViews = Math.floor(Math.random() * 1000);

        const newUser = new UserModel({
            firstName, lastName, email, password: passwordHash,
            imgLink,
            location, occupation,
            profileViews: profileViews,
            impressions: Math.floor(Math.random() * profileViews),
        });

        const savedUser = await newUser.save();

        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

//============ SIGNIN ROUTE ============//

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const foundUser = await UserModel.findOne({ email });

        if (!foundUser) return res.status(404).json({ msg: "User not found..!" });

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials..!" });

        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET);

        delete foundUser.password;

        res.status(200).json({ token, user: foundUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
