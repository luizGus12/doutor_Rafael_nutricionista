import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        user : {
            type : String , 
            required : true,
            trim : true
        },
        password : {
            type : String,
            required : true
        },
        
        
    } , {
        strict : true
    }
)
const User = mongoose.model("user" , userSchema);


export default User
