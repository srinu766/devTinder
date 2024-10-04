const express = require("express");

const app = express();



app.get("/getUserData",(req, res)=>{
  try{

  }
  catch(err){
     
  }
  // logic  of db
  throw new Error("error comming")
  res.send("User data sent")
})



app.use("/", (err, req, res,next)=>{
  if(err){
    res.status(500).send("something went wrong")
  }
})



app.listen(7777, () => {
  console.log(`Server is successfully listening post 7777...`);
});
