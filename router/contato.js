import express from "express";
import mongoose from "mongoose";
import Contato from "../models/Contato.js";
import {auth} from "../middleware/auth.js";
import validator from "validator";
import {requestLimiter} from "../middleware/rateLimit.js"
const router = express.Router();
mongoose.set("sanitizeFilter", true);

router.post("" ,requestLimiter, auth, async (req,res)=> {

    try{
            const{nome, telefone, email , mensagem} = req.body;
            if(!nome?.trim() || !telefone?.trim() || !email?.trim() || !mensagem?.trim()){
                return res.status(400).json({ msg : " preencha todos os campos corretamente!"});
            }
            if(typeof nome !== "string" || nome.length > 20){
                return res.status(400).json({ msg : "insira um nome válido !"});

            }
            if(typeof telefone !== "string" || !validator.isMobilePhone(telefone , "pt-BR")){
                return res.status(400).json({ msg : "insira um telefone válido !"});

            }
            if(typeof telefone !== "string" || !validator.isEmail(email)){
                return res.status(400).json({ msg : "insira um email válido !"});

            }
            if (typeof mensagem !== "string" || mensagem.length > 200) {
              return res.status(400).json({
                      msg: "Mensagem muito grande!"
                 });
}

            const contato = new Contato({
                nome,
                telefone, 
                email , 
                mensagem

            })
            await contato.save()
            res.status(200).json({ msg : "dados enviados com sucesso"});
    }
    catch(error){
        console.log(error)
        res.status(500).json({msg : "erro interno"})
    }
})

router.get("/" ,auth , async(req,res)=> {

    try{
        const data = await Contato.find();
        res.status(200).json(data)

    
    }
    catch(error){
        console.log(error)
        res.status(500).json({ msg : "erro interno"})
    }


})
router.delete("/:id" , async (req,res) => {
    try{
        const id = req.params.id; 
        await Contato.findByIdAndDelete(id);
        res.status(200).json({
            msg : "usuario deletado com sucesso"
        })
    }
    
    catch(error){
        console.log(error)
        res.status(500).json({
            msg : "error interno"
        })
    }
})
export default router
