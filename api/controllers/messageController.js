const {Message, MessageBox} = require("../models/Message");


const getMessageBox= async(req,res)=>{
    try {
        const userId = req.params.id
        const messages = await MessageBox.find({$or: [
            { user1: userId },
            { user2: userId }
        ]})
        res.json({messages:messages})
    } catch (error) {
        console.log(error);
    }
}

const getMessage= async(req,res)=>{
    try {
        const userId = req.params.id
        const messages = await Message.find({$or: [
            { sender: userId },
            { recipient: userId }
        ]})
        res.json({messages:messages})
    } catch (error) {
        console.log(error);
    }
}

const postMessage=async (req,res)=>{
    try {
        const {sender, recipient, text} = req.body
        const message = await Message.create({
            sender,
            recipient,
            text
        })

        let box = await MessageBox.findOne({
            $or: [
              { user1: sender, user2: recipient },
              { user1: recipient, user2: sender },
            ],
          });
          if(box){
            const boxId= box.id
            box.messages.push(message)
            const updated = await MessageBox.findByIdAndUpdate(
                boxId,
                { $push: { messages: message } }, // messages alanına yeni mesajı ekleyin
                {new:true}
            )
            res.json({updated:updated})
          }else{
            const box = await MessageBox.create({
                user1:sender,
                user2:recipient,
                messages:[message]
                
            })
            res.json({
                message:message,box:box
            })
          }
        
    } catch (error) {
        console.log(error);
    }
}
module.exports={getMessage, postMessage, getMessageBox}