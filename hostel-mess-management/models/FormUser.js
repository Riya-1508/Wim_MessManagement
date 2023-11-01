const mongoose = require("mongoose");
const { Schema } = mongoose;

const FormUserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  startdate: {
    type: String,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  regId: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  class1: {
    type: String,
    required: true,
  },
  stationfrom: {
    type: String,
    required: true,
  },
  stationto: {
    type: String,
    required: true,
  },
  passduration: {
    type: String,
  },

  category: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  phnNumber: {
    type: String,
    required: true,
    unique: true,
  },
  ticketNo: {
    type: String,
  },
});
const FormUser = mongoose.model("FormUser", FormUserSchema);
module.exports = FormUser;
