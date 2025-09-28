import bcrypt from "bcrypt";
import User from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { raw } from "body-parser";

dotenv.config();

export async function registerUser(req, res) {
  try {
    const userData = req.body;
    userData.password = bcrypt.hashSync(userData.password, 10);
    const user = new User(userData);

    const token = jwt.sign(
      {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        profilePic: user.profilePic,
        contact: user.contact,
        role: user.role,
      },
      process.env.SACHIN_JWT
    );
    await user.save();
    res.json({
      message: "Registration success",
      token: token,
      role: user.role,
    });
  } catch (e) {
    res.json({
      message: "Registration failed: " + e.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const userData = req.body;
    const user = await User.findOne({
      email: userData.email,
    });

    if (user == null) {
      res.status(400).json({
        message: "User not found",
      });
      return;
    }

    const isPasswordValid = bcrypt.compareSync(
      userData.password,
      user.password
    );

    if (isPasswordValid) {
      const tokenData = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        profilePic: user.profilePic,
        contact: user.contact,
        role: user.role,
      };
      const token = jwt.sign(tokenData, process.env.SACHIN_JWT);
      res.json({
        message: "Login success",
        token: token,
        role: user.role,
      });
    } else {
      res.status(400).json({
        message: "Password not match",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Login error: " + e.message,
    });
  }
}

export function getUserDetails(req, res) {
  try {
    const user = req.user;
    if (user == null) {
      res.status(401).json({
        message: "User details not found.",
      });
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({
      message: "Error fetch user details: " + e.message,
    });
  }
}

export async function updateUser(req, res) {
  try {
    if (isUserNull(req)) {
    res.status(401).json({
      message: "You are not authorized to perform this task",
    });
    return;
  }

  if (isUser(req)) {
    const updateData = req.body;
    if (updateData.password != null) {
      updateData.password = bcrypt.hashSync(updateData.password, 10);
    }
    
    updateData.role = "customer";
    const updateID = req.params.email;
    await User.updateOne(
      {
        email: updateID,
      },
        updateData
    )
  }
  }catch(e){
    res.status(500).json({
      message: "User updating failed"
    })
  }
}

export function isAdmin(req) {
  if (req.user.role == "admin") {
    return true;
  } else {
    return false;
  }
}

export function isUser(req) {
  if (req.user.role == "customer") {
    return true;
  } else {
    return false;
  }
}

export function isUserNull(req) {
  if (req.user == null) {
    return true;
  } else {
    return false;
  }
}
