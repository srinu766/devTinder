const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    productID:{
        type:String,
        required: true,
        unique: true
    },
    productName:{
        type:String,
        required: true
    },
    productWaight:{
        type:Number,
        required: true
    },
    productLocation:{
        type:String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model("Products", productsSchema)