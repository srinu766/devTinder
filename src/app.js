const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();


app.use("/admin", adminAuth);

app.get("/admin/getAllData",(req, res)=>{
  res.send("sent all data")
})

app.get("/user",userAuth,(req, res)=>{
  res.send("delete user")
})


app.listen(7777, () => {
  console.log(`Server is successfully listening post 7777...`);
});
