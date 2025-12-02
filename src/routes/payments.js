const express = require("express");
const { userAuth } = require("../middlewares/auth");

const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { memebershipAmount } = require("../utils/constants");
const { validate } = require("../models/user");
const { validateWebhookSignature } = require("razorpay");
const User = require("../models/user");
const paymentRouter = express.Router();


paymentRouter.post('/payment/create', userAuth, async (req, res)=>{
    const {membershipType} = req.body;
    const {firstName, lastName, emailId} = req.user;

    try{
        // console.log("razorpayInstance", razorpayInstance)
      const order = await razorpayInstance.orders.create({
            "amount": memebershipAmount[membershipType] * 100,
            "currency": "INR",
            "receipt": "order_rcptid_11",
            "notes":{
                firstName,
                lastName,
                emailId,
                "membershipType":membershipType,
            }
        })

        // console.log("order", order)
        const payment = new Payment({
            userId:req?.user._id,
            // paymentId:"",
            OrderId:order?.id,
            status:order?.status,
            amount:order?.amount,
            currency:order?.currency,
            receipt:order?.receipt,
            notes:order?.notes,
             
        })
        const savedPayment = await payment.save()

        res.json({...savedPayment.toJSON(), keyId:process.env.RAZORPAY_KEY_ID}, )
        // res.json(order)
 
    }catch(err){

        return res.status(500).json({msg:err.message})

    }
})

paymentRouter.post('/payment/webhook', async (req, res)=>{
    try{

        const webhookSignature = req.get('x-razorpay-signature');

       const isWebhookValid = validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.RAZORPAY_WEBHOOK_SECRET);
         if(!isWebhookValid){
            return res.status(400).json({msg:"Invalid webhook signature"})
         }

         const paymentDetails = req.body.payload.payment.entity;

         const payment = await Payment.findOne({OrderId:paymentDetails.order_id});
         payment.status = paymentDetails.status;
         await payment.save();

         const user = await User.findById({_id:payment.userId});
         user.isPremium = true;
         user.membershipType = payment.notes.membershipType;
         await user.save();

        //  if(req.body.event === 'payment.captured'){}
        //  if(req.body.event === 'payment.failed'){}


         res.status(200).json({msg:"Webhook received successfully"})


    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})


paymentRouter.get("/premium/verify", userAuth, async (req, res)=>{
    const user = req.user.toJSON();
    try{
        if(user.isPremium){
            return res.status(200).json({...user})
        }else{
            return res.status(200).json({ ...user})
        }
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
})




module.exports = paymentRouter;