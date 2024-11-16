const mongoose = require("mongoose");
var validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

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
    //  validate(value){
    //   if(!["male", "female", "others"].includes(value)){
    //     throw new Error("Gender data not valid")
    //   }
    //  }
    enum:{
      values:["male", "female", "others"],
      message:`{VALUE} is incorrect gender type`
  }
  },
  photoUrl:{
    type:String,
    default:"https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png",
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



userSchema.methods.getJWT = async function () {
  const user = this
  
  const token = await jwt.sign({_id:user._id},"DEV@Tinder$790",{
    expiresIn:"7d",
  })
  return token
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
  const user = this
  const passwordHash = user.password

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

  return isPasswordValid;
  
}




module.exports = mongoose.model("User", userSchema);   
