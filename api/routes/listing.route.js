const express = require("express");
const {
  createListng,
  deleteListng,
  updateListing,
  // getListing is to get a particular listing data to get userRef used in Listing Page.
  getListing,
  // getListings is to get serach th listings used in Search Page.
  getListings,
} = require("../controllers/listing.controller");
const verifyToken = require("../utils/verifyUser");

const router = express.Router();

router.post("/create", verifyToken, createListng);
router.delete("/delete/:id", verifyToken, deleteListng);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);

module.exports = router;
