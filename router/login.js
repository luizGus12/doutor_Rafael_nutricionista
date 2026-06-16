import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import {auth} from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import path from "path";
import loginLimiter from "../middleware/rateLimit.js";

const router = express.Router()

router.post("/" , loginLimiter,  async (req,res)=> {

    try{
        const{user,password}= req.body;
        

        if(!user?.trim() ||  !password?.trim()){
            return res.status(400).json({
                msg : "digite dados válidos !!"
            })
        }

        if(
            typeof user !== "string" ||
            typeof password !== "string"
        )
        {
            return res.status(400).json({
                msg : "digite dados válidos !!"
            })

        }



       const findUser = await User.findOne({user});

       if(!findUser){
          return res.status(401).json({
            msg : "usuario ou senha incorretos !"
        });

       }

       const findPass = await bcrypt.compare(password ,
               findUser.password);
       
       if(!findPass){
          return res.status(401).json({
            msg : "usuario ou senha incorretos !"
        });
        
    }
       const token = jwt.sign(
           {
           id: findUser._id,
           user: findUser
           },
           process.env.JWT_SECRET,
           {
               expiresIn : "1d"
           }
       );
       
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: false, // true quando estiver usando HTTPS
            //maxAge: 24 * 60 * 60 * 1000
        });
       return res.status(200).json({
           msg : "login aprovado" , token
       });
    }
    
    
    catch(error){
    console.log("ERRO:", error);

    return res.status(500).json({
        msg: error.message
    });
}
})

router.get('/' , (req,res) =>{
    res.sendFile(
        path.resolve('views/login.html')
    )
})

export default router;
