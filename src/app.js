const express = require("express");
const connectDB = require("../src/config/database");
const app = express();
const User = require("../src/models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(cookieParser());
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // encrypt password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log("passwordHash",passwordHash);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User created sucessfully!");
  } catch (err) {
    // res.status(400).send('Error saving the user '+ err.message);
    if (err.code === 11000) {
      res.status(400).send("Email is already in use.");
    } else {
      res.status(400).send("ERROR :  saving the user: " + err.message);
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      // throw new Error("Email ID is not present in DB")   never use this

      throw new Error("Invalid credentials");
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password)

    if (isPasswordValid) {
      //  Create a JWT token

      // Add the token to cookie and send the response back to the user

      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790",{
      //   expiresIn:"7d"
      // });
      const token = await user.getJWT()

      res.cookie("token", token, {
           expires: new Date(Date.now() + 8 * 3600000)
      });

      res.send("Login Successfull!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR :  saving the user: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


app.post("/sendConnectionRequest", userAuth, async (req, res)=>{


  const user = req.user
  console.log("sending connection request")

  res.send(user.firstName+" sent the connection request!")

})



// get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     // const users = await User.findOne({emailId :userEmail})
//     const users = await User.findOne();
//     if (users.length === 0) {
//       res.status(404).send("User not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// get all user
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) {
//       res.status(404).send("Users not found");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// delete user
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     // const user = await User.findByIdAndDelete({_id: userId});
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     res.send("User deleted successfully");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// update user
// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const updates = req.body;
//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age"];

//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed");
//     }

//     const user = await User.findByIdAndUpdate(userId, updates, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     res.send("User updated successfully");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });




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
