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

  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  regId: {
    type: String,
    required: true,
    unique: true,
  },
  cardNo: {
    type: String,
  },
});
const FormUser = mongoose.model("FormUser", FormUserSchema);
module.exports = FormUser;
