const express = require("express");

const app = express()


app.use("/home",(req, res)=>{
    res.send("home home home!");
})

app.use("/hello",(req, res)=>{
    res.send("hello hello hello!");
})

app.use("/api",(req, res)=>{
    res.send("Hello from the server srinu vasu!");
})

app.listen(7777,()=>{
    console.log("Server is successfully listening post 3000...");
})

