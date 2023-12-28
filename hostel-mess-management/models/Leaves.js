const mongoose = require("mongoose");
const { Schema } = mongoose;

const LeaveSchema = new Schema({
  cardNo: {
    type: String,
    required: true,
    unique: true,
  },
  leaveStartDate: {
    type: String,
    default: null,
  },
  leaveEndDate: {
    type: String,
    default: null,
  },
  totalLeaves: {
    type: String,
    default: null,
  },
});
const Leave = mongoose.model("leaves", LeaveSchema);
module.exports = Leave;
