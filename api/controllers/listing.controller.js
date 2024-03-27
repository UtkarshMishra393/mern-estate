const Listing = require("../models/listing.model");

const createListng = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

module.exports = createListng;
