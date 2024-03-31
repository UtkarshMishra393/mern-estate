const express = require("express");
const {
  createListng,
  deleteListng,
  updateListing,
} = require("../controllers/listing.controller");
const verifyToken = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", verifyToken, createListng);
router.delete("/delete/:id", verifyToken, deleteListng);
router.post("/update/:id", verifyToken, updateListing);

module.exports = router;
