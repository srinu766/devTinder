const express = require("express");
const TestUser = require("../models/testUsers");
const upload = require("../middlewares/upload");
const fs = require("fs");
const path = require("path");
const transporter = require("../utils/mailer");

const testUserRouter = express.Router();



testUserRouter.post("/testUser", upload.single("UserImage"), async (req, res) => {
  try {
    const testUserData = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    //   UserImage: req.file ? req.file.filename : null,
     UserImage: req.file ? `uploads/${req.file.filename}` : null,
    };

    const testUser = new TestUser(testUserData);
    const savedTestUser = await testUser.save();


     // Email to Admin
    const adminMailOptions = {
      from: "srinusoppari6766@gmail.com",
      to: "srinusoppari6766@gmail.com",
      subject: "New User Registered",
      html: `
        <h2>New User Added</h2>
        <p><strong>Name:</strong> ${testUserData.name}</p>
        <p><strong>Email:</strong> ${testUserData.email}</p>
        <p><strong>Age:</strong> ${testUserData.age}</p>
        ${testUserData.UserImage ? `<p><img src="http://localhost:7777/${testUserData.UserImage}" width="100"/></p>` : ""}
      `,
    };

    // Email to User
    const userMailOptions = {
      from: "srinusoppari6766@gmail.com",
      to: testUserData.email,
      subject: "Registration Successful 🎉",
      html: `
        <h3>Welcome, ${testUserData.name}!</h3>
        <p>Thank you for registering. Your details have been saved successfully.</p>
        <p>We’ll be in touch soon.</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);


    res.json({
      success: true,
      message: "Data saved successfully",
      data: savedTestUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "ERROR: " + err.message,
    });
  }
});

testUserRouter.get("/testUser", async (req, res) => {
  try {
    const testUser = await TestUser.find();
    res.json({ message: "Data fetched successfully", data: testUser });
  }  catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "ERROR: " + err.message,
    });
  }
});

testUserRouter.get("/testUser/:id", async (req, res) => {
  try {
    const testUser = await TestUser.findById(req.params.id);
    res.json({ message: "Data fetched successfully", data: testUser });
  }  catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "ERROR: " + err.message,
    });
  }
});

// patch
testUserRouter.patch("/testUser/:id", async (req, res) => {
  try {

     const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }
    const updatedUser = await TestUser.findByIdAndUpdate(
      req.params.id,
     updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Data updated successfully",
      data: updatedUser,
    });
  }  catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "ERROR: " + err.message,
    });
  }
});

// delete
testUserRouter.delete("/testUser/:id", async (req, res) => {
  console.log("req.params.id",req.params.id)
  try {
    const testUser = await TestUser.findByIdAndDelete(req.params.id);
    
    if (!testUser) {
      return res.status(404).json({ message: "User not found" });
    }

     if (testUser.UserImage) {
      const imagePath = path.join(__dirname, "../public", testUser.UserImage);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        } else {
          console.log("Image deleted:", imagePath);
        }
      });
    }

    res.json({ message: "Data deleted successfully", data: testUser });
  }  catch (err) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "ERROR: " + err.message,
    });
  }
});

module.exports = testUserRouter;
