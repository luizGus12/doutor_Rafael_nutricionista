import express from "express" ;
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js"
import {auth} from "../middleware/auth.js";

const router = express.Router();

router.put('/:id' , auth, async (req,res) => {

    try{
        const id = req.params.id;
        const { imagem ,
                nome  , 
                descricao ,
                telefone ,
                instagram ,
                email  , 
                endereco 
            } = req.body;



        await Admin.findByIdAndUpdate(id , {
                imagem ,
                nome  , 
                descricao ,
                telefone ,
                instagram ,
                email  , 
                endereco 
            
        })

        res.status(200).json({
         msg: "Atualizado com sucesso"
});

}catch(error){
    console.log(error);
    res.status(500).json({
        msg : "error interno"
    })

}

})

router.get('/' , async (req,res) => {
    try{

        const data = await Admin.find();

        res.status(200).json({
            data,
        })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg : "erro ao enviar"
        })
    }

})

export default router;
