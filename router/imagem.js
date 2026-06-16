import express from "express";
import multer from "multer";
import {auth} from "../middleware/auth.js"

const router = express.Router();

const storage = multer.diskStorage({

    destination : (req,file,cb) => {
        cb(null , 'public/imagens')
    },
    filename : (req,file , cb) => {
        cb(null , "perfil.jpg")
    }

})

const upload = multer({storage});

router.post("/" , upload.single("image") , (req,res) => {
    console.log(req.file);
    res.json({
        success : true,
        imagePath : `/imagens/${req.file.filename}`      
    })
})

export default router;
