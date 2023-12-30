const express = require("express");
const Reviews = require("../models/Reviews");
const User = require("../models/User");
//const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

var fetchuser = require("../middleware/fetchuser");
const bodyParser = require("body-parser");

let success = false;
router.post(
  "/reviewmess",

  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //   let leave = await Leaves.findOne({ cardNo: req.body.cardNo });
     
      // Create a leave
      review = await Reviews.create({
      name: req.body.name,
      feedback: req.body.feedback,
      rating: req.body.rating
      });
      //  leave.save();
      const data = {
        review: {
          id: review.id,
        },
      };
      res.send(data);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
router.get("/analyze-ratings", async (req, res) => {
  try {
    const ratings = await Reviews.aggregate([
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
        },
      },
    ]);

    const ratingCounts = {};
    ratings.forEach((rating) => {
      ratingCounts[rating._id] = rating.count;
    });

    res.json({ ratingCounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
