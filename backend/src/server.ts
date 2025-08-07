import express, {Application, Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from '@prisma/client';
import user from "./routes/user";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", user);

app.get('/', (req: Request, res: Response) =>{
    res.send("Backend API is running...")
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});