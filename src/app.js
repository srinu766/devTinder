const express = require("express");
const connectDB = require("../src/config/database");
const User = require('../src/models/user')
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")

const app = express();


app.use(express.json())


app.post("/signup",async (req, res)=>{ 
  try {
// validation of data
    validateSignUpData(req);

    const {firstName, lastName,emailId, password} = req.body;

    // encrypt password
    const passwordHash =await bcrypt.hash(password, 10);
    // console.log("passwordHash",passwordHash);
    const user  = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    }) 

    await user.save();
    res.send("User created sucessfully!")
  } catch (err){
    // res.status(400).send('Error saving the user '+ err.message);
    if (err.code === 11000) {
      res.status(400).send("Email is already in use.");
    } else {
      res.status(400).send('ERROR :  saving the user: ' + err.message);
    }
  }
})

app.post("/login",async(req,res)=>{
  try{
    const {emailId, password} = req.body;

    const  user = await  User.findOne({emailId:emailId});
    if(!user){
      // throw new Error("Email ID is not present in DB")   never use this

      throw new Error("Invalid credentials")
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    console.log("isPasswordValid",isPasswordValid);
    if(isPasswordValid){
      res.send("Login Successfull!!!")
    }else{
      throw new Error("Invalid credentials")
    }

  }catch (err){
    res.status(400).send('ERROR :  saving the user: ' + err.message);
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
// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const updates = req.body;

 

//   try {
//     const ALLOWED_UPDATES = [
//       "photoUrl", "about", "gender", "age", 
//     ]
  
//     const isUpdateAllowed = Object.keys(data).every((k)=>
//     ALLOWED_UPDATES.includes(k)
//   )
//   if(!isUpdateAllowed){
//    throw new Error("Update not allowed")
//   }

//     const user = await User.findByIdAndUpdate(userId, updates, { returnDocument: "after", runValidators: true });
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// PATCH /user - Update user details
// PATCH /user - Update user details
// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;  // Ensure userId is provided in request body
//   const updates = req.body;

//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age"];
    
//     // Ensure all provided updates are allowed
//     const isUpdateAllowed = Object.keys(updates).every((key) =>
//       ALLOWED_UPDATES.includes(key)
//     );

//     // if (!isUpdateAllowed) {
//     //   throw new Error("Update not allowed");
//     // }

//     // Update the user
//     const user = await User.findByIdAndUpdate(userId, updates, {
//       new: true, // return the updated document
//       runValidators: true, // validate updates
//     });

//     // if (!user) {
//     //   return res.status(404).send("User not found");
//     // }

//     res.status(200).send(user); // return updated user
//   } catch (err) {
//     console.error("Error updating user:", err.message); // Log the error
//     res.status(400).send(err.message || "Something went wrong");
//   }
// });

app.patch("/user", async (req, res) => {
  const { userId, ...updates } = req.body;  // Destructure userId from the updates

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age"];
  
  // Ensure all provided updates are allowed
  const isUpdateAllowed = Object.keys(updates).every((key) =>
    ALLOWED_UPDATES.includes(key)
  );

  if (!isUpdateAllowed) {
    return res.status(400).send("Update not allowed");
  }

  try {
    // Update the user
    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true, // return the updated document
      runValidators: true, // validate updates
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(user); // return updated user
  } catch (err) {
    console.error("Error updating user:", err.message); // Log the error
    res.status(400).send(err.message || "Something went wrong");
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
