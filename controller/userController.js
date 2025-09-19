import bcrypt from "bcrypt"
import User from "../model/user.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config();

export async function registerUser(req, res) {
    try {
        const userData = req.body;
        userData.password = bcrypt.hashSync(userData.password, 10);
        const user = new User(userData);

        await user.save();
        res.json({
            message: "Registration success"
        });
    } catch (e) {
        res.json({
            message: "Registration failed: " + e.message
        })
    }
}

export async function loginUser(req, res) {
    try {
        const userData = req.body;
        const user = await User.findOne({
            email: userData.email
        })

        if (user == null) {
            res.status(400).json({
                message: "User not found"
            });
            return;
        }

        const isPasswordValid = bcrypt.compareSync(userData.password, user.password);

        if (isPasswordValid) {
            const tokenData = {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                profilePic: user.profilePic,
                contact: user.contact,
                role: user.role
            }
            const token = jwt.sign(tokenData, process.env.SACHIN_JWT);
            res.json({
                message: "Login success",
                token: token,
                role: user.role
            });
        }else{
            res.json({
                message: "Password not match",
                token: token
            });
        }

    } catch (e) {
        res.status(500).json({
            message: "Login error" + e,
        });
    }
}


export function isAdmin(req){
    if(req.user.role == "admin"){
        return true;
    }else{
        return false;
    }
}

export function isUser(req){
    if(req.user.role == "customer"){
        return true;
    }else{
        return false;
    }
}

export function isUserNull(req){
    if(req.user  == null){
        return true;
    }else{
        return false;
    }
}