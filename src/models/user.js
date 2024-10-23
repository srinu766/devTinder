const mongoose = require("mongoose");
var validator = require('validator');

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
    unique: true,
    // match: [/.+\@.+\..+/, 'Please fill a valid email address']
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid Email address "+value)
      }
    }
  },
  password: {
    type: String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Entered week password Please Enter a Strong Password "+value)
      }
    }
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
    type:String,
    default:"https://example.com/photo.jpg",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid Photo URL : "+value)
      }
    }
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
