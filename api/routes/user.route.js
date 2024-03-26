const express = require("express");
const { test, updatedUser } = require("../controllers/user.controller");
const verifyToken = require("../utils/verifyUser");

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updatedUser);

module.exports = router;
