const mongoose = require('mongoose');

const MessageScheme = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    recipient:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    text:{
        type:String,
        required:true,
        
    }
},{timestamps:true}
)

const MessageBoxSchema = mongoose.Schema({
    user1:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    user2:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    messages:[MessageScheme]
},{timestamps:true}
)
const MessageBox = mongoose.model('MessageBox', MessageBoxSchema);
const Message = mongoose.model('Message', MessageScheme);

module.exports={MessageBox, Message}