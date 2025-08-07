import express, {Application, Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) =>{
    res.send("Backend API is running...")
});

mongoose
    .connect(process.env.MONGO_URI as string)
    .then(()=>{
        console.log("MongoDB Connected");
        app.listen(process.env.PORT || 5000, ()=>{
            console.log(`Server is running on the port ${process.env.PORT || 5000}`)
        });
    })
    .catch((err)=>(
        console.log(err)
    ));