const express = require("express");
const {
  test,
  updatedUser,
  deleteUser,
  getUserListings,
  getUser,
} = require("../controllers/user.controller");
const verifyToken = require("../utils/verifyUser");

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updatedUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get("/:id", verifyToken, getUser);

module.exports = router;
