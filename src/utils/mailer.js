const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "srinusoppari6766@gmail.com",
    pass: "puun xiay tvqs immv", 
  },
});

module.exports = transporter;
