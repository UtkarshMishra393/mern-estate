const User = require("../models/user.model");
// bcryptjs is the npm package used for hashing the passwords
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // hashSync is a synchronous function to hash the password and
  // the value '10' here is the number of round of Salt.
  // Salt is a variable or number going to be combined with out password and encrypted.
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User Created Successfully!");
  } catch (err) {
    next(err);
  }
};

module.exports = signup;
