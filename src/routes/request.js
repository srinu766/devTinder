const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user")

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if(!allowedStatus.includes(status)){
       return  res.status(400).json({message: "Invalid status type " + status})
      }


      // If there is an existing connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
          {fromUserId,toUserId},
          {fromUserId:toUserId, toUserId:fromUserId},
        ],
      }) 


      const toUser = await User.findById(toUserId);
      if(!toUser){
        return res.status(400).json({message: "User not found!"})
      }

      if(existingConnectionRequest){
        return res.status(400).json({message:"Connection request already exist!!"})
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        // message: "Connection Request send Successfully",
        message: req.user.firstName + "is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

module.exports = requestRouter;
