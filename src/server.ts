import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "./database";
import { router} from "./routes";
import { AppError } from "./error/AppError";

const app = express();

app.use(express.json());
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof AppError){
        return res.status(400).json({error: err.message})
    }
    return res.status(500).json({status: "error", message: "Internal server error"})
})

// http://localhost:3000
app.listen(3000, () => console.log("Server is running ok!"))