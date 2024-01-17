const mongoose = require('mongoose');

const UserScheme= mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model("user", UserScheme)