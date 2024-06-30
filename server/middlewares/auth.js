import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]
        
        if(!token) return res.status(403).send("Access Denied..!")
            
            const verified = jwt.verify(token, process.env.JWT_SECRET)
            
            req.user = verified

        next()
    } catch (error) {
        console.log("Error - ", error);
        return res.status(500).json({ error: error.message });
    }
}