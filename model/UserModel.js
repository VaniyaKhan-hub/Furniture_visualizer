const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Firstname: {
    type: String,
  },
  Lastname: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
  Is_admin: {
    type: Number,
  }
});

module.exports = mongoose.model("User", UserSchema);
