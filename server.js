import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import User from "./models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import helmet from "helmet";







const PORT = 8000;
const app = express();
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser());

//token de autenticação





//verificacão


import renderContato from "./router/contato.js"
app.use("/contato" , renderContato);

import uploadFoto from "./router/imagem.js"
app.use("/imagem" , uploadFoto);

import editFront from "./router/edit.js"
app.use("/edit" , editFront);

import renderLogin from "./router/login.js";
app.use("/login" , renderLogin);

import renderAdmin from "./router/admin.js"
app.use("/admin" , renderAdmin);

import logout from "./router/logout.js"
app.use("/logout" , logout);

app.get("/", (req, res) => {
    res.sendFile("public/index.html");

});





const db_connect = process.env.MONGO_URI;

mongoose.connect(db_connect)
.then(()=> {
    // app.listen(PORT , ()=>{
    //    console.log("servidor funcionando")
    // })
    console.log("conectou ao banco de dados")

})
.catch((error)=> {
    console.log(error)
})

export default app;
