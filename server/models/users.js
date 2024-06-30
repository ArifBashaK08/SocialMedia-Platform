import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 40
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    imgLink: {
        type: String,
        default: "/images/user.png",
    },
    firends: {
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
    profileViews: Number,
    impressions: Number
}, { timestamps: true })

const UserModel = mongoose.model("UserDB", UserSchema)

export default UserModel;