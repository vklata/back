// const mongoose = require('mongoose')
import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0
    },

  });

   export default mongoose.model('users',UserSchema)
 