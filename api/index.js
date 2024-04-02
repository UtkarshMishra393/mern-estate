const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const listingRouter = require("./routes/listing.route");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();
const app = express();

// Allow json as the input of the server
app.use(express.json());

// using it we can get the information from the cookie.
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => console.log(err));

const __direname = path.resolve();

app.listen(3000, () => {
  console.log("Server is running on port 300 !!");
});

// Api Route

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

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
