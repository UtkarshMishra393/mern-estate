const express = require("express");
const {
  createListng,
  deleteListng,
} = require("../controllers/listing.controller");
const verifyToken = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", verifyToken, createListng);
router.delete("/delete/:id", verifyToken, deleteListng);

module.exports = router;
