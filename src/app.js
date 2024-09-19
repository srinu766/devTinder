const express = require("express");

const app = express();


app.get("/user", (req, res) => {
  res.send({ firstName: "srinu", lastName: "soppari" });
});

app.post("/user", (req, res) => {
  console.log("Save data to database");
  res.send("Data successfully saved to database");
});

app.delete("/user", (req, res) => {
  console.log("delete data from database");
  res.send("deleted successfully");
});

app.patch("/user", (req, res) => {
    console.log("patch data to database");
    res.send("patched successfully");
  });

  app.put("/user", (req, res) => {
    console.log("put data to database");
    res.send("put data successfully");
  });

app.use("/test", (req, res) => {
  res.send("Hello from the server srinu vasu!");
});

app.listen(7777, () => {
  console.log(`Server is successfully listening post 7777...`);
});
