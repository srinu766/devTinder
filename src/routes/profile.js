const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    // res.status(200).send(loggedInUser.firstName +" Profile updated successfully")
    res.json({
      message: `${loggedInUser.firstName} Profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


profileRouter.patch("/profile/password", userAuth, async (req,res)=>{
try{
const {currentPassword, newPassword} =  req.body

if(!currentPassword || !newPassword){
  throw new Error("Both current and new passwords are required");
}
const user = req.user;

const isMatch = await bcrypt.compare(currentPassword, user.password);
if (!isMatch) {
  throw new Error("Current password is incorrect");
}
  // Hash the new password
  const salt = await bcrypt.genSalt(10); // Generate salt
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update the password and save the user
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    message: "Password updated successfully",
  });

}catch(err){
  res.status(400).send("ERROR : " + err.message);
}
})

module.exports = profileRouter;
