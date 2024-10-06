const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  }, 
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    match: [/.+\@.+\..+/, 'Please fill a valid email address'] 
  },
  password: {
    type: String,
  },
  age: { 
    type: Number,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);