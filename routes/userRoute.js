import express from "express"
import { getUserDetails, loginUser, registerUser, updateUser } from "../controller/userController.js";

const userRouter = express.Router();


userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/getUserDetails",getUserDetails);
// userRouter.put("/updateUser/:email",updateUser);

export default userRouter;