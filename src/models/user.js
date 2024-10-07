const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
    minLength:4,
    maxLength:50
  },    
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    lowercase:true,
    trim:true,
    unique: true, // Ensure email is unique
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required:true
  },
  age: { 
    type: Number,
    min:18,
  },
  gender: {
    type: String,
     validate(value){
      if(!["male", "female", "others"].includes(value)){
        throw new Error("Gender data not valid")
      }
     }
  },
  photoUrl:{
    type:String
  },
  about:{
    type:String,
    default:"This is default about the uers"

  },
  skills:{
  type:[String]
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);