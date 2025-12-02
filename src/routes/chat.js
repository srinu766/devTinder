const express  = require("express");
const { Chat } = require("../models/chat");
const { userAuth } = require("../middlewares/auth");


const chatRouter = express.Router();


chatRouter.get('/chat/:targetedUserId',userAuth,async(req, res)=>{
    const { targetedUserId} = req.params;
    const userId = req.user._id
    try{
        let chat = await Chat.findOne({participants:{$all:[userId, targetedUserId]}}).populate({
            path:"messages.senderId",
            select:"firstName lastName"
        })
        if(!chat){
            chat = new Chat({
                participants:[userId, targetedUserId],
                messages:[]
            })
        }
        await chat.save();
        res.json(chat) 
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }

})


module.exports = chatRouter