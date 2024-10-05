const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    // "mongodb+srv://namastedev:<pK9FgUgTgiEe3Un6>@namastenode.r4b4x.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode"
    "mongodb+srv://namastedev:pK9FgUgTgiEe3Un6@namastenode.r4b4x.mongodb.net/devTinder1"
  );
};



//  const url = mongodb+srv://namastedev:pK9FgUgTgiEe3Un6@namastenode.r4b4x.mongodb.net/

 
module.exports = connectDB;