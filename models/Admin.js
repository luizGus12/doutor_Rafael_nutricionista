import mongoose from "mongoose";

const Admin = mongoose.model('admin' , {
    imagem : String,
    nome : String , 
    descricao : String,
    telefone : String,
    instagram : String,
    email : String , 
    endereco : String,
});

export default Admin;
