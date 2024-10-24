const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      // throw new Error("Email ID is not present in DB")   never use this

      throw new Error("Invalid credentials");
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //  Create a JWT token

      // Add the token to cookie and send the response back to the user

      // const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790",{
      //   expiresIn:"7d"
      // });
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login Successfull!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR :  saving the user: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    // res.clearCookie("token");
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("Logout successfull");
  } catch (err) {
    res.status(500).send("Error: Unable to log out. " + err.message);
  }
});

module.exports = authRouter;
