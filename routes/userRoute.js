import express from "express"
import { getUserDetails, loginUser, registerUser } from "../controller/userController.js";

const userRouter = express.Router();


userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/getUserDetails",getUserDetails);

export default userRouter;