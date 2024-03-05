const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

dotenv.config();
const app = express();

// Allow json as the input of the server
app.use(express.json());

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
app.use("/api/auth", authRouter);

// Creating middleware to handle the error response
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
