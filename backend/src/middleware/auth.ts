import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

const JWT_SECRET = process.env.JWT_SECRET;

interface AuthRequest extends Request {
    user? : any;
}

export const authenticateUser = (req:AuthRequest, res:Response, next: NextFunction) =>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
}