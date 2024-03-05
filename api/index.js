const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const userRouter = require("./routes/user.route");

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => console.log("DataBase Not Connected"));

app.listen(3000, () => {
  console.log("Server is running on port 300 !!");
});

// Api Route

app.use("/api/user", userRouter);
