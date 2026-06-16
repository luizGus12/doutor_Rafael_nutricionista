import mongoose from "mongoose";
import bcrypt from "bcrypt";
import express from "express";
mongoose.set("sanitizeFilter", true);

const contatoSchema = new mongoose.Schema(
     {
    nome : String,
    telefone : String,
    email : String,
    mensagem : String,
}, 
{
    strict : true,
})
const Contato = mongoose.model(
    "Contato",
    contatoSchema
);


export default Contato;
