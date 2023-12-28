const mongoose = require("mongoose");
const { Schema } = mongoose;
const ReviewSchema = new Schema({
  name: {
    type: String,
    // required: true
  },
  feedback: {
    type: String,
    // required: true
    // unique:true
  },
});

const Review = mongoose.model("reviews", ReviewSchema);
module.exports = Review;
