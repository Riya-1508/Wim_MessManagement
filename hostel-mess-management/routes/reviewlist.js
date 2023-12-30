// reviewRoutes.js
const express = require("express");
const router = express.Router();
const Reviews = require("../models/Reviews");

router.get("/getreviews", async (req, res) => {
  try {
    const reviews = await Reviews.find();
    res.json(reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
