const express = require("express");
const connectDB = require("../src/config/database");
const app = express();
const cookieParser = require("cookie-parser");


app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)


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
