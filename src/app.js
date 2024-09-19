const express = require("express");

const app = express();


app.get("/abc", (req, res) => {
  console.log(req.query)
  res.send({ firstName: "srinu", lastName: "soppari" });
});



app.listen(7777, () => {
  console.log(`Server is successfully listening post 7777...`);
});
