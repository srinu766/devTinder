const express = require("express");
const connectDB = require("../src/config/database");
const User = require('../src/models/user')

const app = express();


app.use(express.json())


app.post("/signup",async (req, res)=>{ 
const user  = new User(req.body) 

  try {
    await user.save();
    res.send("User created sucessfully!")
  } catch (err){
    // res.status(400).send('Error saving the user '+ err.message);
    if (err.code === 11000) {
      res.status(400).send("Email is already in use.");
    } else {
      res.status(400).send('Error saving the user: ' + err.message);
    }
  }
})

// get user by email
app.get("/user", async(req, res)=>{
  const userEmail = req.body.emailId
  try{
    // const users = await User.findOne({emailId :userEmail})
    const users = await User.findOne()
    if(users.length ===0){
      res.status(404).send("User not found");
    } else{
      res.send(users)
    }
  }catch (err){
    res.status(400).send("Something went wrong");
  }
})

// get all user
app.get("/feed", async(req, res)=>{
try{
  const users = await User.find({});
  if(users.length ===  0){
    res.status(404).send("Users not found");
  }else{
    res.send(users);
  }
}catch(err){
  res.status(400).send("Something went wrong")
}
})

// delete user
app.delete("/user", async (req, res) => {
  const userId = req.body.userId
  try {
    const user = await User.findByIdAndDelete(userId);  
    // const user = await User.findByIdAndDelete({_id: userId});
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// update user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const updates = req.body;

 

  try {
    const ALLOWED_UPDATES = [
      "photoUrl", "about", "gender", "age", 
    ]
  
    const isUpdateAllowed = Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k)
  )
  if(!isUpdateAllowed){
   throw new Error("Update not allowed")
  }

    const user = await User.findByIdAndUpdate(userId, updates, { returnDocument: "after", runValidators: true });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});




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
