import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

const userSchema = z.object({
    email: z.email(),
    name: z.string().min(3),
    password: z.string().min(8),
    role: z.enum(["USER", "ADMIN"])
});

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
})


export const registerUser = async (req: Request, res : Response) => {
    try {
        const data = userSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({
            where :{
                email : data.email
            }
        })

        if(existingUser){
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                name : data.name,
                email : data.email,
                password : hashedPassword,
                role: data.role || 'USER',
            }
        });

        const {password, ...userWithoutPassword} = user;
        res.status(201).json(userWithoutPassword);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
}

export const loginUser = async (req:Request, res:Response) =>{
    try {
        const data = loginSchema.parse(req.body);

        const user = await prisma.user.findUnique({
            where : {
                email: data.email,
            }
        });

        if(!user){
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid Credentials"});
        }

        const token = generateToken(user.id, user.role)

        const {password, ...userWithoutPassword} = user;
        res.status(200).json({
            message:"Login Successfull",
            token,
            user: userWithoutPassword
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}