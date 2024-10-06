const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:pK9FgUgTgiEe3Un6@namastenode.r4b4x.mongodb.net/devTinder1"
    //  "mongodb+srv://namastedev:pK9FgUgTgiEe3Un6@namastenode.r4b4x.mongodb.net/test" 
  );
};


 
module.exports = connectDB;