import express from "express";
import {auth} from "../middleware/auth.js";
const router = express.Router()

router.post('/' , (req,res)=> {
    res.clearCookie('token');
    res.json({
        sucess : true,
    })
})

export default router
