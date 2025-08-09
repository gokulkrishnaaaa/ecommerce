import express, {Application, Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import user from "./routes/user";
import product from "./routes/product";

dotenv.config();

const app: Application = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials:true,
}));
app.use(express.json());
app.use("/api/user", user);
app.use("/api/product", product);


app.get('/', (req: Request, res: Response) =>{
    res.send("Backend API is running...")
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});