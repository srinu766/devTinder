const express = require("express");
const connectDB = require("../src/config/database");
const User = require('../src/models/user')

const app = express();



app.post("/signup",async (req, res)=>{
const user  = new User({
    firstName:"ramesh",
    lastName:"soppari",
    emailId:"ramesh@gmail.com",
    password:"ramesh@123",
    age1:23
  }) 

  try {
    await user.save();
    res.send("User created sucessfully!")
  } catch (err){
    res.status(400).send('Error saving the user '+ err.message);
  }

})


connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(7777, () => {
      console.log(`Server is successfully listening post 7777...`);
    });
  })
  .catch((err) => {
    console.log("Database can not be connected ", err);
  });
