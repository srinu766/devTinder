const mongoose = require("mongoose");

const testUserSheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  UserImage: { type: String },
});

module.exports = mongoose.model("TestUser", testUserSheme);
