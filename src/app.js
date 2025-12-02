const express = require("express");
const connectDB = require("../src/config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
require("dotenv").config();
const http = require("http");
// require("./utils/cronejob");


app.use(cors({
  origin: "http://localhost:5173" || "http://localhost:5174",
  credentials:true
}))
app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payments");
const chatRouter = require("./routes/chat");
const initializeSocket = require("./utils/socket");
const testUserRouter = require("./routes/testUser");
const path = require("path");


app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)
app.use("/", paymentRouter)
app.use("/", chatRouter)
app.use("/api", testUserRouter)

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));



const server = http.createServer(app);
initializeSocket(server)  

connectDB()
  .then(() => {
    console.log("database connected successfully");
    server.listen(process.env.PORT || 7777, () => {
      console.log(`Server is successfully listening post 7777...`);
    });
  })
  .catch((err) => {
    console.log("Database can not be connected ", err);
  });
