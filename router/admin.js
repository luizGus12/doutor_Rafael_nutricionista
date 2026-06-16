import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import {auth} from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import path from "path";

const router = express.Router();




router.get('/' , auth, (req,res) =>{
    res.sendFile(
        path.resolve('views/admin.html')
    )
});

export default router;
