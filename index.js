import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import jwt from "jsonwebtoken"
import cors from "cors"

const app = express()
app.use(cors())
app.use(bodyParser.json())

dotenv.config()
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(()=>{
    console.log("Mongodb connected successfully!");
    
}).catch((e)=>{
    console.log(e);
    
})

app.use("/",(req,res,next)=>{
    let token = req.header("Authorization");
    
    
    if(token != null){
        token = token.replace("Bearer ","");
        const user = jwt.verify(token,process.env.SACHIN_JWT);
        req.user = user;
    }
    
    next();
})

app.use("/api/user",userRouter);
app.use("/api/product",productRouter);

app.get("/",(req,res)=>{
    res.send("Server is running on port 3000");
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})


