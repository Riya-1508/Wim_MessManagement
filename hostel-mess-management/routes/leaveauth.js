const express = require("express");
const Leaves = require("../models/Leaves");
const User = require("../models/User");
//const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

var fetchuser = require("../middleware/fetchuser");
const bodyParser = require("body-parser");



let success = false;
router.post(
  "/putLeave",
 
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    
    //   let leave = await Leaves.findOne({ cardNo: req.body.cardNo });
      const date1 = new Date(req.body.leaveStartDate);
      const date2 = new Date(req.body.leaveEndDate);
      var leaves;
      const time_difference = date2.getTime() - date1.getTime();
      if (time_difference === 0) {
        leaves = 1;
      } else {
        leaves = time_difference / (1000 * 60 * 60 * 24);
      }
      // Create a leave
      leave = await Leaves.create({
        cardNo: req.body.cardNo,
        leaveStartDate : req.body.leaveStartDate,
        leaveEndDate : req.body.leaveEndDate,
        totalLeaves: leaves
      });
    //  leave.save();
 const data = {
  leave: {
     id: leave.id,
   },
 };
      res.send(data);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;

