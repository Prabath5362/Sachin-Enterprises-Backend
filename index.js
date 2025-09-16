import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import userRouter from "./routes/userRoute.js"

const app = express()
app.use(bodyParser.json())

dotenv.config()
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(()=>{
    console.log("Mongodb connected successfully!");
    
}).catch((e)=>{
    console.log(e);
    
})



app.use("/api/user",userRouter);

app.get("/",(req,res)=>{
    res.send("Server is running on port 3000");
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})


